# Unique Mind

Unique Mind is a Vite + React + TypeScript learning platform built for students, mentors, and admins. It combines personalized learning techniques with mentorship features, interactive dashboards, and AI-powered guidance.

## What it includes

- Modern frontend using React, Vite, Tailwind CSS, and Framer Motion
- Supabase authentication and backend integration
- Multi-role support for students, mentors, and admins
- Learning technique pages for:
  - Pomodoro
  - Spaced Repetition
  - Active Recall
  - Feynman Technique
- Student dashboard, quizzes, leaderboard, tasks, and chat interface
- Admin dashboard for managing mentors, careers, skills, and subjects
- AI-powered feedback in the Feynman technique page via Google Gemini

## Project structure

- `src/App.tsx` — main landing page and feature overview
- `src/main.tsx` — route definitions for the app
- `src/context/AuthContext.tsx` — Supabase auth provider and session management
- `src/utils/supabase.ts` — Supabase client initialization
- `src/routes/` — application pages and dashboards
- `src/routes/techniques/` — learning technique modules

## Environment variables

The app requires the following environment variables at runtime:

- `VITE_SUPABASE_URL` — your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` — Supabase anonymous public key

Optional (for AI mentor features):

- `VITE_GEMINI_API_KEY` — Google Gemini API key for AI-driven learning feedback

## Setup

1. Install dependencies:

```bash
yarn install
```

2. Create a `.env` file in the project root with:

```env
VITE_SUPABASE_URL=https://your-supabase-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_GEMINI_API_KEY=your-google-gemini-key
```

3. Run the development server:

```bash
yarn dev
```

4. Open the local app in your browser at the URL shown in the terminal.

## Scripts

- `yarn dev` — start development server
- `yarn build` — build production assets
- `yarn preview` — preview the built app locally
- `yarn lint` — run ESLint checks

## Deployment notes

- This is a frontend application; there is no standalone backend server in this repository.
- Deployment platforms: Vercel, Netlify, or any static hosting that supports Vite builds.
- Make sure the required environment variables are configured in your hosting provider.

## Routes

- `/` — landing page
- `/login` — login page
- `/signup` — signup and onboarding
- `/dashboard` — student dashboard
- `/chat` — chat interface
- `/quiz` — quiz experience
- `/Leaderboard` — leaderboard page
- `/task` — task page
- `/admin` — admin dashboard
- `/techniques` — learning techniques overview
- `/techniques/pomodoro`
- `/techniques/spaced-repetition`
- `/techniques/active-recall`
- `/techniques/feynman`

## Notes

- The app relies on Supabase for auth and data storage.
- AI feedback is available only if `VITE_GEMINI_API_KEY` is provided.
- The current code includes a polished landing page, onboarding flow, and student/mentor/admin UX.

## License

This project is currently private and is not configured with an open-source license.
