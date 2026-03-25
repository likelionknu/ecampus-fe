# Folder Architecture

This document reflects the current `src` structure and routing ownership.

Last updated: 2026-03-25

## 1) High-level Structure

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
    shared/
  auth/
    api/
    components/
    pages/
    stores/
    types/
    utils/
  user/
    UserRoutes.tsx
    domains/
      dashboard/
      notification/
      question/
      session/
    shared/
  shared/
    apis/
    assets/
    components/
    constants/
    hooks/
    layouts/
    pages/
    types/
    utils/
```

## 2) Routing Ownership

- `src/App.tsx`: global routes and entry points
- `src/user/UserRoutes.tsx`: user area routes
- `src/admin/AdminRoutes.tsx`: admin area routes

### Global (`src/App.tsx`)

- `/` -> `GoogleCallback`
- `/auth/login`, `/auth/login-error`
- `/preparing`, `/maintenance`, `/privacy-policy`, `/screen-size-error`
- `/user/*` -> `RequireAccess` + `BaseLayout` + `UserRoutes`
- `/admin/*` -> `RequireAccess(requiredRole="ADMIN")` + `BaseLayout` + `AdminRoutes`
- `*` -> `ErrorPage`

### User (`src/user/UserRoutes.tsx`)

- base: `dashboard`, `sessions`, `notification`, `questions`, `list`
- detail: `questions/:questionId/:sessionId`
- session tab: `sessions/:sid/files`, `files/:fileId`, `assignments`, `assignments/:assignmentId`, `groups`, `questions`, `questions/new`

### Admin (`src/admin/AdminRoutes.tsx`)

- management tab: `sessions`, `groups`, `questions`, `questions/detail`, `questions/manage`, `notices`, `notices/upload`, `notices/:nid`, `notices/:nid/modify`
- session tab: `sessions/:sid/dashboard`, `assignments`, `assignments/upload`, `assignments/:aid`, `files`, `files/upload`, `files/:fid`, `files/:fid/modify`

## 3) Auth Flow Notes

- Auth session is persisted in `localStorage` key: `ecampus.auth.session`
- Store source of truth: `src/auth/stores/authStore.ts`
- Route guard component: `src/auth/components/RequireAuth.tsx` (`RequireAccess`)
- Axios instance: `src/shared/apis/index.ts`
- Token errors (`401`, `C401*`) trigger refresh-token reissue and retry in interceptor
- Reissue fails -> clear session and redirect to `/auth/login`

### Empty Storage Behavior

- There is no `/auth/loading` route in router config.
- Current loading screen component is `LoginLoadingPage`.
- It is rendered inside `GoogleCallback` (route: `/`) while processing OAuth callback.
- If callback params/session are missing, `GoogleCallback` navigates to `/auth/login`.

## 4) Maintenance Checklist

- When route path or policy changes, update these files first:
- `src/App.tsx`
- `src/user/UserRoutes.tsx`
- `src/admin/AdminRoutes.tsx`
- `src/auth/components/RequireAuth.tsx`
- `src/shared/apis/index.ts`
