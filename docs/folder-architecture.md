# Folder Architecture

현재 문서는 `src` 실제 구조 및 라우팅 코드(`App.tsx`, `user/UserRoutes.tsx`, `admin/AdminRoutes.tsx`)를 기준으로 작성되었습니다.

Last updated: 2026-04-17

## 1) 최상위 구조

```txt
src/
  App.tsx
  main.tsx
  admin/
    AdminRoutes.tsx
    domains/
      management/
      question/
      session/
      dashboard/   # 현재 비어 있는 도메인 폴더
    shared/
  auth/
    api/
    assets/
    components/
    pages/
    stores/
    types/
    utils/
  user/
    UserRoutes.tsx
    assets/
    domains/
      dashboard/
      notification/
      question/
      session/
    shared/
      apis/
      components/
      pages/
      types/
    utils/
  shared/
    apis/
    assets/
    components/
    constants/
    hooks/
    layouts/
    mocks/
    pages/
    stores/
    types/
    utils/
```

## 2) 라우팅 소유 파일

- 전역 라우트: `src/App.tsx`
- 사용자 라우트: `src/user/UserRoutes.tsx`
- 관리자 라우트: `src/admin/AdminRoutes.tsx`

## 3) 전역 라우팅 (`src/App.tsx`)

- `/` -> `GoogleCallback`
- `/auth/login`, `/auth/login-error`
- `/preparing`, `/maintenance`, `/privacy-policy`, `/screen-size-error`
- `/user/*` -> `RequireAccess` + `BaseLayout` + `UserRoutes`
- `/admin/*` -> `RequireAccess(requiredRole="ADMIN")` + `BaseLayout` + `AdminRoutes`
- `*` -> `ErrorPage`

## 4) 사용자 라우팅 (`src/user/UserRoutes.tsx`)

- 기본 탭: `dashboard`, `sessions`, `notification`, `questions`, `list`
- 질문 상세: `questions/:questionId/:sessionId`
- 세션 탭(`sessions/:sid`):
- `files`, `files/:fileId`
- `assignments`, `assignments/:assignmentId`
- `groups`
- `questions`, `questions/new`

## 5) 관리자 라우팅 (`src/admin/AdminRoutes.tsx`)

- 관리 탭:
- `sessions`, `groups`, `questions`
- `questions/detail`, `questions/manage`
- `notices`, `notices/upload`, `notices/:nid`, `notices/:nid/modify`
- 세션 탭(`sessions/:sid`):
- `dashboard`
- `assignments`, `assignments/upload`, `assignments/:aid`
- `files`, `files/upload`, `files/:fid`, `files/:fid/modify`

## 6) 인증/세션 흐름

- 인증 저장소 키: `ecampus.auth.session` (`localStorage`)
- 세션 상태 저장: `src/auth/stores/authStore.ts` (`zustand` + `persist`)
- 접근 제어: `src/auth/components/RequireAuth.tsx` (`RequireAccess`)
- API 클라이언트: `src/shared/apis/index.ts`
- 동작 요약:
- 요청 인터셉터에서 access token 자동 주입
- 응답 `401` 또는 토큰 만료 상황에서 `/v1/auth/reissue`로 재발급 시도
- 재발급 실패 시 세션 제거 후 `/auth/login`으로 이동

## 7) 유지보수 체크리스트

라우팅 경로, 접근 정책, 인증 흐름을 수정할 때 아래 파일을 함께 업데이트합니다.

- `src/App.tsx`
- `src/user/UserRoutes.tsx`
- `src/admin/AdminRoutes.tsx`
- `src/auth/components/RequireAuth.tsx`
- `src/auth/stores/authStore.ts`
- `src/shared/apis/index.ts`
