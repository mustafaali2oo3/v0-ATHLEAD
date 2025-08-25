-- Create follows table for user relationships
create table if not exists public.follows (
  id uuid primary key default gen_random_uuid(),
  follower_id uuid not null references public.profiles(id) on delete cascade,
  following_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(follower_id, following_id), -- Prevent duplicate follows
  check (follower_id != following_id) -- Prevent self-follows
);

-- Enable RLS
alter table public.follows enable row level security;

-- RLS policies for follows
create policy "follows_select_all"
  on public.follows for select
  using (true); -- Allow everyone to see follow relationships

create policy "follows_insert_own"
  on public.follows for insert
  with check (auth.uid() = follower_id);

create policy "follows_delete_own"
  on public.follows for delete
  using (auth.uid() = follower_id);

-- Create indexes for better performance
create index if not exists follows_follower_id_idx on public.follows(follower_id);
create index if not exists follows_following_id_idx on public.follows(following_id);
create index if not exists follows_created_at_idx on public.follows(created_at desc);
