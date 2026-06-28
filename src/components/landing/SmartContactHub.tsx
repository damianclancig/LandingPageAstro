import { useEffect, useMemo, useRef, useState } from 'react';

type Intent = 'recruiter' | 'client';

type Props = {
  labels: Record<string, string>;
  turnstileSiteKey?: string;
  recaptchaSiteKey?: string;
};

type ApiResponse = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};

type SubmitEventLike = {
  preventDefault: () => void;
  currentTarget: HTMLFormElement;
};

declare global {
  interface Window {
    grecaptcha?: {
      getResponse: () => string;
      reset: () => void;
    };
    turnstile?: {
      getResponse: () => string;
      reset: () => void;
    };
  }
}

export default function SmartContactHub({ labels, turnstileSiteKey, recaptchaSiteKey }: Props) {
  const [intent, setIntent] = useState<Intent | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const sectionRef = useRef<HTMLElement>(null);

  const submitLabel = useMemo(() => {
    if (intent === 'recruiter') {
      return labels['landing-contact-form-submit-recruiter'];
    }
    if (intent === 'client') {
      return labels['landing-contact-form-submit-client'];
    }
    return labels['landing-contact-form-submit-select-intent'] ?? 'Selecciona un perfil';
  }, [intent, labels]);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShowCaptcha(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  async function handleSubmit(event: SubmitEventLike) {
    event.preventDefault();
    const formElement = event.currentTarget;

    if (!intent) {
      setStatus('error');
      setMessage(labels['landing-contact-form-submit-select-intent'] ?? 'Selecciona un perfil');
      return;
    }

    const form = new FormData(formElement);
    form.set('intent', intent);

    if (!turnstileSiteKey && recaptchaSiteKey) {
      const recaptchaToken = window.grecaptcha?.getResponse?.() ?? '';
      form.set('recaptcha-token', recaptchaToken);
    }

    if (!import.meta.env.DEV && showCaptcha && (turnstileSiteKey || recaptchaSiteKey)) {
      const turnstileToken =
        window.turnstile?.getResponse?.() || (form.get('cf-turnstile-response') as string | null);
      const recaptchaToken =
        window.grecaptcha?.getResponse?.() ||
        (form.get('g-recaptcha-response') as string | null) ||
        (form.get('recaptcha-token') as string | null);
      const token = [turnstileToken, recaptchaToken]
        .map((t) => (typeof t === 'string' ? t.trim() : ''))
        .find((t) => t !== '');

      if (!token) {
        setStatus('error');
        setMessage(
          labels['landing-contact-recaptcha-verify'] ??
            labels['recaptcha-verification-failed'] ??
            'Por favor, verifica que no eres un robot.',
        );
        return;
      }
    }

    setStatus('sending');
    setMessage('');
    setFieldErrors({});

    const res = await fetch('/api/contact', {
      method: 'POST',
      body: form,
    });

    const json = (await res.json().catch(() => ({}))) as ApiResponse;
    if (res.ok && json.success) {
      setStatus('success');
      setMessage(labels['landing-contact-form-success-message']);
      formElement?.reset();
      window.grecaptcha?.reset?.();
      window.turnstile?.reset?.();
      return;
    }

    setStatus('error');
    setFieldErrors(json.errors ?? {});
    setMessage(labels[json.message ?? ''] ?? labels['contact-form-error-user-friendly']);
    window.grecaptcha?.reset?.();
    window.turnstile?.reset?.();
  }

  return (
    <section ref={sectionRef} id="contacto" className="contact-section">
      <div className="container">
        <h2 className="section-title">{labels['landing-contact-title']}</h2>
        <p className="section-sub">{labels['landing-contact-subtitle']}</p>
        <div className="card contact-card">
          <div className="contact-intent-switch" role="tablist" aria-label="Contact intent">
            <button
              type="button"
              onClick={() => setIntent('recruiter')}
              className={`contact-intent-btn${intent === 'recruiter' ? ' is-active' : ''}`}
            >
              {labels['landing-contact-intent-recruiter']}
            </button>
            <button
              type="button"
              onClick={() => setIntent('client')}
              className={`contact-intent-btn${intent === 'client' ? ' is-active' : ''}`}
            >
              {labels['landing-contact-intent-client']}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="contact-form">
            {intent === 'recruiter' ? (
              <div className="contact-field-grid">
                <div className="contact-field">
                  <label htmlFor="contact-company" className="contact-label">
                    {labels['landing-contact-form-company']}
                  </label>
                  <input
                    id="contact-company"
                    name="company"
                    required
                    placeholder={labels['landing-contact-form-company-placeholder']}
                    className="contact-input"
                  />
                </div>
                <div className="contact-field">
                  <label htmlFor="contact-position" className="contact-label">
                    {labels['landing-contact-form-position']}
                  </label>
                  <input
                    id="contact-position"
                    name="position"
                    required
                    placeholder={labels['landing-contact-form-position-placeholder']}
                    className="contact-input"
                  />
                </div>
              </div>
            ) : intent === 'client' ? (
              <div className="contact-field-grid">
                <div className="contact-field">
                  <label htmlFor="contact-client-name" className="contact-label">
                    {labels['landing-contact-form-name'] ?? 'Nombre'}
                  </label>
                  <input
                    id="contact-client-name"
                    name="clientName"
                    required
                    placeholder={labels['landing-contact-form-name-placeholder']}
                    className="contact-input"
                  />
                </div>
                <div className="contact-field">
                  <label htmlFor="contact-project-type" className="contact-label">
                    {labels['landing-contact-form-projectType']}
                  </label>
                  <input
                    id="contact-project-type"
                    name="projectType"
                    required
                    placeholder={labels['landing-contact-form-projectType-placeholder']}
                    className="contact-input"
                  />
                </div>
              </div>
            ) : (
              <p className="contact-intent-hint">
                {labels['landing-contact-form-submit-select-intent'] ?? 'Selecciona un perfil'}
              </p>
            )}

            <div className="contact-field">
              <label htmlFor="contact-email" className="contact-label">
                {labels['landing-contact-form-email'] ?? 'Email'}
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                required
                placeholder={labels['landing-contact-form-email-placeholder']}
                className="contact-input"
              />
            </div>
            <div className="contact-field">
              <label htmlFor="contact-message" className="contact-label">
                {labels['landing-contact-form-challenge']}
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                minLength={10}
                placeholder={
                  intent === 'recruiter'
                    ? labels['landing-contact-form-message-placeholder-recruiter']
                    : intent === 'client'
                      ? labels['landing-contact-form-message-placeholder-client']
                      : labels['landing-contact-form-message-placeholder-client']
                }
                className="contact-textarea"
              />
            </div>
            {showCaptcha && turnstileSiteKey && (
              <div className="contact-captcha cf-turnstile" data-sitekey={turnstileSiteKey}></div>
            )}
            {showCaptcha && !turnstileSiteKey && recaptchaSiteKey && (
              <div className="contact-captcha g-recaptcha" data-sitekey={recaptchaSiteKey}></div>
            )}
            <button
              type="submit"
              disabled={status === 'sending' || !intent}
              className="contact-submit-btn"
            >
              {status === 'sending' ? labels['landing-contact-form-sending'] : submitLabel}
            </button>
          </form>

          {status === 'error' && Object.keys(fieldErrors).length > 0 && (
            <ul className="contact-error-list">
              {Object.entries(fieldErrors).map(([field, errors]) => (
                <li key={field}>
                  {field}: {errors.map((e) => labels[e] ?? e).join(', ')}
                </li>
              ))}
            </ul>
          )}

          {status !== 'idle' && (
            <p
              data-testid="contact-status"
              className={`contact-status${status === 'success' ? ' is-success' : ' is-error'}`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
      {showCaptcha && turnstileSiteKey && (
        <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
      )}
      {showCaptcha && !turnstileSiteKey && recaptchaSiteKey && (
        <script src="https://www.google.com/recaptcha/api.js" async defer></script>
      )}
    </section>
  );
}
