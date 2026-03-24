# Tech Stack

Last updated: 2026-03-25

## Core Runtime

- Node.js environment + npm ecosystem
- React `19.2.0`
- TypeScript `5.9.x`
- Vite `7.3.x` (bundler and dev server)

## Frontend

- Routing: `react-router-dom@7.13.1`
- State management: `zustand@5.0.12` (persist + localStorage)
- HTTP client: `axios@1.13.5`
- Responsive utilities: `react-responsive@10.0.1`

## UI and Styling

- Tailwind CSS `4.2.x`
- `@tailwindcss/typography`
- SVG to React component: `vite-plugin-svgr`
- Animation: `@lottiefiles/dotlottie-react`

## Content Utilities

- Markdown rendering: `react-markdown`
- GFM support: `remark-gfm`
- Code highlighting: `rehype-highlight`, `highlight.js`
- Input optimization: `lodash.debounce`

## Developer Tooling

- ESLint `9.x`
- `typescript-eslint@8.x`
- `eslint-plugin-react-hooks`
- `eslint-plugin-react-refresh`
- Prettier `3.x`
- `prettier-plugin-tailwindcss`

## Scripts

- Dev server: `npm run dev`
- Production build: `npm run build`
- Lint: `npm run lint`
- Format: `npm run format`
- Format check: `npm run format:check`

## Project Notes

- Path aliases: `@`, `@auth`, `@admin`, `@user`, `@shared`
- No dedicated test script is currently defined in `package.json`
