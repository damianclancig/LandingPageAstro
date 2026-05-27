import { useEffect, useState } from 'react';
import type { Project } from '@/data/projects';

const CLOSE_ANIMATION_MS = 220;

type Props = {
  project: Project;
  labels: Record<string, string>;
};

export default function ProjectDialog({ project, labels }: Props) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const title = labels[`projects-${project.id}-title`] ?? project.title;
  const category = labels[`landing-portfolio-category-${project.category}`];
  const role = labels[`projects-${project.id}-role`] ?? project.role;
  const status = labels[`projects-${project.id}-status`] ?? project.status;
  const challenge = labels[`projects-${project.id}-challenge`] ?? project.challenge;
  const insight = labels[`projects-${project.id}-insight`] ?? project.seniorInsight;
  const productionLinks = project.demoUrls?.length
    ? project.demoUrls
    : project.demoUrl
      ? [{ url: project.demoUrl, label: labels['landing-portfolio-dialog-demo'] }]
      : [];

  const handleOpen = () => {
    setClosing(false);
    setOpen(true);
  };

  const handleClose = () => {
    if (closing) {
      return;
    }
    setClosing(true);
  };

  useEffect(() => {
    if (!closing) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, CLOSE_ANIMATION_MS);

    return () => window.clearTimeout(timer);
  }, [closing]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const body = document.body;
    const bodyLockedByMobileMenu = body.classList.contains('mobile-menu-modal');
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;

    if (!bodyLockedByMobileMenu) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      const computedPaddingRight = window.getComputedStyle(body).paddingRight;
      const currentPaddingRight = Number.parseFloat(computedPaddingRight) || 0;

      body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        body.style.paddingRight = `${currentPaddingRight + scrollbarWidth}px`;
      }
    }

    return () => {
      if (!bodyLockedByMobileMenu) {
        body.style.overflow = previousOverflow;
        body.style.paddingRight = previousPaddingRight;
      }
    };
  }, [open]);

  return (
    <>
      <button type="button" onClick={handleOpen} className="card glow showcase-card">
        <div className="showcase-card-category">{category}</div>
        <h3 className="showcase-card-title">{title}</h3>
        <p className="showcase-card-description">{challenge}</p>
        <span className="showcase-card-link">
          <span>{labels['landing-portfolio-view-details'] ?? 'Ver detalle'}</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="showcase-card-link-icon"
          >
            <path
              d="M7 17 17 7M8 7h9v9"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      {open && (
        <dialog
          open
          className={`project-dialog${closing ? ' is-closing' : ''}`}
          onClick={(event) => {
            if (event.currentTarget === event.target) {
              handleClose();
            }
          }}
        >
          <article className="project-dialog-panel">
            <header className="project-dialog-header">
              <div>
                <p className="project-dialog-category">{category}</p>
                <h3 className="project-dialog-title">{title}</h3>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="project-dialog-close"
                aria-label="Cerrar modal"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="project-dialog-close-icon"
                >
                  <path
                    d="m6 6 12 12M18 6 6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </header>

            <div className="project-dialog-content">
              <section className="project-dialog-meta">
                <article className="project-dialog-meta-item">
                  <p className="project-dialog-meta-label">
                    {labels['landing-portfolio-dialog-role']}
                  </p>
                  <p className="project-dialog-meta-value">{role}</p>
                </article>
                <article className="project-dialog-meta-item">
                  <p className="project-dialog-meta-label">
                    {labels['landing-portfolio-dialog-status']}
                  </p>
                  <p className="project-dialog-meta-value">{status}</p>
                </article>
              </section>

              <section className="project-dialog-section">
                <h4 className="project-dialog-section-title">
                  {labels['landing-portfolio-dialog-challenge']}
                </h4>
                <p className="project-dialog-paragraph">{challenge}</p>
              </section>

              <section className="project-dialog-section">
                <h4 className="project-dialog-section-title">
                  {labels['landing-portfolio-dialog-solution']}
                </h4>
                <ul className="project-dialog-solution-list">
                  {project.solution.map((s, i) => (
                    <li key={i} className="project-dialog-solution-item">
                      {labels[`projects-${project.id}-solution-${i}`] ?? s}
                    </li>
                  ))}
                </ul>
              </section>

              {insight && (
                <section className="project-dialog-section">
                  <h4 className="project-dialog-section-title">
                    {labels['landing-portfolio-dialog-insight']}
                  </h4>
                  <p className="project-dialog-paragraph">{insight}</p>
                </section>
              )}

              <section className="project-dialog-section">
                <h4 className="project-dialog-section-title">
                  {labels['landing-portfolio-dialog-tech']}
                </h4>
                <div className="project-dialog-tech-list">
                  {project.techSpecs.map((tech) => (
                    <span key={tech} className="project-dialog-tech-chip">
                      {tech}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            <footer className="project-dialog-footer">
              {productionLinks.length > 0 && (
                <div className="project-dialog-demo-links">
                  {productionLinks.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="project-dialog-demo-button"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </footer>
          </article>
        </dialog>
      )}
    </>
  );
}
