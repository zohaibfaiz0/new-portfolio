# Tasks: Personal Developer Portfolio

## Phase 1: Setup

- [x] Initialize Next.js 16.1.4 project with TypeScript
- [x] Install all dependencies: next@^16.1.4, react@^19.0.0, react-dom@^19.0.0, next-sanity@^9.8.0, @sanity/image-url@^1.1.0, sanity@^3.68.0, next-themes@^0.4.4, framer-motion@^11.15.0, react-markdown@^9.0.1, clsx@^2.1.1, tailwind-merge@^2.6.0
- [x] Configure Tailwind CSS 3.4 and install @tailwindcss/typography plugin
- [ ] Create Sanity project and obtain project credentials
- [x] Set up environment variables in .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, NEXT_PUBLIC_SANITY_API_VERSION
- [x] Create lib/utils.ts with cn() function using clsx and tailwind-merge
- [x] Create types/sanity.ts with Profile, SocialLink, Skill, Project, and SanityImage interfaces
- [x] Set up Sanity client in lib/sanity/client.ts
- [x] Create GROQ queries in lib/sanity/queries.ts for profile, projects, featured projects, and single project
- [x] Create image helper in lib/sanity/image.ts
- [x] Create Sanity schemas in sanity/schemas/profile.ts and sanity/schemas/project.ts
- [x] Configure sanity.config.ts
- [x] Verify tsconfig.json has strict: true, noImplicitAny: true, strictNullChecks: true
- [x] Add eslint rule to disallow 'any' type

## Phase 2: Layout

- [x] Create globals.css with Tailwind imports and CSS variables
- [x] Create theme-provider.tsx component
- [x] Create root layout.tsx with fonts, providers, and HTML structure
- [x] Create header.tsx component with navigation
- [x] Create footer.tsx component with social links
- [x] Create mobile-nav.tsx as client component with sheet/drawer
- [x] Create theme-toggle.tsx as client component

## Phase 3: UI Components

- [x] Create container.tsx component
- [x] Create section.tsx component
- [x] Create button.tsx component with variants (primary|secondary|ghost) and sizes (sm|md|lg)
- [x] Create badge.tsx component with variants (default|outline)
- [x] Create card.tsx component
- [x] Create skeleton.tsx component
- [x] Create icons.tsx with common icons as components

## Phase 4: Homepage

- [x] Create hero.tsx section component accepting profile data as prop
- [x] Create featured-projects.tsx section component accepting projects array as prop
- [x] Create skills.tsx section component accepting skills array as prop
- [x] Create contact-cta.tsx section component accepting email as prop
- [x] Create app/page.tsx composing homepage sections and fetching profile and featured projects
- [x] Create app/loading.tsx with skeleton layout for homepage
- [x] Create app/error.tsx as error boundary
- [x] Ensure all Image components have descriptive alt text (not empty, not "image")

## Phase 5: Projects

- [x] Create project-card.tsx component accepting project data as prop
- [x] Create project-grid.tsx component accepting projects array as prop
- [x] Create project-filter.tsx as client component accepting tags array and current filter as props
- [x] Create project-detail.tsx component accepting project data as prop
- [x] Create app/projects/page.tsx fetching all projects and rendering ProjectFilter and ProjectGrid
- [x] Create app/projects/loading.tsx with skeleton layout
- [x] Create app/projects/[slug]/page.tsx with generateStaticParams and fetching single project by slug
- [x] Create app/projects/[slug]/loading.tsx with skeleton layout
- [x] Create src/app/projects/error.tsx with error boundary
- [x] Create src/app/projects/[slug]/error.tsx with error boundary
- [x] Ensure project thumbnail images have alt text from Sanity or fallback to project title

## Phase 6: About

- [x] Create bio.tsx component
- [x] Create skills-list.tsx component
- [x] Create social-links.tsx component
- [x] Create app/about/page.tsx fetching profile and composing about sections
- [x] Create app/about/loading.tsx with skeleton layout
- [x] Create src/app/about/error.tsx with error boundary
- [x] Ensure avatar image has alt text using profile name

## Phase 7: Final

- [x] Create app/not-found.tsx as 404 page
- [x] Add metadata to all pages (title, description, og tags)
- [x] Configure next.config.ts with images.remotePatterns for Sanity domains
- [x] Create src/app/studio/[[...tool]]/page.tsx with 'use client' directive and NextStudio component
- [x] Run build and fix any errors
- [ ] Test all pages locally
- [ ] Verify Sanity Studio works correctly
- [ ] Prepare for deployment to Vercel

## Phase 8: Constitution Compliance Check

- [x] Run npm run build and confirm zero TypeScript errors
- [x] Verify no 'any' types exist in codebase (search for ': any')
- [x] Verify all pages have loading.tsx files
- [x] Verify all pages with data fetching have error.tsx files
- [x] Verify all Image components have meaningful alt text
- [ ] Verify all interactive elements are keyboard accessible
- [ ] Test theme toggle persistence across page refresh
- [ ] Test on mobile viewport