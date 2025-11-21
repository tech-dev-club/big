-- Create update timestamp function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create trigger function for new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update trigger for profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create saved_ideas table
CREATE TABLE public.saved_ideas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  location TEXT NOT NULL,
  coordinates JSONB NOT NULL,
  category TEXT NOT NULL,
  biz_score_today NUMERIC NOT NULL,
  biz_score_12m NUMERIC NOT NULL,
  competition_density TEXT,
  forecast_growth NUMERIC,
  demand_index NUMERIC,
  financials JSONB,
  swot JSONB,
  recommendation JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, location, category)
);

-- Enable RLS
ALTER TABLE public.saved_ideas ENABLE ROW LEVEL SECURITY;

-- Saved ideas policies
CREATE POLICY "Users can view their own saved ideas"
  ON public.saved_ideas FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own saved ideas"
  ON public.saved_ideas FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved ideas"
  ON public.saved_ideas FOR DELETE
  USING (auth.uid() = user_id);

-- Create saved_reports table
CREATE TABLE public.saved_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  idea_id UUID REFERENCES public.saved_ideas(id) ON DELETE CASCADE,
  report_data JSONB NOT NULL,
  title TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.saved_reports ENABLE ROW LEVEL SECURITY;

-- Saved reports policies
CREATE POLICY "Users can view their own saved reports"
  ON public.saved_reports FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own saved reports"
  ON public.saved_reports FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved reports"
  ON public.saved_reports FOR DELETE
  USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_saved_ideas_user_id ON public.saved_ideas(user_id);
CREATE INDEX idx_saved_ideas_created_at ON public.saved_ideas(created_at DESC);
CREATE INDEX idx_saved_reports_user_id ON public.saved_reports(user_id);
CREATE INDEX idx_saved_reports_idea_id ON public.saved_reports(idea_id);