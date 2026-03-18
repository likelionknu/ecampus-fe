# 폴더 아키텍처

이 문서는 현재 eCampus FE의 `src` 폴더 구조와 역할 분리를 정의합니다.
새 도메인 추가, 라우트 변경, 공통 컴포넌트 이동 시 이 문서를 함께 업데이트합니다.

## 1) 현재 디렉터리 구조 (요약)

```txt
src/
├─ App.tsx
├─ main.tsx
├─ index.css
├─ admin/
│  ├─ AdminRoutes.tsx
│  └─ domains/
│     ├─ management/
│     ├─ question/
│     └─ session/
├─ auth/
│  ├─ api/
│  ├─ assets/
│  ├─ components/
│  ├─ pages/
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
│  └─ utils/
└─ shared/
   ├─ apis/
   ├─ assets/
   ├─ components/
   │  ├─ DefaultBar/
   │  ├─ comment/
   │  ├─ skeleton/
   │  └─ table/
   ├─ constants/
   ├─ layouts/
   ├─ pages/
   ├─ types/
   └─ utils/
```

## 2) 라우팅 구조

라우팅 책임은 다음 3개 파일에 분리합니다.

- `src/App.tsx`: 전역 라우트와 최상위 분기 (`/user`, `/admin`, `*`)
- `src/user/UserRoutes.tsx`: 사용자 영역 상세 라우트
- `src/admin/AdminRoutes.tsx`: 관리자 영역 상세 라우트

### 전역 라우트 (`App.tsx`)

- `/` -> `GoogleCallback`
- `/auth/login`, `/auth/login-error`
- `/preparing`, `/maintenance`, `/privacy-policy`, `/screen-size-error`
- `/user/*` -> `BaseLayout` + `UserRoutes`
- `/admin/*` -> `BaseLayout` + `AdminRoutes`
- `*` -> `ErrorPage`

### 사용자 라우트 (`UserRoutes.tsx`)

- 기본: `dashboard`, `sessions`, `notification`, `questions`
- 상세: `questions/detail`
- 세션 하위: `files`, `files/detail`, `assignments`, `assignments/detail`, `questions`, `questions/detail`, `questions/new`, `groups`

### 관리자 라우트 (`AdminRoutes.tsx`)

- 관리 탭: `sessions`, `groups`, `question`, `question/manage`, `notices`, `notices/upload`, `notices/view`, `notices/modify`
- 세션 탭 하위: `data/management`, `task/management`, `question`, `notion`, `dashboard`, `assignments`, `assignments/upload`, `files/upload`, `files/view`, `files/modify`

## 3) 폴더별 책임

### `src/shared`

- user/admin 공통 UI, 상수, 유틸, 레이아웃을 둡니다.
- 도메인에 강하게 결합된 API/상태/비즈니스 로직은 넣지 않습니다.

### `src/user`

- 사용자 기능을 도메인 단위(`domains/<domain>`)로 분리합니다.
- 페이지는 `pages`, 재사용 조각은 `components`, 타입은 `types`에 둡니다.

### `src/admin`

- 관리자 기능을 도메인 단위(`domains/<domain>`)로 분리합니다.
- 화면/테이블/모달/마크다운 편집기 등은 해당 도메인 하위에서 관리합니다.

### `src/auth`

- 로그인/콜백/권한검증/세션 저장 관련 코드를 관리합니다.
- 인증 관련 타입과 유틸은 `auth/types`, `auth/utils`에 둡니다.

## 4) 새 파일 추가 가이드

### 새 페이지를 추가할 때

1. 도메인 위치에 페이지 파일 생성  
   예: `src/user/domains/<domain>/pages/FooPage.tsx`
2. 해당 영역 라우트 파일(`UserRoutes.tsx` 또는 `AdminRoutes.tsx`)에 경로 등록
3. 공통 레이아웃/탭 이동이 필요하면 `shared/layouts`, `shared/constants/tabItems.ts` 동기화

### 공통 컴포넌트를 추가할 때

1. `src/shared/components`에 생성
2. 특정 도메인에만 필요한지 먼저 확인
3. 이미 있는 컴포넌트와 중복되지 않는지 확인

## 5) 유지보수 원칙

- 라우트 문자열은 하드코딩을 최소화하고, 탭/네비게이션 상수와 항상 함께 점검합니다.
- 경로 변경 시 반드시 다음을 함께 확인합니다.
  - `App.tsx`, `UserRoutes.tsx`, `AdminRoutes.tsx`
  - `shared/constants/tabItems.ts`
  - `shared/components/DefaultBar/*` 내 navigate/to 경로
