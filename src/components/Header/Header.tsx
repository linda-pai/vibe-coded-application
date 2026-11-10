import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="#top" className={styles.mark}>
          <span className={styles.cursor} aria-hidden="true" />
          Lead Web Engineer
          <span className={styles.muted}>@ Genki</span>
        </a>
        <ThemeToggle />
      </div>
    </header>
  );
}
