import { requirements } from '../../content';
import { useActiveSection } from '../../hooks/useActiveSection';
import styles from './SectionNav.module.css';

const ids = requirements.map((requirement) => requirement.id);

export function SectionNav() {
  const active = useActiveSection(ids);

  return (
    <nav className={styles.nav} aria-label="Requirements">
      <ol className={styles.list}>
        {requirements.map((requirement, index) => {
          const isActive = requirement.id === active;
          return (
            <li key={requirement.id}>
              <a
                href={`#${requirement.id}`}
                className={styles.link}
                aria-current={isActive ? 'location' : undefined}
              >
                <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
                <span>{requirement.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
