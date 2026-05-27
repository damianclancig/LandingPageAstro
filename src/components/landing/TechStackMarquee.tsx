import { memo } from 'react';

type Props = {
  title: string;
  labels: {
    modern: string;
    mobile: string;
    enterprise: string;
    legacy: string;
  };
};

const stack = [
  { name: 'Next.js', type: 'modern' },
  { name: 'React', type: 'modern' },
  { name: 'Node.js', type: 'modern' },
  { name: 'TailwindCSS', type: 'modern' },
  { name: 'TypeScript', type: 'modern' },
  { name: 'Flutter', type: 'mobile' },
  { name: 'React Native', type: 'mobile' },
  { name: 'Java', type: 'enterprise' },
  { name: 'C# (.NET)', type: 'enterprise' },
  { name: 'SQL Server', type: 'enterprise' },
  { name: 'VB6', type: 'legacy' },
] as const;

function TechStackMarquee({ title, labels }: Props) {
  const duplicated = [...stack, ...stack];
  return (
    <section
      style={{
        padding: '6rem 0',
        borderTop: '1px solid hsl(var(--border))',
        borderBottom: '1px solid hsl(var(--border))',
      }}
    >
      <div className="container">
        <p
          style={{
            textAlign: 'center',
            margin: '0 0 1rem',
            fontFamily: 'var(--font-code)',
            color: 'hsl(var(--muted-foreground))',
          }}
        >
          {title}
        </p>
        <div className="marquee-viewport" style={{ overflow: 'hidden' }}>
          <div className="marquee-row">
            {duplicated.map((item, i) => (
              <div
                key={`${item.name}-${i}`}
                className="card glow tech-marquee-card"
                style={{ minWidth: '150px', padding: '.9rem', textAlign: 'center' }}
              >
                <div style={{ fontFamily: 'var(--font-code)' }}>{item.name}</div>
                <small style={{ color: 'hsl(var(--muted-foreground))' }}>{labels[item.type]}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .marquee-viewport {
          mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
        }
        .marquee-row { display:flex; gap:1.5rem; width:max-content; animation: slide 28s linear infinite; }
        @keyframes slide { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </section>
  );
}

export default memo(TechStackMarquee);
