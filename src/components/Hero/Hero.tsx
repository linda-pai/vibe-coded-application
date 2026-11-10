import { hero } from '../../content';
import { Copy, Prose } from '../Copy/Copy';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-name">
      <p className={styles.eyebrow}>{hero.eyebrow}</p>
      <h1 id="hero-name" className={styles.name}>
        <Copy text={hero.name} />
      </h1>
      <p className={styles.hook}>
        <Copy text={hero.hook} />
      </p>
      <Prose text={hero.intro} className={styles.intro} />
    </section>
  );
}
