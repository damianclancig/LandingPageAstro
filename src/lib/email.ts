import { Resend } from 'resend';
import { AppError } from '@/errors/app-error';

export type ContactFormData = {
  email: string;
  message: string;
  intent: 'recruiter' | 'client';
  company?: string;
  position?: string;
  clientName?: string;
  projectType?: string;
};

type ContactPayload = {
  subject: string;
  fromName: string;
  fromEmail: string;
  message: string;
  formData?: ContactFormData;
};

export type ContactEmailErrorCode =
  | 'contact-form-error-server-config'
  | 'contact-form-error-api'
  | 'contact-form-error-unexpected';

export class ContactEmailError extends AppError {
  declare code: ContactEmailErrorCode;
  technicalMessage?: string;

  constructor(code: ContactEmailErrorCode, technicalMessage?: string) {
    super(technicalMessage || code, code, true, { technicalMessage });
    this.technicalMessage = technicalMessage;
  }
}

function renderFieldRow(label: string, value?: string, isLast = false) {
  const displayValue =
    value && value.trim() !== '' ? value : '<span style="color: #71717a;">No especificado</span>';
  const borderStyle = isLast ? '' : 'border-bottom: 1px solid #2f2f35;';
  return `
    <tr>
      <td style="padding: 14px 18px; ${borderStyle} width: 40%; vertical-align: top;">
        <span style="font-size: 12px; font-weight: 600; color: #a1a1aa; text-transform: uppercase; letter-spacing: 0.5px;">${label}</span>
      </td>
      <td style="padding: 14px 18px; ${borderStyle} width: 60%; vertical-align: top;">
        <span style="font-size: 15px; font-weight: 500; color: #ffffff;">${displayValue}</span>
      </td>
    </tr>
  `;
}

function buildHtml(payload: ContactPayload) {
  const data = payload.formData;
  const isRecruiter = data?.intent === 'recruiter';
  const isClient = data?.intent === 'client';

  const badgeText = isRecruiter
    ? 'Contacto Reclutador / Talento'
    : isClient
      ? 'Contacto Cliente / Proyecto'
      : 'Nuevo Contacto';
  const messageHeading = isRecruiter
    ? 'Propuesta / Mensaje'
    : isClient
      ? 'Desafío / Detalles del Proyecto'
      : 'Mensaje';
  const rawMessage = data?.message ?? payload.message;
  const formattedMessageHtml = rawMessage.replace(/\n/g, '<br/>');

  let rowsHtml = '';
  if (isRecruiter) {
    rowsHtml += renderFieldRow('Perfil', 'Reclutador');
    rowsHtml += renderFieldRow('Empresa', data?.company);
    rowsHtml += renderFieldRow('Posición / Puesto', data?.position);
    rowsHtml += renderFieldRow(
      'Email de Contacto',
      `<a href="mailto:${payload.fromEmail}" style="color: #14b8a6; text-decoration: none;">${payload.fromEmail}</a>`,
      true,
    );
  } else if (isClient) {
    rowsHtml += renderFieldRow('Perfil', 'Cliente');
    rowsHtml += renderFieldRow('Nombre del Cliente', data?.clientName);
    rowsHtml += renderFieldRow('Tipo de Proyecto', data?.projectType);
    rowsHtml += renderFieldRow(
      'Email de Contacto',
      `<a href="mailto:${payload.fromEmail}" style="color: #14b8a6; text-decoration: none;">${payload.fromEmail}</a>`,
      true,
    );
  } else {
    rowsHtml += renderFieldRow('Nombre / Origen', payload.fromName);
    rowsHtml += renderFieldRow(
      'Email de Contacto',
      `<a href="mailto:${payload.fromEmail}" style="color: #14b8a6; text-decoration: none;">${payload.fromEmail}</a>`,
      true,
    );
  }

  const currentYear = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>${payload.subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0b; color: #f4f4f5; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #0a0a0b; padding: 40px 20px;">
    <tr>
      <td align="center">
        <!-- Contenedor Principal -->
        <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #18181b; border: 1px solid #27272a; border-radius: 16px; overflow: hidden; box-shadow: 0 12px 36px rgba(0,0,0,0.6);">
          
          <!-- Header con Logo -->
          <tr>
            <td align="center" style="padding: 32px 32px 24px 32px; background-color: #121214; border-bottom: 1px solid #27272a;">
              <a href="https://www.clancig.com.ar" target="_blank" style="text-decoration: none;">
                <img src="https://www.clancig.com.ar/images/logo.webp" alt="Clancig FullstackDev" width="160" style="display: block; border: 0; max-width: 160px; height: auto;" />
              </a>
            </td>
          </tr>

          <!-- Cuerpo -->
          <tr>
            <td style="padding: 36px 32px;">
              
              <!-- Badge de Intención -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr>
                  <td style="background-color: rgba(20, 184, 166, 0.15); border: 1px solid #14b8a6; border-radius: 9999px; padding: 6px 14px; font-size: 13px; font-weight: 600; color: #14b8a6; letter-spacing: 0.5px; text-transform: uppercase;">
                    ${badgeText}
                  </td>
                </tr>
              </table>

              <h1 style="margin: 0 0 10px 0; font-size: 22px; font-weight: 700; color: #ffffff; line-height: 1.3;">
                Nueva consulta recibida
              </h1>
              <p style="margin: 0 0 28px 0; font-size: 15px; color: #a1a1aa; line-height: 1.5;">
                Has recibido un nuevo mensaje a través de tu formulario de contacto. A continuación se detallan los datos ingresados:
              </p>

              <!-- Tabla de Campos -->
              <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #202024; border: 1px solid #2f2f35; border-radius: 12px; margin-bottom: 28px; border-collapse: separate; overflow: hidden;">
                ${rowsHtml}
              </table>

              <!-- Sección del Mensaje -->
              <div style="margin-bottom: 10px;">
                <span style="font-size: 12px; font-weight: 700; color: #14b8a6; text-transform: uppercase; letter-spacing: 1px;">
                  ${messageHeading}
                </span>
              </div>
              <div style="background-color: #121214; border-left: 4px solid #14b8a6; border-radius: 0 8px 8px 0; padding: 20px; font-size: 15px; color: #e4e4e7; line-height: 1.7;">
                ${formattedMessageHtml}
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 24px 32px; background-color: #121214; border-top: 1px solid #27272a; font-size: 13px; color: #71717a; line-height: 1.5;">
              <p style="margin: 0 0 6px 0;">Enviado desde el formulario de contacto de <a href="https://www.clancig.com.ar" style="color: #14b8a6; text-decoration: none; font-weight: 500;">clancig.com.ar</a></p>
              <p style="margin: 0; font-size: 12px; color: #52525b;">© ${currentYear} Damián Clancig. Todos los derechos reservados.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
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
