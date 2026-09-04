-- ============================================================
-- AI CHAT — Supabase schema
-- Run this entire file in the Supabase SQL Editor.
-- ============================================================

-- 1) Settings (one row — singleton)
create table if not exists public.ai_chat_settings (
  id uuid primary key default gen_random_uuid(),
  is_enabled boolean not null default true,
  assistant_name jsonb not null default '{"en":"Mohamed Abdo","fr":"Mohamed Abdo","ar":"محمد عبدو"}'::jsonb,
  status_text jsonb not null default '{"en":"Online · AI Assistant","fr":"En ligne · Assistant IA","ar":"متصل · مساعد ذكي"}'::jsonb,
  placeholder jsonb not null default '{"en":"Ask me anything about the site…","fr":"Posez-moi n’importe quelle question…","ar":"اسألني عن أي شيء يخص الموقع…"}'::jsonb,
  greeting jsonb not null default '{"en":"Hello! I''m Mohamed Abdo, the developer. Ask me anything — projects, services, tech stack, availability, or how we can work together.","fr":"Bonjour ! Je suis Mohamed Abdo, le développeur. Posez toutes vos questions — projets, services, stack technique, disponibilité…","ar":"مرحباً! أنا المطور محمد عبدو. اسأل عن أي شيء — المشاريع، الخدمات، التقنيات، التوفر، أو كيف نبدأ معاً."}'::jsonb,
  fallback jsonb not null default '{"en":"I can help with anything related to this portfolio: projects, services, Flutter, real-time systems, tech stack, pricing, contact, or availability.","fr":"Je peux vous aider sur tout ce qui concerne ce portfolio : projets, services, Flutter, dashboards, stack, budget, contact…","ar":"يمكنني المساعدة في كل ما يخص هذا الموقع: المشاريع، الخدمات، Flutter، اللوحات الحية، التقنيات، الأسعار، التواصل أو التوفر."}'::jsonb,
  cleared_message jsonb not null default '{"en":"Chat cleared. How can I help you?","fr":"Conversation effacée. Comment puis-je vous aider ?","ar":"تم مسح المحادثة. كيف يمكنني مساعدتك؟"}'::jsonb,
  thinking_text jsonb not null default '{"en":"Thinking…","fr":"Réflexion…","ar":"جاري التفكير…"}'::jsonb,
  -- suggestions stored as JSON arrays per language
  suggestions jsonb not null default '{"en":["What services do you offer?","Tell me about Cisterna","How can I contact you?","What technologies do you use?","Are you available for hire?"],"fr":["Quels services offrez-vous ?","Parlez-moi de Cisterna","Comment vous contacter ?","Quelles technologies utilisez-vous ?","Êtes-vous disponible ?"],"ar":["ما هي خدماتك؟","أخبرني عن Cisterna","كيف أتواصل معك؟","ما التقنيات التي تستخدمها؟","هل أنت متاح للعمل؟"]}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Ensure at least one settings row exists
insert into public.ai_chat_settings (id)
select gen_random_uuid()
where not exists (select 1 from public.ai_chat_settings);

-- 2) Intents / Knowledge base (many rows)
create table if not exists public.ai_chat_intents (
  id uuid primary key default gen_random_uuid(),
  title text not null,                          -- internal label shown in admin (e.g. "Services")
  keywords text not null default '',            -- comma or newline separated keywords (any language)
  reply_en text not null default '',
  reply_fr text not null default '',
  reply_ar text not null default '',
  match_mode text not null default 'contains'   -- contains | any_word
    check (match_mode in ('contains', 'any_word')),
  priority int not null default 0,              -- higher = checked first
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists ai_chat_intents_active_idx
  on public.ai_chat_intents (is_active, priority desc, sort_order);

-- 3) RLS
alter table public.ai_chat_settings enable row level security;
alter table public.ai_chat_intents enable row level security;

