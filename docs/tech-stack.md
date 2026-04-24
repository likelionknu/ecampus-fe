# Tech Stack

Last updated: 2026-04-17

## 1) Core

- Runtime/Package Manager: Node.js + npm
- Language: TypeScript `~5.9.3`
- UI Library: React `^19.2.0`, React DOM `^19.2.0`
- Build Tool: Vite `^7.3.1`

## 2) Routing/State

- Router: `react-router-dom@^7.13.1`
- Global Auth State: `zustand@^5.0.12` + `zustand/middleware(persist)`

## 3) Networking

- HTTP Client: `axios@^1.13.5`
- Shared Client Entry: `src/shared/apis/index.ts`
- 주요 동작:
- 요청 시 access token 자동 주입
- `401` 응답 시 refresh token 기반 재발급 후 요청 재시도
- 재발급 실패 시 세션 제거 및 로그인 페이지 이동

## 4) UI/Styling

- Tailwind CSS `^4.2.1`
- Tailwind Vite Plugin: `@tailwindcss/vite@^4.2.1`
- Tailwind Typography: `@tailwindcss/typography@^0.5.19`
- SVG to React Component: `vite-plugin-svgr@^4.5.0`
- 반응형 처리: `react-responsive@^10.0.1`
- 애니메이션: `@lottiefiles/dotlottie-react@^0.18.3`

## 5) Markdown/콘텐츠 렌더링

- Markdown Renderer: `react-markdown@^10.1.0`
- GitHub Flavored Markdown: `remark-gfm@^4.0.1`
- 코드 하이라이트: `rehype-highlight@^7.0.2`, `highlight.js@^11.11.1`

## 6) 품질 도구

- ESLint `^9.39.1`
- TypeScript ESLint `^8.48.0`
- `eslint-plugin-react-hooks@^7.0.1`
- `eslint-plugin-react-refresh@^0.4.24`
- Prettier `^3.8.1`
- `prettier-plugin-tailwindcss@^0.7.2`

## 7) Build/Path Alias

- Vite Plugin: `@vitejs/plugin-react@^5.1.1`
- 별칭(alias):
- `@` -> `src`
- `@auth` -> `src/auth`
- `@admin` -> `src/admin`
- `@user` -> `src/user`
- `@shared` -> `src/shared`

## 8) Environment Variables

- `VITE_BASE_API_URL`
- `VITE_GOOGLE_CLIENT_ID`
- `VITE_GOOGLE_REDIRECT_URI`

## 9) npm Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`
- `npm run format`
- `npm run format:check`

## 10) 비고

- `npm test` 스크립트는 현재 정의되어 있지 않습니다.
