/*
 * All page copy lives here. Components only handle layout.
 *
 * Anything wrapped in {{ }}, whole strings or inline within a sentence,
 * renders as a visible placeholder, so unfilled content is obvious on the
 * page. Replace it with real copy and it renders as normal text.
 * Wrap code in `backticks`. Separate paragraphs with a blank line.
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
  name: 'Pai',
  hook: 'Six years shipping production web apps. Four months a year living as a nomad. One of the people Genki is built for.',
  intro: "I'm a frontend engineer in Taipei with six years shipping production web apps — from government platforms to complex SPAs. I work fully remote and spend about four months a year as a digital nomad, so Genki isn't an abstract mission to me: I'm the person it's built for.\n\nLiving in Taiwan, healthcare is fast and everywhere — every time I travel I feel the gap, and I've watched it turn serious. \"Stay healthy wherever you go\" is something I'd build well because I'd be building it for myself too.\n\nHere's how I match what you're looking for — point by point.",
};

export const requirements: readonly Requirement[] = [
  {
    id: 'shipping',
    label: 'Shipping end-to-end',
    quote:
      "You've built and shipped production web applications end-to-end, from static sites to complex SPAs, and you know where the real problems hide in each.",
    evidence: {
      title: "Empty repo to production — three times, in three very different settings.",
      body:
        "I have taken products from an empty repo to production in three different settings. At CatchOpz I was the sole frontend engineer on an Ichiban Kuji prize-draw platform. I shipped a 32-screen LINE mini-app storefront and a 20-page admin console in under three months, with payments inside LINE, six shipping methods and a live draw queue on Firebase RTDB. Earlier I architected and built from scratch the frontend of the Ministry of Environment's Greenlife Information Platform (greenlifestyle.moenv.gov.tw). As PhotoPacer's founder and only engineer, I built and ran a race-photo marketplace for a year: 20 race events and 300+ paid orders.",
    },
  },
  {
    id: 'architecture',
    label: 'Architectural bets',
    quote:
      "You've made major architectural bets and stayed long enough to learn whether they were right.",
    evidence: {
      title: "I bet on Next.js before the channel was decided, and stayed to see it hold.",
      body:
        "On the Ichiban Kuji platform, the client had not yet decided whether the storefront would run only inside LINE or also in a regular browser. I chose Next.js, expecting a product like this to be promoted through several channels and to reach users in different environments. It also let one codebase serve every shop: the app resolves the shop from /shop/[shopId] and fetches its config on the server before render. The bet held, because players do come in from regular browsers, and flows like the convenience-store picker already worked both in LINE and on desktop; the cost was extra work up front during setup, deciding which work belonged on the server and which on the client.",
    },
  },
  {
    id: 'infrastructure',
    label: 'Cross-project infrastructure',
    quote:
      'Proven experience with cross-project infrastructure: shared component libraries, CI/CD pipelines, monorepo setups, deployment automation.',
    evidence: {
      title: "Shared libraries and typed contracts that keep a team — and a backend — in sync.",
      body:
        "At JKOPay (Taiwan's largest e-payment platform, 6M+ users), I worked in a large React/TypeScript Lerna monorepo with micro-frontends and a shared component library used across multiple product surfaces, and I contributed components to that library. On that setup I shipped the insurance platform frontend, the claim pages for the government's Quintuple Stimulus Voucher, the official website, and other payment and webview flows. At CatchOpz, I generate the frontend's API types from the backend team's OpenAPI schema, so the Ichiban Kuji storefront and admin share typed RTK Query layers (190+ endpoints) that stay in sync with the backend.",
    },
  },
  {
    id: 'security-performance',
    label: 'Security & performance',
    quote:
      'Strong understanding of web security, performance optimization, and browser capabilities.',
    evidence: {
      title: "When the work involves money, I let the server be the source of truth.",
      body:
        "I built JKOPay's official website with Next.js SSR, optimized for SEO and performance, with i18next/Crowdin localization. Much of my work involves auth and money: JWT authentication at Greenlife, Google and LINE login plus NewebPay and LINE Pay at PhotoPacer, and an Ichiban Kuji payment flow where the client shows success only after the server reports the order as PAID. That flow also re-fetches the draw price every time, because the server recalculates the real charge.",
    },
  },
  {
    id: 'detail',
    label: 'Eye for detail',
    quote:
      'You have a sharp eye for detail, from pixel-perfect implementation to clean, consistent code.',
    evidence: {
      title: "The details nobody notices — until they’re wrong.",
      body:
        "This page and my portfolio show it. In the Ichiban Kuji reveal, the ticket number follows a Bézier curve spaced by arc length so the letters don't bunch up, a ticket peeled past 42% finishes peeling by itself, and the rare-prize glow turns off under prefers-reduced-motion. In a luxury jewelry e-shop, a CSS outline left visual ghosting in LINE's iOS WebView, so I replaced it with dedicated SVG assets. A `:global()` in a plain CSS file is invalid, so the browser silently drops the whole rule — no error, barely visible in DevTools. It broke autofill and pagination styling in production before I traced it and made it a CLAUDE.md rule.",
    },
  },
  {
    id: 'ai-tools',
    label: 'Steering AI agents',
    quote:
      'You use AI-agentic development tools daily (Claude Code, Codex, or similar) and know how to steer them effectively, including when to trust the output.',
    evidence: {
      title: "I treat a confident AI answer as a draft to verify, not a fact to trust.",
      body:
        "During a code review, an AI agent flagged a branch as dead code: the branch shows a redeem button for serial-code virtual goods, and the agent concluded it could never run because a comment in the generated OpenAPI types said the url field was only for link-type goods. That conclusion rested on a single line of documentation, so I checked with the backend: serial-code goods do carry a URL, and the comment was incomplete, in a generated file the frontend repo can't edit. I kept the code and recorded for the agent that the branch is intentional, so later reviews won't flag it again. Agents read contracts well, but they can't tell a wrong contract from wrong code, and only the backend could say which one was true here.",
    },
  },
  {
    id: 'team-tooling',
    label: 'Tooling for teams',
    quote:
      "You've set up and maintained CI/CD, testing strategies, and developer tooling for teams, not just yourself.",
    evidence: {
      title: "I’ve built the “let non-engineers ship safely” setup you’re describing.",
      body:
        "At JKOPay I was part of the team that built a no-code campaign page builder, so the internal marketing team could create and publish campaign pages without engineering support. I worked closely with marketing to understand the pages they wanted, then added components to the builder that fit how they used it. Marketing published nearly 100 pages with it in a year, and it is still in use today. At CatchOpz I moved two jewelry e-shops from hardcoded config to the CMS, so merchandising content and its translations are now managed through backend APIs instead of code changes.",
    },
  },
];

export const closing = {
  eyebrow: 'On the Lead title',
  title: 'Frontend engineer who builds things that last.',
  body: "6 years of frontend work, including a 2-year, ongoing partnership with the same client, where the CTO invited me to join their hackathon. Based in Taiwan, working remotely from wherever I’m living.",
};

export const links: readonly ContactLink[] = [
  { label: 'GitHub', display: 'github.com/linda-pai', href: 'https://github.com/linda-pai' },
  { label: 'Portfolio', display: 'juoyingpai.vercel.app', href: 'https://juoyingpai.vercel.app' },
  { label: 'LifeBook', display: 'lifebooks-mu.vercel.app', href: 'https://lifebooks-mu.vercel.app' },
  { label: 'Email', display: 'juoyingpai@gmail.com', href: 'mailto:juoyingpai@gmail.com' },
  {
    label: 'LinkedIn',
    display: 'linkedin.com/in/linda-pai',
    href: 'https://www.linkedin.com/in/linda-pai/',
  },
];