-- Public (anon) can READ settings + active intents (needed by the portfolio site)
drop policy if exists "ai_chat_settings_public_read" on public.ai_chat_settings;
create policy "ai_chat_settings_public_read"
  on public.ai_chat_settings for select
  to anon, authenticated
  using (true);

drop policy if exists "ai_chat_intents_public_read" on public.ai_chat_intents;
create policy "ai_chat_intents_public_read"
  on public.ai_chat_intents for select
  to anon, authenticated
  using (is_active = true);

-- Authenticated editors/admins can do everything
drop policy if exists "ai_chat_settings_editor_all" on public.ai_chat_settings;
create policy "ai_chat_settings_editor_all"
  on public.ai_chat_settings for all
  to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.is_active = true
        and p.role in ('editor', 'admin')
    )
  )
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.is_active = true
        and p.role in ('editor', 'admin')
    )
  );

drop policy if exists "ai_chat_intents_editor_all" on public.ai_chat_intents;
create policy "ai_chat_intents_editor_all"
  on public.ai_chat_intents for all
  to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.is_active = true
        and p.role in ('editor', 'admin')
    )
  )
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.is_active = true
        and p.role in ('editor', 'admin')
    )
  );

-- Editors also need to see inactive intents in the dashboard
drop policy if exists "ai_chat_intents_editor_read_all" on public.ai_chat_intents;
create policy "ai_chat_intents_editor_read_all"
  on public.ai_chat_intents for select
  to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.is_active = true
        and p.role in ('editor', 'admin')
    )
  );

