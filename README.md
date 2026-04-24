# ecampus-fe

멋쟁이사자처럼 e-campus 프론트엔드 프로젝트입니다.  
React + TypeScript + Vite 기반으로 사용자/관리자 화면과 세션, 과제, 자료, 공지 기능을 제공합니다.

## Tech Summary

- React 19 + TypeScript 5 + Vite 7
- React Router 7
- Tailwind CSS 4
- Zustand (persist)
- Axios (토큰 자동 주입 + 재발급 인터셉터)

상세 스택은 [docs/tech-stack.md](./docs/tech-stack.md)를 참고하세요.

## Requirements

- Node.js 20 이상 권장
- npm 10 이상 권장

## Getting Started

1. 의존성 설치

```bash
npm install
```

2. 환경 변수 파일 생성 (`.env`)

```env
VITE_BASE_API_URL=<API_BASE_URL>
VITE_GOOGLE_CLIENT_ID=<GOOGLE_CLIENT_ID>
VITE_GOOGLE_REDIRECT_URI=<GOOGLE_REDIRECT_URI>
```

3. 개발 서버 실행

```bash
npm run dev
```

기본 주소: `http://localhost:5173`

## Scripts

- `npm run dev`: 개발 서버 실행
- `npm run build`: TypeScript 검사 + 프로덕션 빌드
- `npm run preview`: 빌드 결과 미리보기
- `npm run lint`: ESLint 검사
- `npm run format`: Prettier 자동 정렬
- `npm run format:check`: Prettier 정렬 검사

참고: `npm test` 스크립트는 현재 정의되어 있지 않습니다.

## Project Structure

```txt
src/
  admin/   # 관리자 도메인
  auth/    # OAuth/인증 처리
  shared/  # 공통 컴포넌트/레이아웃/API/유틸
  user/    # 사용자 도메인
docs/
  tech-stack.md
  folder-architecture.md
  code-convention.md
```

상세 폴더 구조는 [docs/folder-architecture.md](./docs/folder-architecture.md)를 참고하세요.

## Routing Overview

- `/`: Google OAuth 콜백 처리
- `/auth/*`: 로그인/로그인 오류
- `/user/*`: 사용자 영역 (`RequireAccess`)
- `/admin/*`: 관리자 영역 (`RequireAccess requiredRole="ADMIN"`)

## Auth / Session Notes

- 세션 저장 키: `ecampus.auth.session` (`localStorage`)
- 세션 상태: `src/auth/stores/authStore.ts`
- API 인터셉터: `src/shared/apis/index.ts`
- `401` 발생 시 refresh token 재발급 후 원 요청 재시도
- 재발급 실패 시 세션 제거 후 `/auth/login` 이동

## Conventions

코딩 규칙은 [docs/code-convention.md](./docs/code-convention.md)에 정리되어 있습니다.
