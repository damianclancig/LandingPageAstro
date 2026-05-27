import { Resend } from 'resend';

type ContactPayload = {
  subject: string;
  fromName: string;
  fromEmail: string;
  message: string;
};

export type ContactEmailErrorCode =
  | 'contact-form-error-server-config'
  | 'contact-form-error-api'
  | 'contact-form-error-unexpected';

export class ContactEmailError extends Error {
  code: ContactEmailErrorCode;
  technicalMessage?: string;

  constructor(code: ContactEmailErrorCode, technicalMessage?: string) {
    super(code);
    this.code = code;
    this.technicalMessage = technicalMessage;
  }
}

function buildHtml(payload: ContactPayload) {
  return `
    <h2>Nuevo mensaje de contacto</h2>
    <p><strong>Nombre:</strong> ${payload.fromName}</p>
    <p><strong>Email:</strong> ${payload.fromEmail}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${payload.message.replace(/\n/g, '<br/>')}</p>
  `;
}

export async function sendContactEmail(payload: ContactPayload) {
  if (import.meta.env.DEV && import.meta.env.CONTACT_DEV_FORCE_SUCCESS === 'true') {
    return;
  }

  const resendApiKey = import.meta.env.RESEND_API_KEY;
  const resendFrom = import.meta.env.RESEND_FROM_EMAIL;
  const resendTo = import.meta.env.RESEND_TO_CONTACT;

  if (resendApiKey && resendFrom && resendTo) {
    try {
      const resend = new Resend(resendApiKey);
      await resend.emails.send({
        from: resendFrom,
        to: resendTo,
        subject: payload.subject,
        replyTo: payload.fromEmail,
        text: payload.message,
        html: buildHtml(payload),
      });
    } catch (error) {
      const technicalMessage = error instanceof Error ? error.message : 'Unknown Resend error';
      throw new ContactEmailError('contact-form-error-api', technicalMessage);
    }
    return;
  }

  const mailerooApiKey = import.meta.env.MAILEROO_API_KEY;
  const mailerooFrom = import.meta.env.MAILEROO_FROM_EMAIL;
  const mailerooTo = import.meta.env.MAILEROO_TO_CONTACT;

  if (!mailerooApiKey || !mailerooFrom || !mailerooTo) {
    throw new ContactEmailError(
      'contact-form-error-server-config',
      'Missing MAILEROO_API_KEY, MAILEROO_FROM_EMAIL or MAILEROO_TO_CONTACT',
    );
  }

  let response: Response;
  try {
    response = await fetch('https://smtp.maileroo.com/api/v2/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${mailerooApiKey}`,
      },
      body: JSON.stringify({
        from: {
          address: mailerooFrom,
          display_name: 'Clancig Contact Form',
        },
        to: [{ address: mailerooTo }],
        reply_to: {
          address: payload.fromEmail,
          display_name: payload.fromName,
        },
        subject: payload.subject,
        plain: payload.message,
        html: buildHtml(payload),
        tracking: false,
      }),
    });
  } catch (error) {
    const technicalMessage = error instanceof Error ? error.message : 'Unknown network error';
    throw new ContactEmailError('contact-form-error-api', technicalMessage);
  }

  if (!response.ok) {
    const responseText = await response.text().catch(() => 'No response body');
    throw new ContactEmailError(
      'contact-form-error-api',
      `Maileroo HTTP ${response.status}: ${responseText}`,
    );
  }
}
