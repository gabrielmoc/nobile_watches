# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This is a Next.js project with TypeScript and Tailwind CSS. Use these commands:

```bash
# Development
npm run dev                 # Start development server (localhost:3000)
npm run build              # Build for production
npm start                  # Start production server

# Code Quality
npm run lint               # Run ESLint
npm run lint:fix           # Fix ESLint issues automatically
npm run type-check         # Run TypeScript type checking
```

**Important**: Always run `npm run lint` and `npm run type-check` after making code changes to ensure quality.

## Project Architecture

### Module-Based Architecture
The project follows a modular architecture pattern:

```
src/
├── app/                   # Next.js 15 App Router
│   ├── (auth)/           # Authentication pages
│   ├── (main)/           # Main application pages
│   └── layout.tsx        # Root layout with SEO metadata
├── modules/              # Feature modules
│   ├── home/             # Home page functionality
│   ├── auth/             # Authentication module
│   └── products/         # Product catalog module
├── components/
│   ├── layout/           # Layout components
│   └── ui/               # Reusable UI components
├── lib/                  # Utilities and configurations
│   ├── config/           # API and app configuration
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   └── validations/      # Zod schemas
└── types/                # TypeScript type definitions
```

### Key Architecture Patterns

1. **Module Templates**: Each feature module uses a template pattern (e.g., `HomeTemplate.tsx`)
2. **Component Organization**: Components are organized by feature in modules, with shared UI components in `/components/ui/`
3. **Type Safety**: Full TypeScript implementation with Zod for runtime validation
4. **API Configuration**: Centralized in `src/lib/config/api.ts`

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **State Management**: SWR for data fetching
- **Icons**: Lucide React, React Icons, Heroicons
- **UI Components**: Headless UI, Radix UI

## Design System

The project uses a custom design system with:
- **Primary Color**: Orange (#f97316) - luxury watch marketplace brand
- **Typography**: Inter (sans-serif) and Playfair Display (serif)
- **Custom Animations**: fade-in, slide-up, scale-in
- **Responsive Design**: Mobile-first with custom breakpoints (xs: 475px, 3xl: 1680px)

## Environment Configuration

- Create `.env.local` based on `.env.example`
- `NEXT_PUBLIC_BASE_URL` is used for metadata and SEO
- Portuguese (pt-BR) is the default locale

## Code Conventions

- Use TypeScript interfaces for all props and data structures
- Follow the existing module structure when adding new features
- Use Tailwind classes with the custom design system colors
- Implement proper error handling with try-catch blocks
- Form validation should use Zod schemas from `/lib/validations/`

## SVG Handling

SVGs are configured to work as React components via @svgr/webpack. Import SVGs directly as components.

## Security Features

- CSP headers configured for SVG handling
- Security headers (X-Frame-Options, X-Content-Type-Options)
- Image optimization with WebP/AVIF support
- Production console.log removal