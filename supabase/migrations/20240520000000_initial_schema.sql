-- GembeEduPro Initial Schema
-- Generated: 2024-05-20

-- Enable extensions
create extension if not exists "uuid-ossp";

-- 1. Profiles (extends auth.users)
create table if not exists public.profiles (
    id uuid references auth.users on delete cascade primary key,
    full_name text,
    role text check (role in ('patient', 'provider', 'admin', 'institution_admin')),
    preferred_language text default 'en',
    avatar_url text,
    metadata jsonb default '{}'::jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;

-- 2. Medical Specialties
create table if not exists public.specialties (
    id uuid default uuid_generate_v4() primary key,
    name text not null unique,
    description text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.specialties enable row level security;

-- 3. Education Topics
create table if not exists public.topics (
    id uuid default uuid_generate_v4() primary key,
    specialty_id uuid references public.specialties(id) on delete set null,
    title text not null,
    description text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.topics enable row level security;

-- 4. Education Content (Multilingual)
create table if not exists public.content (
    id uuid default uuid_generate_v4() primary key,
    topic_id uuid references public.topics(id) on delete cascade,
    language text not null, -- e.g., 'en', 'sw', 'yo', 'zu'
    title text not null,
    body_text text,
    media_url text,
    content_type text check (content_type in ('article', 'video', 'audio')),
    is_premium boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.content enable row level security;

-- 5. AI Educator Profiles
create table if not exists public.ai_educator_profiles (
    id uuid default uuid_generate_v4() primary key,
    patient_id uuid references public.profiles(id) on delete cascade,
    name text not null,
    personality_traits text, -- 'gentle', 'direct', 'encouraging'
    disease_focus text[], -- array of diseases like ['diabetes', 'hypertension']
    language text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.ai_educator_profiles enable row level security;

-- 6. Patient Health Trends
create table if not exists public.health_trends (
    id uuid default uuid_generate_v4() primary key,
    patient_id uuid references public.profiles(id) on delete cascade,
    metric_name text not null, -- 'blood_pressure', 'glucose', 'mood'
    metric_value jsonb not null,
    recorded_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.health_trends enable row level security;

-- 7. Provider-Patient Links
create table if not exists public.provider_patient_links (
    id uuid default uuid_generate_v4() primary key,
    provider_id uuid references public.profiles(id) on delete cascade,
    patient_id uuid references public.profiles(id) on delete cascade,
    status text check (status in ('pending', 'active', 'rejected')) default 'pending',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(provider_id, patient_id)
);

alter table public.provider_patient_links enable row level security;

-- 8. Healthcare Institutions
create table if not exists public.institutions (
    id uuid default uuid_generate_v4() primary key,
    name text not null,
    address text,
    contact_info jsonb,
    subscription_status text default 'inactive',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.institutions enable row level security;

-- 9. Institutional Subscriptions
create table if not exists public.subscriptions (
    id uuid default uuid_generate_v4() primary key,
    institution_id uuid references public.institutions(id) on delete cascade,
    plan_name text not null,
    status text check (status in ('active', 'expired', 'canceled')),
    start_date timestamp with time zone not null,
    end_date timestamp with time zone not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.subscriptions enable row level security;

-- 10. Indexes for performance
create index if not exists idx_topics_specialty on public.topics(specialty_id);
create index if not exists idx_content_topic on public.content(topic_id);
create index if not exists idx_content_language on public.content(language);
create index if not exists idx_health_trends_patient on public.health_trends(patient_id);
create index if not exists idx_ai_profiles_patient on public.ai_educator_profiles(patient_id);
create index if not exists idx_links_provider on public.provider_patient_links(provider_id);
create index if not exists idx_links_patient on public.provider_patient_links(patient_id);

-- RLS POLICIES

-- Profiles
create policy "Public profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can update their own profile" on public.profiles for update using (auth.uid() = id);

-- Specialties & Topics
create policy "Specialties are viewable by everyone" on public.specialties for select using (true);
create policy "Topics are viewable by everyone" on public.topics for select using (true);

-- Content
create policy "Free content is viewable by everyone" on public.content for select 
using (not is_premium OR (exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'provider'))));

-- AI Educator
create policy "Users can manage their own AI educator" on public.ai_educator_profiles for all using (auth.uid() = patient_id);

-- Health Trends
create policy "Patients view their own trends" on public.health_trends for select using (auth.uid() = patient_id);
create policy "Patients insert their own trends" on public.health_trends for insert with check (auth.uid() = patient_id);
create policy "Providers view linked patient trends" on public.health_trends for select using (
    exists (
        select 1 from public.provider_patient_links 
        where provider_id = auth.uid() and patient_id = public.health_trends.patient_id and status = 'active'
    )
);

-- Connections
create policy "Users view their own connections" on public.provider_patient_links for select using (auth.uid() = provider_id or auth.uid() = patient_id);
create policy "Providers can request connection" on public.provider_patient_links for insert with check (auth.uid() = provider_id);

-- Institutions & Subscriptions (Admin only)
create policy "Admins manage institutions" on public.institutions for all using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "Everyone view institutions" on public.institutions for select using (true);