import styles from './Copy.module.css';

const PLACEHOLDER = /^\{\{[\s\S]+\}\}$/;

export function isPlaceholder(text: string): boolean {
  return PLACEHOLDER.test(text.trim());
}

/** Renders a single piece of copy, marking unfilled {{placeholders}}. */
export function Copy({ text }: { text: string }) {
  if (isPlaceholder(text)) {
    return <span className={styles.placeholder}>{text.trim()}</span>;
  }
  return <>{text}</>;
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
