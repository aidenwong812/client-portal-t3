/**
 * Only allow interactions via TRPC. 
 * This way we don't need to set up RLS and do authorization on the application level.
 */
revoke USAGE on schema public from anon, authenticated;

/**
* This trigger automatically creates a User entry when a new user signs up
* via Supabase Auth.
*/
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into "public"."User" ("id", email, username)
  values (new.id, new.email, new.raw_user_meta_data->>'username');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();