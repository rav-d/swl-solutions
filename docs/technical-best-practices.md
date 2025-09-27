## Technical Improvements & Best Practices

### Architecture & Code Quality
- Feature-first structure: keep modules self-contained (`features/`, `components/`, `lib/`, `types/`).
- Design system: primitives (Button, Card, Input), layout components, and tokens.
- Error boundaries and suspense for async sections; boundary per feature.
- State management: Zustand/Redux Toolkit for app state; React Query for server cache.
- Custom hooks to encapsulate data fetching, forms, and UI behaviors.

### Performance
- Route and component-level code splitting with `React.lazy` and dynamic imports.
- Image optimization (responsive `srcset`, AVIF/WebP), preloading key assets, caching.
- Memoization with `useMemo`/`useCallback`/`React.memo` for expensive trees.
- Avoid large background videos on mobile; use poster and media queries.

### Accessibility
- Landmarks, heading hierarchy, focus management, and ARIA roles.
- Color contrast checks and flexible motion preferences (`prefers-reduced-motion`).

### Testing
- Unit: Jest + React Testing Library.
- E2E: Playwright/Cypress for key funnels (contact submit, booking, case study view).
- Visual regression: Percy/Chromatic for critical pages.

### Tooling & DX
- ESLint + Prettier, TypeScript strictness where feasible.
- Git hooks with Husky + lint-staged; conventional commits.
- CI/CD with GitHub Actions: build, test, lint, preview deploy.

### Backend & Data
- API layer: Next.js API routes or Express; schema validation with Zod.
- AuthN/AuthZ: NextAuth/Auth0; session storage, role-based access for client portal.
- Database: Postgres + Prisma; storage via S3/Cloudinary.
- Emails: Resend/SendGrid; queue long-running tasks.


