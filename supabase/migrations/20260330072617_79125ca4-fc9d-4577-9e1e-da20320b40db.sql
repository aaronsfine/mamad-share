-- Enable pg_net for HTTP calls from triggers
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Create a function that calls the notify edge function
CREATE OR REPLACE FUNCTION public.notify_new_real_listing()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  admin_email text;
  supabase_url text;
  service_key text;
BEGIN
  -- Only notify for real (non-demo) listings
  IF NEW.is_demo = false THEN
    -- Get the admin email from the host's auth record
    SELECT email INTO admin_email
    FROM auth.users
    WHERE id = NEW.host_id;
    
    -- Call the edge function via pg_net
    PERFORM extensions.http_post(
      url := current_setting('app.settings.supabase_url', true) || '/functions/v1/notify-new-listing',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key', true)
      ),
      body := jsonb_build_object(
        'host_name', NEW.host_name,
        'city', NEW.city,
        'neighborhood', NEW.neighborhood
      )
    );
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger
DROP TRIGGER IF EXISTS on_real_listing_created ON public.listings;
CREATE TRIGGER on_real_listing_created
  AFTER INSERT ON public.listings
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_new_real_listing();
