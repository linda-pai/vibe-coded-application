# Lead Web Engineer — Application to Genki

A single-page application for the Lead Web Engineer role at Genki. It goes
through the seven requirements in the job description one by one, and pairs
each one with evidence from my work.

The page is part of the application. I built it with the same standards I
would bring to Genki's web codebase: a small dependency footprint, typed
content, accessible markup, and a design system written down in
[DESIGN.md](DESIGN.md).

## Quick start

```bash
npm install
npm run dev        # local dev server
npm run build      # type-check, then production build to dist/
npm run preview    # serve the production build
npm run typecheck  # type-check only
```

## Stack

| Layer      | Choice                                       | Why                                                        |
| ---------- | -------------------------------------------- | ---------------------------------------------------------- |
| UI         | React 19                                     | Component model; no other runtime dependencies             |
| Language   | TypeScript (strict)                          | Content and props are typed end to end                     |
| Build      | Vite                                         | Fast dev server, static output that deploys anywhere       |
| Styling    | CSS Modules + CSS custom properties          | Scoped styles, one token file, no CSS-in-JS runtime        |
| Theming    | `light-dark()` + `[data-theme]` override     | Follows the system theme with no JS; manual toggle on top  |
| Browser APIs | `IntersectionObserver`, `matchMedia`       | Scroll reveal, active section, theme tracking              |

The only runtime dependencies are `react` and `react-dom`.

## Project structure

```
.
├── index.html                  # Shell, meta tags, font, pre-paint theme script
├── DESIGN.md                   # Design system: intent, tokens, rules
├── vite.config.ts
├── tsconfig.json
└── src/
    ├── main.tsx                # Entry point, mounts <App /> in StrictMode
    ├── App.tsx                 # Page layout: header, sticky nav, main column
    ├── App.module.css
    ├── content.ts              # All page copy, typed (single source of content)
    │
    ├── components/             # One folder per component: .tsx + .module.css
    │   ├── Header/             # Top bar with the role title and theme toggle
    │   ├── ThemeToggle/        # Light/dark switch
    │   ├── Hero/               # Intro: name, hook, why Genki
    │   ├── SectionNav/         # Sticky numbered nav, highlights the active section
    │   ├── RequirementSection/ # One requirement: quote from the JD + evidence
    │   ├── Closing/            # Closing statement and contact links
    │   └── Copy/               # Text renderer: paragraphs, `code`, {{placeholders}}
    │
    ├── hooks/
    │   ├── useActiveSection.ts # Which section is in the reading band (nav state)
    │   ├── useInView.ts        # One-time reveal when a section scrolls into view
    │   └── useTheme.ts         # System theme + stored override
    │
    ├── styles/
    │   ├── tokens.css          # Design tokens: color, type, spacing, motion
    │   ├── global.css          # Reset, base element styles, utilities
    │   └── shared.module.css   # Shared patterns (labels, rules, reveal)
    │
    └── utils/
        └── formatIndex.ts      # 1 → "01" for section numbering
```

## Architecture

### Content is separate from layout

All copy lives in [`src/content.ts`](src/content.ts) as typed data
(`Requirement`, `ContactLink`). Components only handle layout and never
contain copy. To add or reorder a requirement, you edit one array; the
section, its number (`03 / 07`) and its nav entry all follow from it.

```
content.ts ──► App.tsx ──► RequirementSection × 7
                  │
                  └──────► SectionNav (reads the same ids for anchors)
```

[`Copy`](src/components/Copy/Copy.tsx) renders every piece of text. It
splits paragraphs on blank lines, renders `` `backticks` `` as code, and
shows anything still wrapped in `{{ }}` as a visible placeholder, so
unfinished copy is obvious on the page instead of shipping silently. A link
whose URL is still a placeholder renders as an inert row, not a broken link.

### Scroll behavior uses observers, not scroll listeners

- [`useActiveSection`](src/hooks/useActiveSection.ts) watches every section
  with one `IntersectionObserver` and a narrow band just above the middle of
  the viewport. When two sections overlap the band at a boundary, it picks
  the one that comes first in the document, so the nav highlight never
  flickers.
- [`useInView`](src/hooks/useInView.ts) fires once per section for the
  reveal animation, then disconnects.

There are no scroll handlers and no layout reads on scroll.

### Theming without a flash

Colors are defined with `light-dark()` in
[`tokens.css`](src/styles/tokens.css), so by default the page follows the
system theme in pure CSS. The toggle stores an override and sets
`data-theme` on `<html>`, which pins `color-scheme` and switches every token
at once. A small inline script in `index.html` applies a stored override
before first paint. Toggling back to the system theme clears the override,
so the page tracks the system again. Storage access is wrapped in
`try/catch`, so private mode and blocked storage still work.

### Design system

[DESIGN.md](DESIGN.md) describes the intent (calm, precise, documentation-like),
names every token and its role, and maps them to components. It never repeats
a raw value: [`tokens.css`](src/styles/tokens.css) is the only source of
colors, sizes, spacing and motion, and components use only tokens.

### Accessibility

- Semantic landmarks: `header`, `nav`, `main`, `section` + `aria-labelledby`,
  `figure` / `blockquote` / `figcaption` for the quoted requirements.
- The active nav link uses `aria-current="location"`.
- Screen readers hear the counter as "03 of 07", not "03 / 07".
- All motion is removed under `prefers-reduced-motion`.
- Visible focus rings on every interactive element.
- Responsive: the sticky nav sits beside the column on wide screens and
  hides on narrow ones, where the page reads top to bottom.

## Contact

- GitHub: [github.com/linda-pai](https://github.com/linda-pai)
- Portfolio: [juoyingpai.vercel.app](https://juoyingpai.vercel.app)
- LinkedIn: [linkedin.com/in/linda-pai](https://www.linkedin.com/in/linda-pai/)
- Email: [juoyingpai@gmail.com](mailto:juoyingpai@gmail.com)
