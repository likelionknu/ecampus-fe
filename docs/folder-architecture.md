# 폴더 아키텍처

이 문서는 `src` 디렉터리의 현재 구조와 라우팅 책임을 정의합니다.
구조가 바뀌면 이 문서를 함께 업데이트합니다.

최종 업데이트: 2026-03-25

## 1) 현재 디렉터리 구조 (요약)

```txt
src/
├─ App.tsx
├─ main.tsx
├─ index.css
├─ App.css
├─ admin/
│  ├─ AdminRoutes.tsx
│  ├─ domains/
│  │  ├─ management/
│  │  ├─ session/
│  │  ├─ question/
│  │  └─ dashboard/
│  └─ shared/
├─ auth/
│  ├─ api/
│  ├─ assets/
│  ├─ components/
│  ├─ pages/
│  ├─ stores/
│  ├─ types/
│  └─ utils/
├─ user/
│  ├─ UserRoutes.tsx
│  ├─ domains/
│  │  ├─ dashboard/
│  │  ├─ notification/
│  │  ├─ question/
│  │  └─ session/
│  ├─ shared/
│  ├─ assets/
│  └─ utils/
└─ shared/
   ├─ apis/
   ├─ assets/
   ├─ components/
   │  ├─ DefaultBar/
   │  ├─ modal/
   │  ├─ comment/
   │  ├─ skeleton/
   │  └─ table/
   ├─ constants/
   ├─ hooks/
   ├─ layouts/
   ├─ mocks/
   ├─ pages/
   ├─ types/
   └─ utils/
```

## 2) 라우팅 구조

라우팅 책임은 다음 3개 파일로 분리합니다.

- `src/App.tsx`: 전역 라우팅과 레이아웃 진입점
- `src/user/UserRoutes.tsx`: 사용자 영역 상세 라우팅
- `src/admin/AdminRoutes.tsx`: 관리자 영역 상세 라우팅

### 전역 라우트 (`App.tsx`)

- `/` -> `GoogleCallback`
- `/auth/login`, `/auth/login-error`
- `/preparing`, `/maintenance`, `/privacy-policy`, `/screen-size-error`
- `/user/*` -> `BaseLayout` + `UserRoutes`
- `/admin/*` -> `RequireAuth` + `BaseLayout` + `AdminRoutes`
- `*` -> `ErrorPage`

권한 가드 규칙:

- `RequireAuth`는 `auth/stores/authStore.ts`의 세션을 기준으로 동작
- `ADMIN`이 아니면 `/user/dashboard`로 리다이렉트
- hydration 전에는 렌더를 보류함

### 사용자 라우트 (`UserRoutes.tsx`)

- 기본: `dashboard`, `sessions`, `notification`, `questions`, `list`
- 질문 상세: `questions/:questionId/:sessionId`
- 세션 하위: `sessions/:sid/files`, `files/:fileId`, `assignments`, `assignments/:assignmentId`, `groups`, `questions`, `questions/new`

### 관리자 라우트 (`AdminRoutes.tsx`)

- 관리 탭: `sessions`, `groups`, `questions`, `questions/detail`, `questions/manage`, `notices`, `notices/upload`, `notices/:nid`, `notices/:nid/modify`
- 세션 관리 탭: `sessions/data/management`, `sessions/task/management`, `sessions/notion`, `sessions/dashboard/:sessionId`
- 세션 상세 탭: `sessions/:sid/assignments`, `assignments/upload`, `files/upload`, `files/:fid`, `files/:fid/modify`

## 3) 폴더별 책임

### `src/shared`

- user/admin 공통 UI, 레이아웃, 공통 타입, 공통 유틸 제공
- 특정 도메인 비즈니스 로직은 두지 않음

### `src/user`

- 사용자 도메인 기능을 `domains/<domain>` 단위로 관리
- 페이지는 `pages`, 도메인 조합 컴포넌트는 `components`, API는 `apis`에 배치

### `src/admin`

- 관리자 도메인 기능을 `domains/<domain>` 단위로 관리
- 관리 화면 전용 컴포넌트와 API는 해당 도메인 내부에서 관리

### `src/auth`

- 로그인, 콜백, 인증 상태, 권한 가드 책임
- 세션 상태 저장소: `auth/stores/authStore.ts`
- 권한 라우트 가드: `auth/components/RequireAuth.tsx`

## 4) 파일 추가 가이드

### 새 페이지를 추가할 때

1. 도메인에 페이지 파일 생성
2. 해당 영역 라우트 파일(`UserRoutes.tsx` 또는 `AdminRoutes.tsx`)에 경로 등록
3. 탭 네비게이션 또는 사이드바 경로가 있으면 함께 반영

### 공통 컴포넌트를 추가할 때

1. `src/shared/components`에 생성
2. 도메인 전용인지 공통인지 먼저 판단
3. 기존 컴포넌트와 역할 중복 여부 확인

## 5) 유지보수 체크리스트

- 경로 변경 시 다음 파일을 함께 확인
- `src/App.tsx`
- `src/user/UserRoutes.tsx`
- `src/admin/AdminRoutes.tsx`
- `src/auth/components/RequireAuth.tsx`
- `src/shared/components/DefaultBar/*`

- `authStore` 위치/이름 변경 시 import 경로 전체 점검
- 라우트 정책이 바뀌면 본 문서의 라우팅 섹션 즉시 갱신
