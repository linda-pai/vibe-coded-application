import { useEffect, useState } from 'react';

/**
 * Returns the id of the section crossing a band just above the middle of
 * the viewport, or null when none is (e.g. while the hero is in view).
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // Several can overlap the band at a boundary; keep document order.
        setActive(ids.find((id) => visible.has(id)) ?? null);
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
