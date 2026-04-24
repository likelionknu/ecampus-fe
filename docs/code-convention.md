# Code Convention

Last updated: 2026-04-17

## 1) 기본 원칙

- 코드 스타일은 Prettier 설정을 우선합니다.
- 문자열은 큰따옴표(`"`)를 사용합니다.
- 문장 끝에는 세미콜론(`;`)을 사용합니다.
- 후행 쉼표는 가능한 위치에 사용합니다.
- lint/format으로 자동 정리 가능한 사항은 수동 스타일 논쟁보다 자동화 결과를 따릅니다.

## 2) Import 정렬 가이드

다음 순서로 그룹화하는 것을 권장합니다.

1. 외부 라이브러리 (`react`, `react-router-dom`, `axios` 등)
2. 절대 경로 별칭 import (`@/`, `@auth/`, `@admin/`, `@user/`, `@shared/`)
3. 같은 도메인 내부 상대 경로 import (`./`, `../`)
4. 스타일/에셋 import

## 3) 네이밍 규칙

| 용도 | 규칙 | 예시 |
| --- | --- | --- |
| 변수/함수 | camelCase | `userName`, `fetchUserData` |
| 컴포넌트/타입 | PascalCase | `LoginPage`, `AuthSession` |
| 상수 | UPPER_SNAKE_CASE | `AUTH_STORAGE_KEY`, `MAX_COUNT` |
| 이벤트 핸들러 | `handle + 동사` | `handleClick`, `handleSubmit` |
| 불리언 | `is` / `has` / `can` 접두어 | `isLoading`, `hasSession`, `canSubmit` |

## 4) 파일/폴더 네이밍

| 대상 | 규칙 | 예시 |
| --- | --- | --- |
| React 컴포넌트 파일 | PascalCase | `LoginPage.tsx`, `RequireAuth.tsx` |
| 커스텀 훅 파일 | `use` + PascalCase | `useScrollSync.ts` |
| 타입 파일 | PascalCase 또는 도메인 의미 기반 camelCase | `NotificationRow.ts`, `auth.ts` |
| 유틸 파일 | camelCase | `formatDaysAgo.ts` |
| 폴더 | 소문자 중심(도메인 단위) | `components`, `pages`, `utils` |

## 5) React/TypeScript 작성 규칙

- 컴포넌트 props는 `type` 또는 `interface`로 명시합니다.
- API 응답/요청 타입은 도메인 `types` 폴더에 분리합니다.
- `any` 사용은 지양하고, 불가피하면 범위를 최소화합니다.
- 라우트 컴포넌트는 `lazy` + `Suspense` 패턴을 기본으로 유지합니다.

## 6) 스타일링 규칙

- Tailwind CSS 유틸리티 클래스를 우선 사용합니다.
- 재사용 UI는 `src/shared/components` 또는 도메인 `components`로 추출합니다.
- 클래스명 직접 작성 시 kebab-case를 기본으로 하고, 필요 시 BEM(`block__element--modifier`)을 사용합니다.
