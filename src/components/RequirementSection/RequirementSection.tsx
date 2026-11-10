import type { Requirement } from '../../content';
import { useInView } from '../../hooks/useInView';
import { Copy, Prose } from '../Copy/Copy';
import styles from './RequirementSection.module.css';

interface Props {
  requirement: Requirement;
  index: number;
  total: number;
}

export function RequirementSection({ requirement, index, total }: Props) {
  const [ref, inView] = useInView<HTMLElement>();
  const headingId = `${requirement.id}-heading`;

  return (
    <section
      ref={ref}
      id={requirement.id}
      className={styles.section}
      data-in-view={inView}
      aria-labelledby={headingId}
    >
      <header className={styles.header}>
        <span className={styles.counter}>
          <span className={styles.index}>{formatIndex(index + 1)}</span>
          <span aria-hidden="true"> / </span>
          <span className="visually-hidden"> of </span>
          {formatIndex(total)}
        </span>
        <h2 id={headingId} className={styles.label}>
          {requirement.label}
        </h2>
      </header>

      <figure className={styles.requirement}>
        <blockquote className={styles.quote}>
          <p>{requirement.quote}</p>
        </blockquote>
        <figcaption className={styles.caption}>From the job description</figcaption>
      </figure>

      <div className={styles.evidence}>
        <p className={styles.evidenceLabel}>Evidence</p>
        <h3 className={styles.evidenceTitle}>
          <Copy text={requirement.evidence.title} />
        </h3>
        <Prose text={requirement.evidence.body} className={styles.evidenceBody} />
      </div>
    </section>
  );
}

function formatIndex(value: number): string {
  return String(value).padStart(2, '0');
}
