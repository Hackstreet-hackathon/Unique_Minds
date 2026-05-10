-- SQL Schema for BrightMinds App

-- Create Careers table
CREATE TABLE IF NOT EXISTS public.career (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

-- Create Skills table
CREATE TABLE IF NOT EXISTS public.skill (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

-- Create Subjects table
CREATE TABLE IF NOT EXISTS public.subject (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

-- Create Subject-Career relations (Many-to-Many)
CREATE TABLE IF NOT EXISTS public.subject_career (
  id SERIAL PRIMARY KEY,
  subject_id INTEGER REFERENCES public.subject(id) ON DELETE CASCADE,
  career_id INTEGER REFERENCES public.career(id) ON DELETE CASCADE
);

-- Create Admins table
CREATE TABLE IF NOT EXISTS public.admin (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL, -- Note: In production, rely on Supabase Auth, not plaintext passwords
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- Create Mentors table
CREATE TABLE IF NOT EXISTS public.mentor (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  max_students INTEGER DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- Create Mentor-Skill relations (Many-to-Many)
CREATE TABLE IF NOT EXISTS public.mentor_skill (
  id SERIAL PRIMARY KEY,
  mentor_id UUID REFERENCES public.mentor(id) ON DELETE CASCADE,
  skill_id INTEGER REFERENCES public.skill(id) ON DELETE CASCADE
);

-- Create Students table
CREATE TABLE IF NOT EXISTS public.student (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- RLS (Row Level Security) Configuration
-- For a quick start, we can enable read access to all. Adjust these rules for production!
ALTER TABLE public.career ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subject ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentor ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student ENABLE ROW LEVEL SECURITY;

-- Allow read access for everyone
CREATE POLICY "Enable read access for all users" ON public.career FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.skill FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.subject FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.mentor FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.student FOR SELECT USING (true);

-- Allow insert/update for anon keys temporarily (DEVELOPMENT ONLY)
CREATE POLICY "Enable write access for all users" ON public.career FOR ALL USING (true);
CREATE POLICY "Enable write access for all users" ON public.skill FOR ALL USING (true);
CREATE POLICY "Enable write access for all users" ON public.subject FOR ALL USING (true);
CREATE POLICY "Enable write access for all users" ON public.mentor FOR ALL USING (true);
CREATE POLICY "Enable write access for all users" ON public.student FOR ALL USING (true);
CREATE POLICY "Enable write access for all users" ON public.admin FOR ALL USING (true);
