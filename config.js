/* ============================================================
   SUPABASE CONNECTION CONFIG
   Public, client-safe values only. The anon/publishable key is
   safe to expose here — it only ever acts through the RLS
   policies defined in the SQL schema (public read on published
   content, insert-only on contact_messages, etc.).

   NEVER put the service_role / secret key in this file or any
   other file that ships to the browser.
============================================================ */

const SUPABASE_URL = "https://kmnpmcsrzcuzlpcdfrvc.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_DRWizJD7cm1aZSCWIBtD-g_lW6hR4qj";
