<!--
Sync Impact Report:
- Version change: N/A → 1.0.0 (initial creation)
- Modified principles: N/A (new file)
- Added sections: All sections (new file)
- Removed sections: N/A
- Templates requiring updates: N/A
- Follow-up TODOs: None
-->
# Personal Developer Portfolio Constitution

## Core Principles

### Zero TypeScript Errors
All code must compile without TypeScript errors in strict mode. No type mismatches, no `any` type, no `@ts-ignore` directives allowed. Type safety is non-negotiable for maintainability and reliability.

### First-Try Deployment
Code must build and deploy successfully without requiring post-deployment fixes. All builds must pass locally and in CI/CD pipelines before merging. Deployment readiness is a core requirement for all features.

### Next.js 16.1.4 Patterns Only
Use only Next.js 16.1.4 patterns including async parameters, App Router, and Server Components as default. Leverage modern Next.js patterns while maintaining compatibility with the specified version.

### Complete Code Always
No incomplete implementations, TODOs, placeholders, or "add later" comments. All features must be fully implemented, tested, and documented before merging. Code completeness is essential for maintainability.

### Self-Documenting Code
Code must be self-documenting through clear naming conventions, typed interfaces, and no magic values. All functions and components must have explicit type definitions to ensure clarity and maintainability.

## Key Standards

### Explicit Typing Requirements
All function parameters and return types must be explicitly typed. No implicit typing for public interfaces. All components must have Props interfaces defined above the component declaration.

### Safe Data Fetching
All asynchronous data fetching must be wrapped in try-catch blocks with properly typed error handling. Error boundaries must be implemented for all data-dependent components to prevent application crashes.

### Image and Link Best Practices
All images must use next/image with proper alt text for accessibility. All navigation must use next/link for optimal performance and client-side routing. Accessibility is a core requirement.

### Null Safety and Styling Standards
Null safety is required using optional chaining and nullish coalescing operators. All styling must use Tailwind CSS with classes ordered as: layout → sizing → spacing → typography → colors → states.

### Import Organization
Imports must be organized in the following order: 'use client' directives → type imports → library imports → local imports. This ensures consistent code structure and clear dependency relationships.

## Constraints

### Strict TypeScript Enforcement
TypeScript strict mode is enabled with no exceptions. The `any` type is prohibited anywhere in the codebase. Console.log statements are not allowed (only console.error for actual errors).

### Next.js Modern Patterns
No pages/ directory (App Router only). No getStaticProps/getServerSideProps (Next.js 16.1.4 patterns only). No inline styles (Tailwind only). No unhandled promises in asynchronous operations.

## File Requirements

### Configuration Files
next.config.ts must include Sanity image domains configuration. lib/utils.ts must include cn() helper using clsx + tailwind-merge for class name management.

### Type Definitions and Error Handling
types/ directory must contain all Sanity schema types. loading.tsx must be implemented for every route with data fetching. error.tsx must be implemented for every route with data fetching.

## Success Criteria

### Build and Deployment Success
npm run build must pass with zero errors and zero warnings. All pages must render correctly in development mode. Vercel deployment must succeed on first push without requiring fixes.

### Performance and Content Management
Lighthouse accessibility score must be 90+. All content must be editable via Sanity Studio without requiring code changes. Performance and accessibility are non-negotiable quality standards.

## Governance

This constitution governs all development practices for the personal developer portfolio. All code reviews must verify compliance with these principles. Any deviation from these standards requires explicit justification and approval. The constitution must be referenced in all technical decisions and architectural choices.

Version: 1.0.0 | Ratified: 2026-01-25 | Last Amended: 2026-01-25