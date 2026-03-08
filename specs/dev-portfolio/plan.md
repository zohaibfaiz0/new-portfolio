# Implementation Plan: Personal Developer Portfolio

## Stack
- Next.js 16.1.4 (App Router, TypeScript, React 19)
- Tailwind CSS 3.4 + @tailwindcss/typography
- Sanity CMS v3 (embedded studio at /studio)
- next-themes (dark/light mode with persistence)
- Framer Motion 11 (installed only, animations added by owner later)
- clsx + tailwind-merge (class utilities)
- react-markdown (project content rendering)
- Deployed on Vercel

## Dependencies
```json
{
  "dependencies": {
    "next": "^16.1.4",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "next-sanity": "^10.0.0",
    "sanity": "^5.6.0",
    "motion": "^12.0.0",
    "next-themes": "^0.4.6",
    "react-markdown": "^10.1.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.6.0"
  },
  "devDependencies": {
    "tailwindcss": "^4.0.0",
    "@tailwindcss/postcss": "^4.0.0",
    "typescript": "^5.7.2"
  }
}
```

> **Note:** Import from "motion" not "framer-motion"

> **Note:** Use Sanity Studio v5 patterns

> **Note:** Use Tailwind 4.0 config structure

## Environment Variables
```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

## File Structure
```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── loading.tsx
│   ├── error.tsx
│   ├── not-found.tsx
│   ├── projects/
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   └── [slug]/
│   │       ├── page.tsx
│   │       └── loading.tsx
│   ├── about/
│   │   ├── page.tsx
│   │   └── loading.tsx
│   └── studio/
│       └── [[...tool]]/
│           └── page.tsx
├── components/
│   ├── layout/
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── mobile-nav.tsx
│   │   └── theme-toggle.tsx
│   ├── sections/
│   │   ├── hero.tsx
│   │   ├── featured-projects.tsx
│   │   ├── skills.tsx
│   │   └── contact-cta.tsx
│   ├── projects/
│   │   ├── project-card.tsx
│   │   ├── project-grid.tsx
│   │   ├── project-filter.tsx
│   │   └── project-detail.tsx
│   ├── about/
│   │   ├── bio.tsx
│   │   ├── skills-list.tsx
│   │   └── social-links.tsx
│   └── ui/
│       ├── button.tsx
│       ├── badge.tsx
│       ├── card.tsx
│       ├── container.tsx
│       ├── section.tsx
│       ├── skeleton.tsx
│       └── icons.tsx
├── lib/
│   ├── utils.ts
│   └── sanity/
│       ├── client.ts
│       ├── queries.ts
│       └── image.ts
├── types/
│   └── sanity.ts
└── providers/
    └── theme-provider.tsx

sanity/
├── sanity.config.ts
├── schema.ts
└── schemas/
    ├── profile.ts
    └── project.ts
```

## Sanity Schemas

### profile (singleton)
```typescript
{
  name: string (required)
  title: string (required)
  bio: text (required)
  avatar: image (required)
  email: string (required, email format)
  resumeUrl: url (optional)
  socialLinks: array of {
    platform: string (github | linkedin | twitter | other)
    url: url
  }
  skills: array of {
    name: string
    category: string (frontend | backend | tools | other)
  }
}
```

### project (document)
```typescript
{
  title: string (required)
  slug: slug (auto from title, required)
  description: string (required, max 200 chars)
  content: text (optional, markdown)
  thumbnail: image (required)
  tags: array of string (required, min 1)
  liveUrl: url (optional)
  githubUrl: url (optional)
  featured: boolean (default false)
  publishedAt: datetime (required)
}
```

## Types (src/types/sanity.ts)
```typescript
interface Profile {
  _id: string
  name: string
  title: string
  bio: string
  avatar: SanityImage
  email: string
  resumeUrl?: string
  socialLinks: SocialLink[]
  skills: Skill[]
}

interface SocialLink {
  platform: 'github' | 'linkedin' | 'twitter' | 'other'
  url: string
}

interface Skill {
  name: string
  category: 'frontend' | 'backend' | 'tools' | 'other'
}

interface Project {
  _id: string
  title: string
  slug: string
  description: string
  content?: string
  thumbnail: SanityImage
  tags: string[]
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  publishedAt: string
}

interface SanityImage {
  asset: {
    _ref: string
    url: string
  }
  alt?: string
}
```

## GROQ Queries (src/lib/sanity/queries.ts)
```groq
// Profile
*[_type == "profile"][0] {
  _id, name, title, bio, email, resumeUrl,
  "avatar": avatar.asset->url,
  socialLinks[] { platform, url },
  skills[] { name, category }
}

