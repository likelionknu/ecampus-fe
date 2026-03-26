# Tech Stack

Last updated: 2026-03-26

## Core

- Runtime: Node.js + npm
- Language: TypeScript `5.9.x`
- UI: React `19.2.0`
- Build/Dev Server: Vite `7.3.x`

## Routing and State

- Router: `react-router-dom@7.13.1`
- Global auth state: `zustand@5.0.12` + `zustand/middleware(persist)`

## Networking

- HTTP client: `axios@1.13.5`
- Shared client: `src/shared/apis/index.ts`
- Request interceptor: access token 자동 첨부
- Response interceptor: `401` / `C401*` 오류 시 refresh-token 재발급 후 요청 재시도

## UI and Styling

- Tailwind CSS `4.2.x`
- `@tailwindcss/typography`
- SVG 컴포넌트 변환: `vite-plugin-svgr`
- 반응형 유틸: `react-responsive`
- Lottie: `@lottiefiles/dotlottie-react`

## Markdown and Content

- Markdown 렌더링: `react-markdown`
- GFM 지원: `remark-gfm`
- 코드 하이라이팅: `rehype-highlight`, `highlight.js`

## Quality and Formatting

- ESLint `9.x`
- `typescript-eslint@8.x`
- `eslint-plugin-react-hooks`
- `eslint-plugin-react-refresh`
- Prettier `3.x`
- `prettier-plugin-tailwindcss`

## Build Configuration

- Path alias: `@`, `@auth/*`, `@admin/*`, `@user/*`, `@shared/*`
- Vite plugins: `@vitejs/plugin-react`, `vite-plugin-svgr`, `@tailwindcss/vite`

## Environment Variables

- `VITE_BASE_API_URL`
- `VITE_GOOGLE_CLIENT_ID`
- `VITE_GOOGLE_REDIRECT_URI`

## npm Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`
- `npm run format`
- `npm run format:check`

## Notes

- 테스트 스크립트는 현재 `package.json`에 정의되어 있지 않습니다.
