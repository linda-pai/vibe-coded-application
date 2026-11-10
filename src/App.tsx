import { Closing } from './components/Closing/Closing';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { RequirementSection } from './components/RequirementSection/RequirementSection';
import { SectionNav } from './components/SectionNav/SectionNav';
import { requirements } from './content';
import styles from './App.module.css';

export function App() {
  return (
    <>
      <Header />
      <div className={styles.shell}>
        <aside className={styles.aside}>
          <SectionNav />
        </aside>
        <main className={styles.main}>
          <Hero />
          {requirements.map((requirement, index) => (
            <RequirementSection
              key={requirement.id}
              requirement={requirement}
              index={index}
              total={requirements.length}
            />
          ))}
          <Closing />
          <footer className={styles.footer}>Built with React, TypeScript and Vite.</footer>
        </main>
      </div>
    </>
  );
}
