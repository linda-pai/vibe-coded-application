/*
 * All page copy lives here. Components only handle layout.
 *
 * Any string wrapped entirely in {{ }} renders as a visible placeholder,
 * so unfilled content is obvious on the page. Replace it with real copy
 * and it renders as normal text. Separate paragraphs with a blank line.
 */

export interface Requirement {
  /** Anchor id, also used by the section nav. */
  id: string;
  /** Short label for the nav and section heading. */
  label: string;
  /** Requirement text, verbatim from the job description. */
  quote: string;
  evidence: {
    title: string;
    body: string;
  };
}

export interface ContactLink {
  label: string;
  /** Shown to the right of the label, e.g. "github.com/handle". */
  display: string;
  href: string;
}

export const hero = {
  eyebrow: 'Application — Lead Web Engineer at Genki',
  name: '{{Hero — 名字}}',
  hook: '{{Hero — 一句 hook}}',
  intro: '{{Hero — 個人介紹}}',
};

export const requirements: readonly Requirement[] = [
  {
    id: 'shipping',
    label: 'Shipping end-to-end',
    quote:
      "You've built and shipped production web applications end-to-end, from static sites to complex SPAs, and you know where the real problems hide in each.",
    evidence: {
      title: '{{需求 1 證據 — 標題}}',
      body: '{{需求 1 證據 — 內容}}',
    },
  },
  {
    id: 'architecture',
    label: 'Architectural bets',
    quote:
      "You've made major architectural bets and stayed long enough to learn whether they were right.",
    evidence: {
      title: '{{需求 2 證據 — 標題}}',
      body: '{{需求 2 證據 — 內容}}',
    },
  },
  {
    id: 'infrastructure',
    label: 'Cross-project infrastructure',
    quote:
      'Proven experience with cross-project infrastructure: shared component libraries, CI/CD pipelines, monorepo setups, deployment automation.',
    evidence: {
      title: '{{需求 3 證據 — 標題}}',
      body: '{{需求 3 證據 — 內容}}',
    },
  },
  {
    id: 'security-performance',
    label: 'Security & performance',
    quote:
      'Strong understanding of web security, performance optimization, and browser capabilities.',
    evidence: {
      title: '{{需求 4 證據 — 標題}}',
      body: '{{需求 4 證據 — 內容}}',
    },
  },
  {
    id: 'detail',
    label: 'Eye for detail',
    quote:
      'You have a sharp eye for detail, from pixel-perfect implementation to clean, consistent code.',
    evidence: {
      title: '{{需求 5 證據 — 標題}}',
      body: '{{需求 5 證據 — 內容}}',
    },
  },
  {
    id: 'ai-tools',
    label: 'Steering AI agents',
    quote:
      'You use AI-agentic development tools daily (Claude Code, Codex, or similar) and know how to steer them effectively, including when to trust the output.',
    evidence: {
      title: '{{需求 6 證據 — 標題}}',
      body: '{{需求 6 證據 — 內容}}',
    },
  },
  {
    id: 'team-tooling',
    label: 'Tooling for teams',
    quote:
      "You've set up and maintained CI/CD, testing strategies, and developer tooling for teams, not just yourself.",
    evidence: {
      title: '{{需求 7 證據 — 標題}}',
      body: '{{需求 7 證據 — 內容}}',
    },
  },
];

export const closing = {
  eyebrow: 'On the Lead title',
  title: '{{Lead title 聲明 — 標題}}',
  body: '{{Lead title 聲明 — 內容}}',
};

export const links: readonly ContactLink[] = [
  { label: 'GitHub', display: '{{GitHub 顯示文字}}', href: '{{GitHub URL}}' },
  { label: 'Portfolio', display: '{{Portfolio 顯示文字}}', href: '{{Portfolio URL}}' },
  { label: 'LifeBook', display: '{{LifeBook 顯示文字}}', href: '{{LifeBook URL}}' },
  { label: 'Email', display: '{{Email 地址}}', href: '{{mailto: 連結}}' },
  { label: 'LinkedIn', display: '{{LinkedIn 顯示文字}}', href: '{{LinkedIn URL}}' },
];