-- 4) Optional seed intents (you can delete/edit them from the admin later)
insert into public.ai_chat_intents (title, keywords, reply_en, reply_fr, reply_ar, priority, sort_order)
select * from (values
  (
    'Greetings',
    'hi, hello, hey, salam, مرحبا, السلام, أهلا, اهلا, هاي, هلا, bonjour, salut, coucou, bonsoir',
    'Hello! I''m Mohamed Abdo, the developer. Ask me anything — projects, services, tech stack, availability, or how we can work together.',
    'Bonjour ! Je suis Mohamed Abdo, le développeur. Posez toutes vos questions — projets, services, stack technique, disponibilité…',
    'مرحباً! أنا المطور محمد عبدو. اسأل عن أي شيء — المشاريع، الخدمات، التقنيات، التوفر، أو كيف نبدأ معاً.',
    100, 0
  ),
  (
    'Services',
    'service, services, خدمات, ماذا تقدم, ما تقدم, وش تسوي, what do you offer, what do you do, quels services, offrez, prestations',
    'I offer end-to-end services from idea to launch & maintenance:
• Mobile apps (Flutter / Android / iOS)
• Real-time dashboards & live systems
• Websites & admin panels
• APIs & third-party integrations
• App Store / Play Store publishing + DevOps
Tell me about your idea and I''ll suggest the right approach.',
    'Je propose des services complets de l''idée jusqu''au lancement :
• Apps mobiles (Flutter / Android / iOS)
• Tableaux de bord & systèmes temps réel
• Sites web & back-offices
• APIs & intégrations
• Publication stores + DevOps
Décrivez votre idée, je vous proposerai l''approche adaptée.',
    'أقدم خدمات متكاملة من الفكرة حتى الإطلاق والصيانة:
• تطبيقات موبايل (Flutter / Android / iOS)
• لوحات تحكم وأنظمة حية
• مواقع ويب ولوحات إدارة
• APIs وتكاملات
• نشر على المتاجر + DevOps
صف لي فكرتك وسأقترح أفضل نهج.',
    90, 1
  ),
  (
    'Projects',
    'project, projects, projet, projets, مشروع, مشاريع, أعمالك, portfolio, show me, أظهر, montrez',
    'Featured projects:
• Cisterna — water tanker delivery (customer + driver apps + live admin)
• ShopHub — full e-commerce
• Analytics Dashboard — live BI
• Chatify — real-time messaging
Browse the Projects section on this site for more.',
    'Projets phares :
• Cisterna — livraison de citernes d''eau (app client, chauffeur, dashboard live)
• ShopHub — e-commerce complet
• Analytics Dashboard — BI temps réel
• Chatify — messagerie temps réel
Explorez la section Projets du site.',
    'من أبرز مشاريعي:
• Cisterna — منصة توصيل صهاريج مياه
• ShopHub — متجر إلكتروني كامل
• Analytics Dashboard — لوحة ذكاء أعمال حية
• Chatify — تطبيق مراسلة فورية
تصفح قسم المشاريع في الموقع.',
    90, 2
  ),
  (
    'Contact',
    'contact, تواصل, اتصل, whatsapp, واتساب, email, mail, بريد, رقم, phone, joindre, how to reach, كيف أتواصل',
    'You can reach me via:
• WhatsApp (button in the top navigation)
• Email in the Contact section / footer
• Or the contact form on the site
I usually reply quickly. Currently available for new work.',
    'Vous pouvez me joindre via :
• WhatsApp (bouton en haut du site)
• Email dans Contact / pied de page
• Ou le formulaire de contact
Je réponds rapidement. Disponible pour de nouveaux projets.',
    'يمكنك التواصل معي عبر:
• واتساب (الزر في أعلى الموقع)
• البريد من قسم Contact أو التذييل
• أو نموذج التواصل
أرد بسرعة. أنا متاح لمشاريع جديدة.',
    85, 3
  ),
  (
    'Availability / Pricing',
    'available, hire, work with, متاح, توظيف, تعاون, disponible, prix, price, cost, سعر, budget, devis, how much, كم يكلف',
    'Yes — I''m currently available for new projects.
Pricing depends on scope, timeline and tech.
Share a short description of your idea and I can give a rough estimate or set up a short call.',
    'Oui, je suis disponible pour de nouveaux projets.
Le budget dépend du scope, du délai et des technologies.
Décrivez brièvement votre idée et je pourrai vous donner une estimation ou planifier un appel.',
    'نعم، أنا متاح حالياً لمشاريع جديدة.
التكلفة تعتمد على النطاق والمدة والتقنيات.
صف لي فكرتك باختصار وسأعطيك تقديراً أولياً أو نحدد مكالمة.',
    85, 4
  ),
  (
    'Tech Stack',
    'tech, stack, technologie, تقنية, تقنيات, لغات, tools, framework, flutter, firebase, node, what do you use, بماذا تعمل',
    'Core stack:
• Mobile: Flutter / Dart
• Backend & Web: JavaScript, Node.js, PHP, React, Vue
• BaaS: Firebase
• Databases: MySQL, PostgreSQL, MongoDB
• Others: Docker, Git, CI/CD
I pick the tech based on product needs.',
    'Stack principale :
• Mobile : Flutter / Dart
• Backend & Web : JavaScript, Node.js, PHP, React, Vue
• BaaS : Firebase
• Bases de données : MySQL, PostgreSQL, MongoDB
• Autres : Docker, Git, CI/CD
Je choisis la techno selon le besoin du projet.',
    'التقنيات الأساسية:
• Mobile: Flutter / Dart
• Backend & Web: JavaScript, Node.js, PHP, React, Vue
• BaaS: Firebase
• قواعد بيانات: MySQL, PostgreSQL, MongoDB
• أخرى: Docker, Git, CI/CD
أختار التقنية حسب احتياج المشروع.',
    80, 5
  )
) as v(title, keywords, reply_en, reply_fr, reply_ar, priority, sort_order)
where not exists (select 1 from public.ai_chat_intents limit 1);

-- Done.
-- After running this:
-- 1. Open the Admin dashboard → you will see "AI Chat Settings" and "AI Chat Intents"
-- 2. Edit anything — the portfolio site will load it automatically.
