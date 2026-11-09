🌐 Suabochica Website
==================

Project with the content that I want to share in my personal webpage based in a JSON file. There, you will find my social networks, work experience and portfolio. I hope that you like it.

☑️ TODO List
---

- [x] Add certificates section in en json.
- [x] Add work section in en json.
- [x] Add education section in en json.
- [x] Add project section in en json.
- [x] Update theme.
- [x] Add one page cv.
- [x] Connect with blog.
- [x] Add Spanish json.
- [x] Check dark/light theme.
- [x] Check design on small viewports.

🧰 Tech Stack
---

- [JavaScript](https://www.javascript.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Astro](https://astro.build/)
- [JSON Resume](https://jsonresume.org)
- [Ninja Keys](https://github.com/ssleptsov/ninja-keys)
- [pnpm](https://pnpm.io/)

🛠️ Installation
---

Use Node 24.22.1 (see `.nvmrc`) and pnpm. Install dependencies with:

    pnpm install --frozen-lockfile

The website uses `suabochica-design-system@1.4.0` with Astro's React integration.
The package stylesheet is loaded once in `src/layouts/Layout.astro`; React
components render to static HTML unless explicitly hydrated. The layout applies
the `.sua-theme` boundary and owns the persisted light/dark/system preference
(`theme-preference` in localStorage). With no saved choice, the CSS follows the
operating system. The hero, prose, résumé, projects, credentials, and skills use
packaged components while retaining the site's Spanish/English JSON content and
résumé-first page order. `src/components/ResumeEntry.astro` is a site composition
of the design-system primitives. Reusable candidates and suggested Storybook
cases are tracked in [DESIGN_SYSTEM_FEEDBACK.md](DESIGN_SYSTEM_FEEDBACK.md).
The command palette opens from the hero's Commands/Comandos button or
<kbd>Cmd</kbd>/<kbd>Ctrl</kbd>+<kbd>K</kbd>; its links and labels use the active
locale. Browser print and navigation shortcuts keep their native behavior.

Then, to update the contents of the page, modify the next files:

- `i18n/es.json`: for contents in Spanish
- `i18n/en.json`: for contents in English

🚀 Netlify
---

This project uses Netlify to manage continuous integration in the content updates of the website. Review the `netlify.toml` file to know the repository setup.

📦 Resources
---

- Brand icons - https://svgl.app
- Flat icons - https://lucide.dev/icons/
- Toggles - https://toggles.dev using classic toggle.