create extension if not exists pgcrypto;
create extension if not exists "uuid-ossp";
create extension if not exists pg_trgm;

-- Prisma creates the operational tables. These policies are applied only after the
-- corresponding tables exist in Supabase. Keep service-role migrations separate.
do $$
begin
  if to_regclass('public."User"') is not null then
    alter table "User" enable row level security;
  end if;
  if to_regclass('public."Organization"') is not null then
    alter table "Organization" enable row level security;
  end if;
  if to_regclass('public."Workspace"') is not null then
    alter table "Workspace" enable row level security;
  end if;
  if to_regclass('public."Asset"') is not null then
    alter table "Asset" enable row level security;
    execute 'create index if not exists asset_workspace_type_idx on "Asset"("workspaceId", "type")';
  end if;
  if to_regclass('public."Finding"') is not null then
    alter table "Finding" enable row level security;
  end if;
  if to_regclass('public."Evidence"') is not null then
    alter table "Evidence" enable row level security;
  end if;
  if to_regclass('public."Notification"') is not null then
    alter table "Notification" enable row level security;
  end if;
end $$;

-- Server-side Fastify uses the service-role/database connection. Client access is
-- intentionally deny-by-default until auth claims and workspace policies are wired.
