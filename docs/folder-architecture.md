# 폴더 아키텍처

이 문서는 현재 eCampus FE의 `src` 폴더 구조와 각 영역의 책임을 정의합니다.
신규 파일 추가, 라우팅 변경, 공통 컴포넌트 이동이 발생하면 함께 업데이트합니다.

## 1) 현재 디렉터리 구조

```txt
src/
|-- App.tsx
|-- main.tsx
|-- index.css
|-- App.css
|-- admin/
|   |-- AdminRoutes.tsx
|   |-- domains/
|       |-- dashboard/
|       |   |-- pages/
|       |       |-- AdminDashBoardPage.tsx
|       |-- session/
|           |-- pages/
|               |-- AdminSessionsPage.tsx
|-- auth/
|   |-- pages/
|       |-- LoginPage.tsx
|-- user/
|   |-- UserRoutes.tsx
|   |-- domains/
|       |-- dashboard/
|       |   |-- pages/
|       |       |-- UserDashboardPage.tsx
|       |-- session/
|           |-- pages/
|               |-- UserSeesionPage.tsx
|-- shared/
|   |-- components/
|   |   |-- Header.tsx
|   |   |-- NavBar.tsx
|   |   |-- TabBar.tsx
|   |-- layouts/
|   |   |-- BaseLayout.tsx
|   |-- pages/
|       |-- ErrorPage.tsx
```

## 2) 현재 라우트 구조

`src/App.tsx`, `src/user/UserRoutes.tsx`, `src/admin/AdminRoutes.tsx` 기준 실제 경로입니다.

- `/user` -> `/user/dashboard`로 리다이렉트
- `/user/dashboard` -> `UserDashboardPage`
- `/user/sessions` -> `UserSeesionPage`
- `/admin` -> `/admin/sessions`로 리다이렉트
- `/admin/sessions` -> `AdminSessionsPage`
- `/admin/dashboard` -> `AdminDashBoardPage`
- `*` -> `ErrorPage`

참고:
- `src/auth/pages/LoginPage.tsx`는 현재 라우터(`App.tsx`)에 연결되어 있지 않습니다.

## 3) 최상위 파일 책임

### `src/main.tsx`
- React 앱 렌더링 진입점입니다.
- 전역 CSS(`index.css`)를 로드하고 `App`을 마운트합니다.

### `src/App.tsx`
- 전체 라우팅 루트입니다.
- `/user`, `/admin` 두 영역을 `BaseLayout` 하위 자식 라우트로 분기합니다.
- 그 외 경로는 `ErrorPage`로 처리합니다.

### `src/user/UserRoutes.tsx`
- 사용자 영역의 자식 라우트(`dashboard`, `sessions`)를 정의합니다.

### `src/admin/AdminRoutes.tsx`
- 관리자 영역의 자식 라우트(`sessions`, `dashboard`)를 정의합니다.

## 4) 폴더별 상세 가이드

### `src/shared`
- 사용자/관리자 화면이 공통으로 사용하는 코드만 둡니다.
- 도메인에 종속된 화면 로직은 두지 않습니다.

### `src/shared/layouts`
- 페이지 공통 뼈대를 담당합니다.
- `BaseLayout.tsx`는 `Header`, `NavBar`, `Outlet`을 렌더링합니다.

### `src/shared/pages`
- 공통 fallback 페이지를 둡니다.
- 현재는 `ErrorPage.tsx`가 모든 미매칭 경로를 처리합니다.

### `src/user`
- 일반 사용자 영역의 라우팅과 도메인 기능을 관리합니다.
- 도메인별 페이지는 `src/user/domains/<domain>/pages`에 둡니다.

### `src/admin`
- 관리자 영역의 라우팅과 도메인 기능을 관리합니다.
- 도메인별 페이지는 `src/admin/domains/<domain>/pages`에 둡니다.

### `src/auth`
- 인증 관련 페이지를 관리합니다.
- 현재는 `LoginPage.tsx` 파일만 존재하며, 라우터 연결은 추후 추가 필요합니다.

## 5) 라우팅 구성 원칙

- 최상위 분기(`user`, `admin`, `*`)는 `App.tsx`에서만 처리합니다.
- 각 영역의 상세 경로는 해당 라우트 파일(`UserRoutes`, `AdminRoutes`)이 책임집니다.
- 공통 레이아웃이 필요한 경로만 `BaseLayout` 자식 라우트로 둡니다.

## 6) 파일 추가 체크리스트

- 새 페이지를 만들 때:
1. 적절한 도메인(`user/domains/<domain>/pages` 또는 `admin/domains/<domain>/pages`)에 생성
2. 해당 영역 라우트 파일에 경로 등록
3. 공통 레이아웃 필요 시 `BaseLayout` 자식 라우트로 연결

- 새 공통 컴포넌트를 만들 때:
1. `shared/components`에 생성
2. 도메인 의존 props/로직이 없는지 확인
3. 중복 UI를 대체할 수 있는지 검토
