CREATE EXTENSION IF NOT EXISTS "pg_graphql";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "plpgsql";
CREATE EXTENSION IF NOT EXISTS "supabase_vault";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
--
-- PostgreSQL database dump
--


-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.7

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--



--
-- Name: handle_new_user(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.handle_new_user() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
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


--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;


SET default_table_access_method = heap;

--
-- Name: profiles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.profiles (
    id uuid NOT NULL,
    email text,
    full_name text,
    avatar_url text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: saved_ideas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.saved_ideas (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    location text NOT NULL,
    coordinates jsonb NOT NULL,
    category text NOT NULL,
    biz_score_today numeric NOT NULL,
    biz_score_12m numeric NOT NULL,
    competition_density text,
    forecast_growth numeric,
    demand_index numeric,
    financials jsonb,
    swot jsonb,
    recommendation jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: saved_reports; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.saved_reports (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    idea_id uuid,
    report_data jsonb NOT NULL,
    title text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);


--
-- Name: saved_ideas saved_ideas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.saved_ideas
    ADD CONSTRAINT saved_ideas_pkey PRIMARY KEY (id);


--
-- Name: saved_ideas saved_ideas_user_id_location_category_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.saved_ideas
    ADD CONSTRAINT saved_ideas_user_id_location_category_key UNIQUE (user_id, location, category);


--
-- Name: saved_reports saved_reports_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.saved_reports
    ADD CONSTRAINT saved_reports_pkey PRIMARY KEY (id);


--
-- Name: idx_saved_ideas_created_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_saved_ideas_created_at ON public.saved_ideas USING btree (created_at DESC);


--
-- Name: idx_saved_ideas_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_saved_ideas_user_id ON public.saved_ideas USING btree (user_id);


--
-- Name: idx_saved_reports_idea_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_saved_reports_idea_id ON public.saved_reports USING btree (idea_id);


--
-- Name: idx_saved_reports_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_saved_reports_user_id ON public.saved_reports USING btree (user_id);


--
-- Name: profiles update_profiles_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: profiles profiles_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: saved_ideas saved_ideas_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.saved_ideas
    ADD CONSTRAINT saved_ideas_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: saved_reports saved_reports_idea_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.saved_reports
    ADD CONSTRAINT saved_reports_idea_id_fkey FOREIGN KEY (idea_id) REFERENCES public.saved_ideas(id) ON DELETE CASCADE;


--
-- Name: saved_reports saved_reports_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.saved_reports
    ADD CONSTRAINT saved_reports_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: saved_ideas Users can create their own saved ideas; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can create their own saved ideas" ON public.saved_ideas FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: saved_reports Users can create their own saved reports; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can create their own saved reports" ON public.saved_reports FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: saved_ideas Users can delete their own saved ideas; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can delete their own saved ideas" ON public.saved_ideas FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: saved_reports Users can delete their own saved reports; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can delete their own saved reports" ON public.saved_reports FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: profiles Users can update their own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING ((auth.uid() = id));


--
-- Name: profiles Users can view their own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING ((auth.uid() = id));


--
-- Name: saved_ideas Users can view their own saved ideas; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own saved ideas" ON public.saved_ideas FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: saved_reports Users can view their own saved reports; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own saved reports" ON public.saved_reports FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: profiles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

--
-- Name: saved_ideas; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.saved_ideas ENABLE ROW LEVEL SECURITY;

--
-- Name: saved_reports; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.saved_reports ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--


