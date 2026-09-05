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


/* ============================================================
   WhatsApp auto-notify (CallMeBot) — optional
   1) Save this number in your phone: +34 621 97 82 48
   2) Send it this text: I allow callmebot to send me messages
   3) You receive an API key — paste it below
   4) Your WhatsApp number must be in Contact Info (dashboard)
   Docs: https://www.callmebot.com/blog/free-api-whatsapp-messages/
============================================================ */
const WHATSAPP_CALLMEBOT_APIKEY = "";
