# Precision AI Open Source - Project Documentation

## Overview
An AI-powered precision medicine platform that generates personalized chemotherapy treatment recommendations using advanced analytics and machine learning. The platform includes patient management, treatment tracking, ASO target analysis, cancer vaccine target discovery, and an interactive AI chat assistant.

**Current Status**: Development complete, prepared for GitHub deployment
**Last Updated**: July 2, 2025

## Project Architecture

### Technology Stack
- **Frontend**: React 18 + TypeScript + Tailwind CSS + Shadcn/ui
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **AI Integration**: OpenAI GPT-4o for medical recommendations
- **Authentication**: Passport.js with local strategy
- **Build Tool**: Vite for development and production builds

### Database Schema
- **Users**: Authentication and user management
- **Patients**: Demographics, medical history, genetic markers
- **Treatments**: Treatment records, medications, outcomes
- **ASO Targets**: Antisense oligonucleotide target analysis
- **Cancer Vaccine Targets**: Personalized vaccine target data

### Key Features Implemented
- ✅ User authentication and session management
- ✅ Patient management with comprehensive forms
- ✅ AI-powered treatment recommendations
- ✅ ASO target analysis
- ✅ Cancer vaccine target discovery
- ✅ Interactive AI chat interface
- ✅ Responsive design with mobile support
- ✅ Real-time data fetching with TanStack Query

## Recent Changes

### July 2, 2025 - GitHub Preparation
- Created comprehensive README.md with installation instructions
- Updated .gitignore for proper file exclusion
- Added MIT License for open-source distribution
- Created CONTRIBUTING.md with development guidelines
- Added .env.example for environment setup
- Prepared project for GitHub upload to `NadavShanun-design/Precision-AI-Open-Source`

### Previous Development
- Implemented full-stack application with authentication
- Integrated OpenAI API for medical AI capabilities
- Created responsive UI with modern design patterns
- Set up PostgreSQL database with Drizzle ORM
- Implemented comprehensive patient and treatment management

## User Preferences
- Language: English
- Technical Level: Business/non-technical user
- Communication: Clear, simple explanations without technical jargon
- Project Goal: Open-source precision medicine platform

## Environment Variables Required
- `DATABASE_URL`: PostgreSQL connection string
- `OPENAI_API_KEY`: OpenAI API key for AI features
- `SESSION_SECRET`: Secure session secret

## Deployment Notes
- Application runs on port 5000 by default
- Vite dev server integrated with Express backend
- Database migrations handled via `npm run db:push`
- All dependencies managed through package.json

## Next Steps for GitHub Upload
1. User needs to create GitHub repository: `NadavShanun-design/Precision-AI-Open-Source`
2. Initialize git repository locally
3. Add files to repository
4. Push to GitHub
5. Configure repository settings and documentation