// All projects
*[_type == "project"] | order(publishedAt desc) {
  _id, title, "slug": slug.current, description,
  "thumbnail": thumbnail.asset->url,
  tags, liveUrl, githubUrl, featured, publishedAt
}

// Featured projects
*[_type == "project" && featured == true] | order(publishedAt desc)[0...4] {
  _id, title, "slug": slug.current, description,
  "thumbnail": thumbnail.asset->url,
  tags, liveUrl, githubUrl
}

// Single project by slug
*[_type == "project" && slug.current == $slug][0] {
  _id, title, "slug": slug.current, description, content,
  "thumbnail": thumbnail.asset->url,
  tags, liveUrl, githubUrl, publishedAt
}
```

## Page Requirements

### Homepage (/)
- Fetches: profile, featured projects
- Sections: Hero, FeaturedProjects, Skills, ContactCTA
- Revalidate: 60 seconds

### Projects (/projects)
- Fetches: all projects
- Components: ProjectFilter (client), ProjectGrid
- Filter by tags (client-side, URL params)
- Revalidate: 60 seconds

### Project Detail (/projects/[slug])
- Fetches: single project by slug
- Uses generateStaticParams for SSG
- Renders markdown content with react-markdown
- Revalidate: 60 seconds

### About (/about)
- Fetches: profile
- Sections: Bio, SkillsList, SocialLinks
- Revalidate: 60 seconds

### Studio (/studio)
- Embedded Sanity Studio
- Uses next-sanity/studio
- Client component

## Component Props

### UI Components
- Button: children, variant (primary|secondary|ghost), size (sm|md|lg), className, onClick, disabled, asChild
- Badge: children, variant (default|outline), className
- Card: children, className
- Container: children, className
- Section: children, className, id
- Skeleton: className, width, height

### Layout Components
- Header: no props (fetches profile for logo/name)
- Footer: no props (fetches profile for social links)
- MobileNav: no props
- ThemeToggle: no props

### Section Components
- Hero: profile data passed as prop
- FeaturedProjects: projects array passed as prop
- Skills: skills array passed as prop
- ContactCTA: email passed as prop

### Project Components
- ProjectCard: project data as prop
- ProjectGrid: projects array as prop
- ProjectFilter: tags array, current filter as props (client component)
- ProjectDetail: project data as prop

## Build Phases

### Phase 1: Setup
- Initialize Next.js 15 with TypeScript
- Install all dependencies
- Configure Tailwind + typography plugin
- Create Sanity project and get credentials
- Set up environment variables
- Create lib/utils.ts with cn() function
- Create types/sanity.ts with all interfaces
- Set up Sanity client (lib/sanity/client.ts)
- Create GROQ queries (lib/sanity/queries.ts)
- Create image helper (lib/sanity/image.ts)
- Create Sanity schemas (profile.ts, project.ts)
- Configure sanity.config.ts

### Phase 2: Layout
- Create globals.css with Tailwind imports and CSS variables
- Create theme-provider.tsx
- Create root layout.tsx (fonts, providers, html structure)
- Create header.tsx with navigation
- Create footer.tsx with social links
- Create mobile-nav.tsx (client component with sheet/drawer)
- Create theme-toggle.tsx (client component)

### Phase 3: UI Components
- Create container.tsx
- Create section.tsx
- Create button.tsx with variants
- Create badge.tsx with variants
- Create card.tsx
- Create skeleton.tsx
- Create icons.tsx (common icons as components)

### Phase 4: Homepage
- Create hero.tsx section
- Create featured-projects.tsx section
- Create skills.tsx section
- Create contact-cta.tsx section
- Create app/page.tsx (compose sections, fetch data)
- Create app/loading.tsx (skeleton layout)
- Create app/error.tsx (error boundary)

### Phase 5: Projects
- Create project-card.tsx
- Create project-grid.tsx
- Create project-filter.tsx (client component)
- Create project-detail.tsx
- Create app/projects/page.tsx
- Create app/projects/loading.tsx
- Create app/projects/[slug]/page.tsx with generateStaticParams
- Create app/projects/[slug]/loading.tsx

### Phase 6: About
- Create bio.tsx
- Create skills-list.tsx
- Create social-links.tsx
- Create app/about/page.tsx
- Create app/about/loading.tsx

### Phase 7: Final
- Create app/not-found.tsx (404 page)
- Add metadata to all pages (title, description, og)
- Configure next.config.ts (images.remotePatterns for Sanity)
- Create app/studio/[[...tool]]/page.tsx
- Run build, fix any errors
- Test all pages locally
- Verify Sanity Studio works
- Deploy to Vercel