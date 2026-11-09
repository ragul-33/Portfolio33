import { useEffect, useState } from 'react';

/**
 * Reports which section is currently the focus of the viewport, so the
 * navigation can mark the active item.
 *
 * @param {string[]} ids section element ids in document order
 */
export default function useActiveSection(ids, rootMargin = '-45% 0px -50% 0px') {
  const [active, setActive] = useState(ids[0] ?? null);

  useEffect(() => {
    if (!ids.length) return;

    const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin, threshold: [0, 0.15, 0.4, 0.75] }
    );

    nodes.forEach((node) => observer.observe(node));

    const onScrollEnd = () => {
      // Pin the last section once the page is scrolled to the very bottom.
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 80) {
        setActive(ids[ids.length - 1]);
      }
    };
    window.addEventListener('scroll', onScrollEnd, { passive: true });
    onScrollEnd();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScrollEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join('|'), rootMargin]);

  return active;
}