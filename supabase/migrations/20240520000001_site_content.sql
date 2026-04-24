-- Migration to add site_content table for CMS
create table if not exists public.site_content (
    id uuid default uuid_generate_v4() primary key,
    key text not null unique,
    value text not null,
    category text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.site_content enable row level security;

-- Policies
create policy "Anyone can view site content" on public.site_content for select using (true);
create policy "Admins can manage site content" on public.site_content for all using (
    exists (
        select 1 from public.profiles 
        where id = auth.uid() and role = 'platform_admin'
    )
);

-- Add some default content to prevent blank sections
insert into public.site_content (key, value, category) values
('hero_title', 'Healthcare Redefined.', 'hero'),
('hero_subtitle', 'GembeEduPro integrates AI analytics, Blockchain security, and localized education to empower millions across Africa. The future of health is here.', 'hero'),
('blockchain_title', 'Your Data, Forever Secure.', 'blockchain')
on conflict (key) do nothing;