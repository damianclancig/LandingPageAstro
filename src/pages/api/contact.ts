import type { APIRoute } from 'astro';
import { z } from 'zod';
import { ContactEmailError, sendContactEmail } from '@/lib/email';

export const prerender = false;

const schema = z.object({
  email: z
    .string()
    .trim()
    .pipe(z.email({ message: 'validation-email-invalid' })),
  message: z
    .string()
    .trim()
    .min(10, 'validation-message-minLength')
    .max(1000, 'validation-message-maxLength'),
  intent: z.enum(['recruiter', 'client']),
  company: z.string().trim().optional(),
  position: z.string().trim().optional(),
  clientName: z.string().trim().optional(),
  projectType: z.string().trim().optional(),
});

async function verifyCaptcha(token: string | null): Promise<{
  ok: boolean;
  message?: 'recaptcha-verification-failed' | 'recaptcha-service-unavailable';
}> {
  if (import.meta.env.DEV) return { ok: true };
  if (!token) return { ok: false, message: 'recaptcha-verification-failed' };

  const turnstileSecret = import.meta.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret) {
    try {
      const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ secret: turnstileSecret, response: token }),
      });
      const data = (await response.json()) as { success?: boolean };
      if (!data.success) return { ok: false, message: 'recaptcha-verification-failed' };
      return { ok: true };
    } catch {
      return { ok: false, message: 'recaptcha-service-unavailable' };
    }
  }

  const recaptchaSecret = import.meta.env.RECAPTCHA_SECRET_KEY;
  if (!recaptchaSecret) return { ok: true };

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret: recaptchaSecret, response: token }),
    });
    const data = (await response.json()) as { success?: boolean };
    return data.success ? { ok: true } : { ok: false, message: 'recaptcha-verification-failed' };
  } catch {
    return { ok: false, message: 'recaptcha-service-unavailable' };
  }
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    const token =
      (formData.get('cf-turnstile-response') as string | null) ??
      (formData.get('recaptcha-token') as string | null) ??
      null;

    const captchaResult = await verifyCaptcha(token);
    if (!captchaResult.ok) {
      return new Response(
        JSON.stringify({
          success: false,
          message: captchaResult.message ?? 'recaptcha-verification-failed',
        }),
        { status: 400 },
      );
    }

    const parsed = schema.safeParse(Object.fromEntries(formData.entries()));
    if (!parsed.success) {
      const { fieldErrors } = z.flattenError(parsed.error);
      return new Response(
        JSON.stringify({
          success: false,
          message: 'validation-failed',
          errors: fieldErrors,
        }),
        { status: 400 },
      );
    }

    const data = parsed.data;

    const senderName =
      data.intent === 'recruiter'
        ? `[Reclutador] ${data.company ?? 'N/A'} - ${data.position ?? 'N/A'}`
        : `[Cliente] ${data.clientName ?? 'N/A'}`;

    const formattedMessage =
      data.intent === 'recruiter'
        ? data.message
        : `Tipo de Proyecto: ${data.projectType ?? 'N/A'}\n\nDesafío:\n${data.message}`;

    await sendContactEmail({
      subject: `Nuevo Mensaje desde Clancig Landing: ${senderName}`,
      fromName: senderName,
      fromEmail: data.email,
      message: formattedMessage,
    });

    return new Response(JSON.stringify({ success: true, message: 'contact-form-success' }), {
      status: 200,
    });
  } catch (error) {
    if (error instanceof ContactEmailError) {
      console.error('ContactEmailError:', error.code, error.technicalMessage);
      return new Response(
        JSON.stringify({
          success: false,
          message: error.code,
          technicalError: error.technicalMessage,
        }),
        { status: error.code === 'contact-form-error-server-config' ? 500 : 502 },
      );
    }

    console.error('Unexpected contact error:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'contact-form-error-unexpected' }),
      { status: 500 },
    );
  }
};
