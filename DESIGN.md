# DESIGN.md

The design system for this single-page application. Every value lives in
code; this document names tokens and explains intent, it never repeats a
hex or pixel value.

- Token source: [`src/styles/tokens.css`](src/styles/tokens.css)
- Shared patterns: [`src/styles/shared.module.css`](src/styles/shared.module.css)

---

## 1. Intent

**Character:** calm, precise, engineered. The page should read like good
technical documentation or a well-configured terminal: quiet, exact, and
confident enough not to decorate.

**Principles**

1. **Content first.** Layout exists to make the seven requirements and their
   evidence easy to scan and compare. Nothing competes with the text.
2. **One family, two registers.** Inter (`--font-sans`) is the only
   typeface. Text meant to be *read* (names, quotes, headings, prose) uses
   the reading register. Text meant to be *referenced* (numbers, labels,
   captions, URLs, navigation) uses the metadata register: smaller, with
   slashed zeros, tabular figures on numbers, and uppercase with wide
   tracking for labels. The precision comes from that discipline, not from a second font.
3. **Near-monochrome, one accent.** Neutral greys do all structural work.
   The accent is a muted terminal green. `--color-accent` is a marker, not a fill: it appears on section numbers,
   the requirement rule, active nav state, links on hover, the header cursor
   and focus rings. Never on large areas or body text.
4. **Square.** No border radius and no shadows anywhere. Depth comes from
   hairlines and spacing, not elevation.
5. **Hairlines over boxes.** Structure is drawn with `--border-width` rules
   between sections and rows, not with cards or filled panels.
6. **Restrained motion.** One reveal on scroll and short color transitions on
   hover. All motion is removed under `prefers-reduced-motion`.

**Layout**

- One reading column, `--content-max` wide.
- On wide screens, a sticky section nav sits beside the column. Header,
  nav and column share one outer width (`--shell-max`) so their edges align.
- On narrow screens the nav is hidden and the page reads top to bottom.
- Light and dark are equal citizens: every color token defines both.

---

## 2. Tokens

Names and roles only. Values: [`tokens.css`](src/styles/tokens.css).

### Color

| Token                   | Role                                                   |
| ----------------------- | ------------------------------------------------------ |
| `--color-bg`            | Page and header background                             |
| `--color-surface`       | Inset surfaces (placeholder slots)                     |
| `--color-text`          | Primary text, headings, active nav                     |
| `--color-text-muted`    | Secondary text: prose, captions, inactive nav, labels  |
| `--color-border`        | Hairline rules between sections, rows, header          |
| `--color-border-strong` | Hover borders, placeholder outline                     |
| `--color-accent`        | The single accent; see principle 3 for where it goes   |
| `--color-accent-soft`   | Text selection background only                         |

Each color uses `light-dark()`. Theme switching sets `color-scheme` and
nothing else.

### Typography

| Token                                                     | Role                                               |
| --------------------------------------------------------- | -------------------------------------------------- |
| `--font-sans`                                             | All text; the only family                          |
| `--text-display`                                          | Hero name                                          |
| `--text-2xl`                                              | Hero hook, closing title                           |
| `--text-xl`                                               | Requirement quote                                  |
| `--text-lg`                                               | Evidence title                                     |
| `--text-base`                                             | Body prose                                         |
| `--text-sm`                                               | Metadata default: nav, counters, header, links     |
| `--text-xs`                                               | Labels, captions, footer                           |
| `--weight-regular` / `medium` / `semibold` / `bold`       | Body / UI emphasis / headings / display            |
| `--leading-tight` / `snug` / `normal` / `body`            | Display / headings / quote and nav / prose         |
| `--tracking-tight` / `snug` / `wide`                      | Display / headings and quote / uppercase labels    |

### Spacing

| Token                         | Role                                              |
| ----------------------------- | ------------------------------------------------- |
| `--space-1` … `--space-10`    | 4px-based scale; the only spacing values allowed  |
| `--section-space`             | Vertical padding of every page section            |
| `--gutter`                    | Horizontal page padding; steps up at breakpoints  |

### Borders

| Token                    | Role                                                       |
| ------------------------ | ---------------------------------------------------------- |
| `--border-width`         | All hairlines                                              |
| `--border-width-accent`  | Accent rules: requirement quote, active nav, focus ring    |

There is no radius token. Radius is always zero.

### Layout

| Token              | Role                                                      |
| ------------------ | --------------------------------------------------------- |
| `--content-max`    | Reading column width                                      |
| `--measure-hook`   | Max line length of the hero hook                          |
| `--nav-width`      | Section nav column                                        |
| `--nav-gap`        | Gap between nav and column                                |
| `--shell-max`      | Shared outer width of header and body (derived)           |
| `--header-height`  | Fixed header; also offsets anchors and the hero           |
| `--hero-top`       | Hero top padding; the nav aligns to it                    |
| `--control-size`   | Square icon button                                        |

