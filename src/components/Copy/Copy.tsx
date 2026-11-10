import styles from './Copy.module.css';

const PLACEHOLDER = /^\{\{[\s\S]+\}\}$/;
const CODE = /^`[^`]+`$/;
/** Captures each {{placeholder}} and `code` span so split() keeps them as segments. */
const INLINE_TOKENS = /(\{\{[\s\S]+?\}\}|`[^`]+`)/;

/** True when the whole string is a single unfilled placeholder. */
export function isPlaceholder(text: string): boolean {
  return PLACEHOLDER.test(text.trim());
}

/** Renders a piece of copy, marking {{placeholders}} and `code` within it. */
export function Copy({ text }: { text: string }) {
  const segments = text.trim().split(INLINE_TOKENS).filter(Boolean);

  return (
    <>
      {segments.map((segment, index) => {
        if (isPlaceholder(segment)) {
          return (
            <span key={index} className={styles.placeholder}>
              {segment}
            </span>
          );
        }
        if (CODE.test(segment)) {
          return (
            <code key={index} className={styles.code}>
              {segment.slice(1, -1)}
            </code>
          );
        }
        return segment;
      })}
    </>
  );
}

/** Renders copy as paragraphs, split on blank lines. */
export function Prose({ text, className }: { text: string; className?: string }) {
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <div className={className}>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>
          <Copy text={paragraph} />
        </p>
      ))}
    </div>
  );
}
