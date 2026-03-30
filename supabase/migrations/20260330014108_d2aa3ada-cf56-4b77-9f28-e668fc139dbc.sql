
-- Revoke SELECT on the phone column from anon and public roles
-- The get_whatsapp_url function uses SECURITY DEFINER so it still has access
REVOKE SELECT (phone) ON public.listings FROM anon;
REVOKE SELECT (phone) ON public.listings FROM public;
