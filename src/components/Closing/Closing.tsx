import { closing, links, type ContactLink } from '../../content';
import { useInView } from '../../hooks/useInView';
import { Copy, isPlaceholder, Prose } from '../Copy/Copy';
import styles from './Closing.module.css';

export function Closing() {
  const [ref, inView] = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      id="closing"
      className={styles.section}
      data-in-view={inView}
      aria-labelledby="closing-heading"
    >
      <div className={styles.statement}>
        <p className={styles.eyebrow}>{closing.eyebrow}</p>
        <h2 id="closing-heading" className={styles.title}>
          <Copy text={closing.title} />
        </h2>
        <Prose text={closing.body} className={styles.body} />
      </div>

      <div className={styles.links}>
        <h3 className={styles.linksHeading}>Links</h3>
        <ul className={styles.list}>
          {links.map((link) => (
            <li key={link.label}>
              <LinkRow link={link} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function LinkRow({ link }: { link: ContactLink }) {
  const content = (
    <>
      <span className={styles.linkLabel}>{link.label}</span>
      <span className={styles.linkDisplay}>
        <Copy text={link.display} />
      </span>
      <span className={styles.arrow} aria-hidden="true">
        ↗
      </span>
    </>
  );

  // Unfilled URL: render an inert row rather than a broken link.
  if (isPlaceholder(link.href)) {
    return (
      <span className={styles.row} title={link.href}>
        {content}
      </span>
    );
  }

  const isExternal = /^https?:\/\//.test(link.href);
  return (
    <a
      className={styles.row}
      href={link.href}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {content}
    </a>
  );
}
