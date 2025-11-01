# Local Development Setup for VS Code

## Prerequisites

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **VS Code** - [Download here](https://code.visualstudio.com/)

## Getting Started

### 1. Clone and Install

```bash
# Clone the repository (if not already done)
git clone <your-repo-url>
cd <project-folder>

# Install dependencies
npm install
```

### 2. Environment Variables

The `.env` file is already configured with your Lovable Cloud (Supabase) backend credentials:

```
VITE_SUPABASE_PROJECT_ID=xqmuprpjbdvquknsvqnv
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_SUPABASE_URL=https://xqmuprpjbdvquknsvqnv.supabase.co
```

**No additional setup needed** - the backend is fully configured and ready to use.

### 3. Run the Development Server

```bash
npm run dev
```

The app will open at `http://localhost:8080`

### 4. Recommended VS Code Extensions

When you open the project, VS Code will prompt you to install recommended extensions:

- **Prettier** - Code formatting
- **ESLint** - Code linting
- **Tailwind CSS IntelliSense** - Tailwind autocomplete
- **Supabase** - Backend integration tools

## Features That Work Locally

✅ **Authentication** - Sign up, sign in, protected routes  
✅ **Database** - All data persistence through Lovable Cloud  
✅ **AI Features** - Resume enhancement, suggestions, scoring  
✅ **File Storage** - Photo uploads and resume storage  
✅ **Edge Functions** - Backend API calls for AI processing  

## Project Structure

```
src/
├── components/       # React components
├── pages/           # Route pages
├── contexts/        # React contexts (ResumeContext)
├── integrations/    # Supabase client (auto-generated)
├── hooks/           # Custom hooks
├── lib/             # Utilities
└── types/           # TypeScript types

supabase/
├── functions/       # Edge functions (backend API)
└── config.toml      # Supabase configuration
```

## Common Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Backend Access

All backend features are managed through **Lovable Cloud**:
- Database tables and queries
- User authentication
- File storage
- Edge functions (AI processing)

No additional backend setup or API keys required!

## Troubleshooting

### Port Already in Use
If port 8080 is taken, edit `vite.config.ts` to change the port.

### Authentication Issues
Make sure you're using the correct credentials and that auto-confirm is enabled in the backend settings.

### Storage Quota Errors
The app automatically handles localStorage quota by storing large files (like photos) in sessionStorage.

## Support

For more information, check:
- [Lovable Documentation](https://docs.lovable.dev/)
- [Project README](./README.md)
