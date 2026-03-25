# Code Convention

Last updated: 2026-03-25

## 1) 기본 규칙

- 문자열은 기본적으로 큰따옴표(`"`)를 사용합니다.
- 문장 끝에는 세미콜론(`;`)을 사용합니다.
- 불리언 변수는 `is` / `has` / `can` 접두어를 권장합니다.
- import는 성격별로 그룹화합니다.

## 2) Import 순서

1. 외부 라이브러리 (`react`, `axios` 등)
2. 전역 상수/설정
3. 도메인 API
4. 도메인 hooks/store
5. 도메인 컴포넌트
6. shared 컴포넌트
7. 유틸 함수
8. 스타일/에셋

## 3) 네이밍

| 용도 | 규칙 | 예시 |
| --- | --- | --- |
| 변수/함수 | Camel Case | `userName`, `fetchUserData` |
| 컴포넌트/타입 | Pascal Case | `LoginForm`, `UserProfile` |
| CSS 클래스 | Kebab Case(BEM 포함) | `login-form`, `button--primary` |
| 상수 | UPPER_SNAKE_CASE | `API_KEY`, `MAX_COUNT` |

### 변수/함수 세부 규칙

- 이벤트 핸들러는 `handle + 동사` 형태를 사용합니다. 예: `handleClick`
- boolean은 `isVisible`, `hasPermission`, `canSubmit`처럼 의미가 드러나게 작성합니다.

## 4) 파일/폴더 네이밍

### 폴더

- 폴더명은 소문자 사용: `components`, `hooks`, `utils`

### 파일

| 유형 | 규칙 | 예시 |
| --- | --- | --- |
| 컴포넌트 | Pascal Case | `LoginForm.tsx` |
| 커스텀 훅 | `use` + Pascal Case | `useAuth.ts` |
| 타입 | Pascal Case | `AuthSession.ts` |
| 유틸 함수 | Camel Case | `formatDate.ts` |

## 5) 스타일링 규칙

- CSS 클래스는 Kebab Case를 권장합니다.
- BEM을 사용할 경우 `block__element--modifier` 규칙을 따릅니다.

```css
.login-form {}
.user-card__header {}
.button--primary {}
```