### Motion

| Token                | Role                                     |
| -------------------- | ---------------------------------------- |
| `--duration-fast`    | Hover and state transitions              |
| `--duration-reveal`  | Scroll reveal                            |
| `--stagger`          | Delay between revealed children          |
| `--ease-out`         | Default easing                           |

### Breakpoints

Custom properties cannot be used in media queries, so breakpoints are
written literally. Only these three exist:

| Value   | Effect                                                    |
| ------- | --------------------------------------------------------- |
| `30rem` | Link rows stack label above value                         |
| `40rem` | `--gutter` steps up                                       |
| `68rem` | Nav column appears; `--gutter` and `--shell-max` step up  |

---

## 3. Implementation mapping

**Stack:** React, TypeScript (strict), Vite, CSS Modules. No UI library, no
utility framework. Tokens are CSS custom properties and are consumed
directly with `var()`; there is no second token layer.

### Shared patterns

Defined once in [`shared.module.css`](src/styles/shared.module.css) and
pulled into components with `composes:`.

| Pattern    | What it is                                         | Used by                                                  |
| ---------- | -------------------------------------------------- | -------------------------------------------------------- |
| `meta`     | Metadata register: small, slashed zeros            | Header mark, counter, caption, nav link, link row, footer |
| `numeric`  | Tabular figures; pure numbers only (in Inter, `tnum` also widens hyphens) | Section counter, nav index |
| `label`    | `meta` plus uppercase and wide tracking; color set by user | Hero eyebrow, section label, evidence label, closing eyebrow, links heading |
| `section`  | Section padding and top hairline                   | `RequirementSection`, `Closing`                          |
| `reveal`   | Staggered fade-up of children, driven by `data-in-view` | `RequirementSection`, `Closing`                     |

### Components

| Design element         | Component                                        | Notes                                              |
| ---------------------- | ------------------------------------------------ | -------------------------------------------------- |
| Fixed header           | `Header`                                         | Metadata mark with accent block cursor             |
| Theme switch           | `ThemeToggle` + `useTheme`                       | Square icon button, `--control-size`               |
| Hero                   | `Hero`                                           |                                                    |
| Requirement block      | `RequirementSection`                             | One component, rendered for each entry in `content.ts` |
| Section navigation     | `SectionNav` + `useActiveSection`                | Wide screens only                                  |
| Closing and links      | `Closing`                                        | Rows with placeholder URLs render inert            |
| Any piece of copy      | `Copy` / `Prose`                                 | Marks unfilled `{{placeholders}}`; renders `` `code` `` as a framed inline span |
| Section numbering      | `formatIndex` (`src/utils`)                      | Always two digits                                  |

All copy lives in [`src/content.ts`](src/content.ts). Components contain no
user-facing text except fixed UI labels.

### Rules

These are the review checklist. A change that breaks one needs a reason.

1. **Values come from tokens.** No literal colors, spacing, font sizes,
   weights, line heights, tracking, durations or border widths in component
   CSS. Allowed exceptions: glyph-relative `em` / `ch` values tied to a
   specific glyph (cursor size, placeholder padding, arrow nudge), SVG
   attributes inside icons, and the three breakpoints.
2. **No radius, no shadow.** `border-radius` and `box-shadow` do not appear.
3. **Accent is a marker.** `--color-accent` only on the elements listed in
   principle 3. Never as a background except `--color-accent-soft` for
   selection.
4. **One typeface.** No second font family. New labels, numbers or captions
   compose `label` or `meta`; they do not restyle text by hand.
5. **Reuse shared patterns.** A new page section composes `section` (and
   `reveal` if it animates). Do not copy their declarations.
6. **Both themes, every time.** New colors are added as `light-dark()`
   tokens, never inside a component.
7. **Motion is optional.** Anything animated has a reduced-motion path.
8. **Copy stays in `content.ts`.**

### Known exceptions

Literal values that remain on purpose under rule 1:

| Location                         | Value             | Why                                      |
| -------------------------------- | ----------------- | ---------------------------------------- |
| `Header.module.css` `.cursor`    | `1ch` × `1.1em`   | Block cursor sized to the adjacent text  |
| `Copy.module.css` `.placeholder` | `em` padding      | Scales with whatever text it replaces    |
| `Copy.module.css` `.code`        | `em` padding/size | Scales with the sentence it sits in      |
| `Closing.module.css` `.arrow`    | `0.15em` nudge    | Scales with the arrow glyph              |
| `ThemeToggle.tsx`                | SVG size, stroke  | Icon geometry                            |
| `global.css` `.visually-hidden`  | `1px`             | Standard accessible-hiding pattern       |
