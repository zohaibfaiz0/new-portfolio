---
id: 1
title: Create Portfolio Constitution
stage: constitution
date: 2026-01-25
surface: agent
model: claude-opus-4-5-20251101
feature: none
branch: master
user: AA
command: sp.constitution
labels: [constitution, portfolio, setup]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
tests:
 - none
---

## Prompt

Project: Personal developer portfolio with Sanity CMS

Core principles:
- Zero TypeScript errors (strict mode,no type mismatches, no `any`, no @ts-ignore)
- First-try deployment (code must build and deploy without fixes)
- Next.js 16.1.4 patterns only (async params, App Router, Server Components default)
- Complete code always (no TODOs, no placeholders, no "add later")
- Self-documenting (clear naming, typed interfaces, no magic values)

Key standards:
- All function parameters and returns explicitly typed
- All components have Props interface defined above component
- All async data fetching wrapped in try-catch with typed errors
- All images use next/image with proper alt text
- All links use next/link
- Null safety required (optional chaining, nullish coalescing)
- Tailwind classes ordered: layout → sizing → spacing → typography → colors → states
- Imports ordered: 'use client' → type imports → library → local

Constraints:
- TypeScript strict mode enabled (no exceptions)
- No `any` type anywhere
- No console.log (only console.error for actual errors)
- No pages/ directory (App Router only)
- No getStaticProps/getServerSideProps (Next.js 16.1.4 patterns)
- No inline styles (Tailwind only)
- No unhandled promises

File requirements:
- next.config.ts with Sanity image domains configured
- lib/utils.ts with cn() helper using clsx + tailwind-merge
- types/ directory with all Sanity schema types
- loading.tsx for every route with data fetching
- error.tsx for every route with data fetching

Success criteria:
- `npm run build` passes with zero errors and zero warnings
- All pages render correctly in development
- Vercel deployment succeeds on first push
- Lighthouse accessibility score 90+
- All content editable via Sanity Studio without code changes

## Response snapshot

Created a comprehensive constitution file for the personal developer portfolio project that incorporates all the specified principles and requirements. The constitution includes five core principles (Zero TypeScript Errors, First-Try Deployment, Next.js 16.1.4 Patterns Only, Complete Code Always, Self-Documenting Code), key standards, constraints, file requirements, and success criteria. The file is structured with clear headings and detailed descriptions of each requirement to ensure all development follows the specified guidelines.

## Outcome

- ✅ Impact: Created foundational constitution document that will guide all future development
- 🧪 Tests: none
- 📁 Files: Updated .specify/memory/constitution.md with comprehensive project guidelines
- 🔁 Next prompts: Project setup can now proceed with clear development guidelines
- 🧠 Reflection: The constitution captures all specified requirements and provides clear guidance for implementation

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Begin implementing the portfolio according to the constitution