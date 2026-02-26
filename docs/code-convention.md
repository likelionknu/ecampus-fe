# Code Convention

## ✍️ 기본 규칙

- 문자열은 항상 큰 따옴표(`""`)로 감싼다.
- 문장을 마칠 때는 세미콜론(`;`)으로 끝낸다.
- 불린 타입 이름은 `is` / `can` / `has` 접두사로 시작한다.
- Import는 역할별로 그룹화한다.

### Import 그룹 예시
1. 외부 라이브러리 (`react`, `axios` 등)
2. API 로직
3. 컴포넌트
4. 커스텀 훅
5. 유틸 함수
6. 스타일

### 대체안 (도메인 중심)
1. 외부 라이브러리
2. 전역 상수 / 설정
3. 도메인 API
4. 도메인 Hooks / State
5. 도메인 컴포넌트
6. Shared 컴포넌트
7. 유틸 함수
8. 스타일

> ⚠️ 추후 린터/포맷터 설정과 Import 순서 규칙을 정리할 예정입니다.

## 🔤 단어 네이밍 규칙 (축약어 제한)

기본 원칙은 의미를 그대로 전달하는 전체 단어를 사용하며, 축약어는 가능한 피하는 것입니다.
다음 키워드는 허용된 전용어와 그대로 사용할 수 있습니다.

| 허용 | 금지 |
| --- | --- |
| `button`, `input`, `checkbox`, `select`, `modal`, `dialog` | `btn`, `inp`, `chk`, `sel`, `dlg` |

> 예외: 업계 표준 약어 `id`, `api`, `url`, `env`, `ui` 등은 그대로 사용할 수 있습니다.

## 📝 네이밍 케이스 가이드

| 용도 | 케이스 | 예시 |
| --- | --- | --- |
| 변수, 함수 | Camel Case | `loginForm`, `userName`, `fetchUserData` |
| 컴포넌트, 타입/인터페이스 | Pascal Case | `LoginForm`, `UserProfile`, `Button` |
| CSS 클래스 | Kebab Case (BEM 포함) | `login-form`, `user-card__header`, `button--primary` |
| 상수 | Snake Case (대문자) | `API_KEY`, `MAX_COUNT`, `BASE_URL` |

### 변수 & 함수 네이밍
- 일반 변수는 Camel Case: `const userName = "홍길동";`
- 함수도 Camel Case이며 동사로 시작: `const getUserData = () => { /* ... */ };`
- Boolean은 `is` / `has` / `can` 접두사 (Camel/Pascal Case): `const isActive = true;`
- 이벤트 핸들러는 `handle` + Pascal Case: `const handleClick = () => { /* ... */ };`
- 이벤트 객체는 `e`로 통일하고, 필요에 따라 `event`도 허용합니다.

## 📂 파일 & 폴더 네이밍

### 폴더
- 모두 소문자: `components`, `hooks`, `utils`.

### 파일
| 유형 | 네이밍 규칙 | 예시 |
| --- | --- | --- |
| 컴포넌트 | Pascal Case | `LoginForm.tsx`, `Button.tsx` |
| 커스텀 훅 | `use` + Pascal Case | `useAuth.ts`, `useUserData.ts` |
| 타입/인터페이스 | Pascal Case | `UserType.ts`, `ApiResponse.ts` |
| 상수 | Snake Case (대문자) | `API_KEY.ts`, `CONSTANTS.ts` |
| 유틸 함수 | Camel Case | `formatDate.ts`, `validation.ts` |

## 💅 스타일링 컨벤션

### CSS 클래스
- Kebab Case 권장하며 BEM 패턴 고려.

```css
/* 좋은 예 */
.login-form { }
.user-card__header { }
.button--primary { }

/* 피할 것 */
.loginForm { }
.UserCard_Header { }
```
