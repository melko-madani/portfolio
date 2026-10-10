import type { StoryPattern as Kind } from '../../content/types'
import { useContent } from '../../lib/locale'

/**
 * Bold graphic faces for the story cards, drawn with SVG patterns in the
 * site's palette. Each pattern echoes the story: a portrait framed by a
 * checker, a road of stripes, a process grid, annotated documents, waves of
 * measurements. `id` keeps pattern ids unique when several cards are mounted.
 */
export function StoryPattern({ kind, id, large = false }: { kind: Kind; id: string; large?: boolean }) {
  const { profile } = useContent()
  const p = (name: string) => `${id}-${name}`
  switch (kind) {
    case 'portrait':
      return (
        <svg viewBox="0 0 240 320" className="size-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id={p('check')} width="24" height="24" patternUnits="userSpaceOnUse">
              <rect width="12" height="12" fill="var(--color-sand)" />
              <rect x="12" y="12" width="12" height="12" fill="var(--color-sand)" />
            </pattern>
            <clipPath id={p('clip')}>
              <rect x="24" y="40" width="192" height="240" rx="8" />
            </clipPath>
            <filter id={p('duo')}>
              <feColorMatrix type="saturate" values="0" />
              <feComponentTransfer>
                <feFuncR type="table" tableValues="0.09 0.96" />
                <feFuncG type="table" tableValues="0.1 0.95" />
                <feFuncB type="table" tableValues="0.09 0.93" />
              </feComponentTransfer>
            </filter>
          </defs>
          <rect width="240" height="320" fill="var(--color-sage-deep)" />
          <rect width="240" height="320" fill={`url(#${p('check')})`} opacity="0.9" />
          <rect x="24" y="40" width="192" height="240" rx="8" fill="var(--color-ink)" />
          <image
            href={profile.portrait.src}
            x="24"
            y="40"
            width="192"
            height="240"
            preserveAspectRatio="xMidYMid slice"
            clipPath={`url(#${p('clip')})`}
            filter={`url(#${p('duo')})`}
          />
          <rect x="24" y="40" width="192" height="240" rx="8" fill="var(--color-sage-deep)" opacity="0.35" style={{ mixBlendMode: 'multiply' }} />
          {large && <circle cx="204" cy="52" r="6" fill="var(--color-sand)" />}
        </svg>
      )
    case 'road':
      return (
        <svg viewBox="0 0 240 320" className="size-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id={p('stripe')} width="32" height="32" patternUnits="userSpaceOnUse" patternTransform="rotate(-28)">
              <rect width="16" height="32" fill="var(--color-sand)" />
              <rect x="16" width="16" height="32" fill="var(--color-paper)" />
            </pattern>
          </defs>
          <rect width="240" height="320" fill={`url(#${p('stripe')})`} />
          <path d="M-20 300 C 60 240, 40 140, 120 110 S 230 40, 270 -10" fill="none" stroke="var(--color-ink)" strokeWidth="34" strokeLinecap="round" />
          <path d="M-20 300 C 60 240, 40 140, 120 110 S 230 40, 270 -10" fill="none" stroke="var(--color-paper)" strokeWidth="3" strokeDasharray="14 14" />
          <circle cx="36" cy="276" r="9" fill="var(--color-sage)" />
          <circle cx="206" cy="36" r="9" fill="var(--color-signal)" />
        </svg>
      )
    case 'grid':
      return (
        <svg viewBox="0 0 240 320" className="size-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id={p('dots')} width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="2.2" fill="var(--color-paper)" opacity="0.7" />
            </pattern>
          </defs>
          <rect width="240" height="320" fill="var(--color-ink)" />
          <rect width="240" height="320" fill={`url(#${p('dots')})`} />
          {[
            [30, 50, 80, 56],
            [130, 50, 80, 56],
            [30, 132, 180, 56],
            [30, 214, 80, 56],
            [130, 214, 80, 56],
          ].map(([x, y, w, h], i) => (
            <rect key={i} x={x} y={y} width={w} height={h} rx="8" fill={i === 2 ? 'var(--color-sage)' : 'var(--color-sand)'} />
          ))}
          <path d="M70 106v26M170 106v26M70 188v26M170 188v26" stroke="var(--color-paper)" strokeWidth="3" />
        </svg>
      )
    case 'documents':
      return (
        <svg viewBox="0 0 240 320" className="size-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
          <rect width="240" height="320" fill="var(--color-sage-soft)" />
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${44 + i * 18} ${36 + i * 22}) rotate(${-6 + i * 6} 70 100)`}>
              <rect width="140" height="190" rx="8" fill={i === 2 ? '#fbfaf7' : 'var(--color-paper-3)'} stroke="rgba(23,25,24,0.18)" />
              {[0, 1, 2, 3, 4, 5].map((j) => (
                <rect key={j} x="18" y={34 + j * 22} width={[70, 96, 60, 88, 52, 80][j]} height="5" rx="2.5" fill="rgba(23,25,24,0.3)" />
              ))}
              {i === 2 && (
                <>
                  <rect x="14" y="28" width="86" height="16" rx="4" fill="none" stroke="var(--color-sage-deep)" strokeWidth="2" />
                  <rect x="14" y="116" width="60" height="16" rx="4" fill="none" stroke="var(--color-sage-deep)" strokeWidth="2" />
                  <rect x="18" y="162" width="104" height="10" rx="5" fill="var(--color-sage-deep)" />
                </>
              )}
            </g>
          ))}
          <rect x="24" y="268" width="192" height="28" rx="14" fill="var(--color-ink)" />
          <circle cx="44" cy="282" r="5" fill="var(--color-sage)" />
          <rect x="58" y="279" width="120" height="6" rx="3" fill="var(--color-sand)" />
        </svg>
      )
    case 'waves':
      return (
        <svg viewBox="0 0 240 320" className="size-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
          <rect width="240" height="320" fill="var(--color-sand)" />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <path
              key={i}
              d={`M-10 ${60 + i * 36} C 50 ${30 + i * 36}, 90 ${90 + i * 36}, 150 ${60 + i * 36} S 240 ${30 + i * 36}, 260 ${60 + i * 36}`}
              fill="none"
              stroke={i % 2 ? 'var(--color-ink)' : 'var(--color-sage-deep)'}
              strokeWidth={i % 2 ? 10 : 6}
              strokeLinecap="round"
            />
          ))}
          <rect x="150" y="226" width="66" height="66" rx="33" fill="var(--color-paper)" />
          <path d="M168 262l12 12 22-26" fill="none" stroke="var(--color-ink)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
  }
}
