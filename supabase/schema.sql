create table if not exists public.installations (
  user_id text primary key,
  exchange jsonb not null default '{}'::jsonb
);

create table if not exists public.bot_events (
  id bigint generated always as identity primary key,
  user_id text not null,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  processed_at timestamptz
);

create index if not exists bot_events_pending_idx
  on public.bot_events (status, created_at)
  where status = 'pending';

alter table public.installations enable row level security;
alter table public.bot_events enable row level security;

revoke all on public.installations from anon, authenticated;
revoke all on public.bot_events from anon, authenticated;
