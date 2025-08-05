# TradePro - Stock Trading Platform

## Overview

TradePro is a modern stock trading platform featuring a professional landing page with real-time market data, interactive animations, and a comprehensive admin dashboard for content management. The application combines a React-based frontend with an Express.js backend, utilizing PostgreSQL for data persistence and modern UI components for an exceptional user experience.

The platform showcases featured stocks with live price updates, market news, user testimonials, and engaging animations throughout the interface. The admin dashboard provides full CRUD operations for managing stocks, news articles, and testimonials with role-based access control.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Routing**: Wouter for lightweight client-side routing with dedicated pages for landing and admin interfaces
- **State Management**: TanStack Query (React Query) for server state management, caching, and real-time data synchronization
- **UI Framework**: Shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling
- **Animations**: Framer Motion for smooth, performant animations including stock tickers and hover effects
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework using ES modules
- **Database**: PostgreSQL with Neon serverless for scalable cloud database hosting
- **ORM**: Drizzle ORM with Drizzle Kit for type-safe database operations and migrations
- **Schema Validation**: Zod for runtime type validation and schema generation
- **Session Management**: Connect-pg-simple for PostgreSQL-backed session storage

### Data Layer Design
- **Database Schema**: Three main entities (stocks, news_articles, testimonials) with UUID primary keys
- **Shared Schema**: Common schema definitions between frontend and backend using shared TypeScript files
- **Type Safety**: End-to-end type safety from database schema to frontend components using Drizzle-Zod
- **Real-time Updates**: Automatic data refetching every 30 seconds for stock price updates

### API Architecture
- **RESTful Design**: Clean REST endpoints for public data access and admin operations
- **Route Organization**: Separate public and admin routes with appropriate access controls
- **Error Handling**: Centralized error handling with proper HTTP status codes and error messages
- **Request Validation**: Schema-based validation for all API endpoints using Zod

### Development & Deployment
- **Development Environment**: Replit-optimized with hot reload and runtime error handling
- **Build Process**: Vite for frontend bundling and esbuild for backend compilation
- **Environment Management**: Environment-based configuration for database connections and feature flags
- **Code Organization**: Monorepo structure with clear separation between client, server, and shared code

## External Dependencies

### Database & ORM
- **Neon Database**: Serverless PostgreSQL hosting with WebSocket support for connection pooling
- **Drizzle ORM**: Type-safe database operations with automatic TypeScript generation
- **Drizzle Kit**: Database migration management and schema synchronization

### UI & Styling
- **Shadcn/ui**: Pre-built component library built on Radix UI primitives
- **Radix UI**: Accessible, unstyled UI components for complex interactions
- **Tailwind CSS**: Utility-first CSS framework with custom design system variables
- **Framer Motion**: Production-ready animation library for smooth user interactions

### Development Tools
- **TanStack Query**: Powerful data fetching and caching library with automatic background updates
- **React Hook Form**: Performant form management with built-in validation
- **Wouter**: Lightweight routing solution optimized for modern React applications

### Build & Development
- **Vite**: Next-generation frontend build tool with fast HMR and optimized builds
- **TypeScript**: Static type checking across the entire application stack
- **ESBuild**: Fast JavaScript bundler for backend compilation and optimization