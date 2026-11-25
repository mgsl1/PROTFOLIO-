/* ============================================================
   LOCAL PROJECTS DATA  (no backend needed)
   ------------------------------------------------------------
   Every project lives here, in 3 languages (ar / fr / en).
   To add a project: copy one object, change the id, texts,
   images, likes_count (use 1200 → 1600) and add it to the array.

   Fields used by the site:
   title, short_description, full_description, problem, solution,
   year, technologies[], demo_url (optional), likes_count,
   cover_image_url, gallery[], categories[], features{ar,fr,en}
============================================================ */

const LOCAL_CATEGORIES = [
  { id: "cat-mobile",    slug: "mobile",    is_visible: true, name: { ar: "تطبيقات الجوال", fr: "Applications mobiles", en: "Mobile Apps" } },
  { id: "cat-dashboard", slug: "dashboard", is_visible: true, name: { ar: "لوحات التحكم",   fr: "Tableaux de bord",     en: "Dashboards" } },
  { id: "cat-ecommerce", slug: "ecommerce", is_visible: true, name: { ar: "المتاجر الإلكترونية", fr: "E-commerce",           en: "E-commerce" } },
  { id: "cat-website",   slug: "website",   is_visible: true, name: { ar: "مواقع الويب",     fr: "Sites web",            en: "Websites" } },
];

const LOCAL_PROJECTS = [
  {
      "id": "nova-pass-card",
      "featured": false,
      "year": "2026",
      "badge": {
          "ar": "موقع تعريفي",
          "fr": "Site vitrine",
          "en": "Showcase Website"
      },
      "likes_count": 1410,
      "demo_url": "",
      "categories": [
          "website"
      ],
      "technologies": [
          "Responsive Web",
          "Bilingual AR/FR",
          "RTL",
          "Dark Mode",
          "UI/UX",
          "WhatsApp / Email Order"
      ],
      "title": {
          "ar": "NOVA PASS — موقع تعريفي ثنائي اللغة لبطاقة صحة وامتيازات ذكية",
          "fr": "NOVA PASS — Site vitrine bilingue pour une carte santé & avantages",
          "en": "NOVA PASS — Bilingual Showcase Website for a Health & Benefits Card"
      },
      "short_description": {
          "ar": "موقع تعريفي بالعربية والفرنسية لبطاقة ذكية تجمع الملف الطبي الشخصي وتخفيضات لدى الشركاء، مع نمط فاتح وداكن وطلب البطاقة برسالة جاهزة.",
          "fr": "Site vitrine en arabe et en français pour une carte intelligente réunissant dossier médical personnel et remises chez les partenaires, avec thèmes clair/sombre et demande de carte en un message.",
          "en": "An Arabic/French showcase website for a smart card combining a personal medical file and partner discounts, with light/dark themes and a ready-made card request message."
      },
      "full_description": {
          "ar": "NOVA PASS موقع تعريفي ثنائي اللغة (العربية مع اتجاه كامل من اليمين إلى اليسار، والفرنسية) يشرح بطاقة ذكية تجمع الرعاية الصحية والامتيازات في بطاقة واحدة: ملف طبي شخصي (فصيلة الدم، الحساسية، العلاجات وجهات اتصال الطوارئ) وتخفيضات لدى عيادات ومؤسسات ومرافق ترفيهية وشركاء. تبدأ الصفحة الرئيسية بواجهة قوية بديكور جزائري مألوف وبطاقة بارزة وزر دعوة واضح، يليها قسم الامتيازات والعروض (ثلاث صيغ) ثم نموذج طلب من أربع خطوات يولّد رسالة جاهزة تُرسل عبر واتساب أو البريد الإلكتروني أو تُنسخ. يدعم الموقع النمطين الفاتح والداكن وزر تبديل اللغة، ويتكيّف مع الهاتف بقائمة برجر، ويضم أسئلة شائعة وقسم تواصل وتذييلاً بالمعلومات القانونية.",
          "fr": "NOVA PASS est un site vitrine bilingue (arabe en lecture droite-à-gauche native, et français) qui présente une carte intelligente réunissant santé et avantages : un dossier médical personnel (groupe sanguin, allergies, traitements, contacts d'urgence) et des remises chez des cliniques, institutions, lieux de loisirs et partenaires. La page d'accueil s'ouvre sur un hero rassurant dans un décor algérien reconnaissable, avec la carte mise en avant et un appel à l'action clair, suivi des avantages, de trois offres au choix et d'un parcours de demande en quatre étapes qui génère un message prêt à envoyer par WhatsApp, par e-mail ou à copier. Le site propose les thèmes clair et sombre, un bouton de changement de langue, une version mobile avec menu burger, une FAQ, une section contact et un pied de page avec les mentions légales.",
          "en": "NOVA PASS is a bilingual showcase website (Arabic with fully native right-to-left layout, and French) presenting a smart card that brings healthcare and perks together: a personal medical file (blood group, allergies, treatments, emergency contacts) and discounts at clinics, institutions, leisure venues and partners. The homepage opens with a reassuring hero in a recognizable Algerian setting, the card front and centre and a clear call to action, followed by the benefits, three offers to choose from, and a four-step request flow that generates a ready-to-send message via WhatsApp, email or copy. The site supports light and dark themes, a language switch, a mobile layout with a burger menu, an FAQ, a contact section and a footer with legal information."
      },
      "problem": {
          "ar": "يصعب على الزائر أن يفهم في ثوانٍ ما تقدمه بطاقة ذكية تجمع الصحة والتخفيضات، وكيف يحصل عليها دون إجراءات معقدة.",
          "fr": "Un visiteur a du mal à comprendre en quelques secondes ce qu'apporte une carte réunissant santé et remises, et comment l'obtenir sans démarches compliquées.",
          "en": "Visitors struggle to grasp in a few seconds what a card combining health and discounts offers, and how to get one without complicated steps."
      },
      "solution": {
          "ar": "موقع واضح بلغتين ونمطين يشرح العرض في أقسام قليلة، ويحوّل الطلب إلى رسالة جاهزة في أربع خطوات عبر واتساب أو البريد.",
          "fr": "Un site clair en deux langues et deux thèmes qui explique l'offre en quelques sections et transforme la demande en message prêt à envoyer en quatre étapes, par WhatsApp ou e-mail.",
          "en": "A clear site in two languages and two themes that explains the offer in a few sections and turns the request into a ready-to-send message in four steps, via WhatsApp or email."
      },
      "features": {
          "ar": [
              "واجهة رئيسية قوية بديكور جزائري وبطاقة بارزة",
              "دعم كامل للعربية (RTL) والفرنسية بزر تبديل",
              "نمط فاتح ونمط داكن",
              "قسم الامتيازات: تخفيضات الشركاء والملف الطبي الشخصي",
              "ثلاث صيغ عروض للاختيار",
              "نموذج طلب من أربع خطوات يولّد رسالة جاهزة",
              "إرسال الطلب عبر واتساب أو البريد أو النسخ",
              "نسخة متجاوبة للهاتف بقائمة برجر",
              "أسئلة شائعة وقسم تواصل ومعلومات قانونية"
          ],
          "fr": [
              "Hero marquant dans un décor algérien avec la carte en vedette",
              "Arabe (RTL natif) et français avec bouton de langue",
              "Thèmes clair et sombre",
              "Section avantages : remises partenaires et dossier médical personnel",
              "Trois offres au choix",
              "Formulaire en 4 étapes générant un message prêt à envoyer",
              "Envoi par WhatsApp, e-mail ou copie du message",
              "Version mobile responsive avec menu burger",
              "FAQ, section contact et mentions légales"
          ],
          "en": [
              "Strong hero in an Algerian setting with the card front and centre",
              "Arabic (native RTL) and French with a language switch",
              "Light and dark themes",
              "Benefits section: partner discounts and personal medical file",
              "Three offers to choose from",
              "Four-step request form generating a ready-to-send message",
              "Send via WhatsApp, email or copy the message",
              "Responsive mobile layout with a burger menu",
              "FAQ, contact section and legal information"
          ]
      },
      "cover_image_url": "assets/projects/nova-pass/cover.webp",
      "thumbnail_url": "assets/projects/nova-pass/cover.webp",
      "gallery": [
          "assets/projects/nova-pass/cover.webp",
          "assets/projects/nova-pass/home.webp",
          "assets/projects/nova-pass/benefits.webp",
          "assets/projects/nova-pass/order.webp",
          "assets/projects/nova-pass/mobile.webp",
          "assets/projects/nova-pass/lang-theme.webp",
          "assets/projects/nova-pass/steps.webp",
          "assets/projects/nova-pass/contact.webp",
          "assets/projects/nova-pass/summary.webp"
      ]
  },
  {
      "id": "haqqona-legal-app",
      "featured": false,
      "year": "2026",
      "badge": {
          "ar": "فكرة محمية ومسجلة",
          "fr": "Idée protégée et déposée",
          "en": "Protected & Registered Idea"
      },
      "likes_count": 1370,
      "demo_url": "",
      "categories": [
          "mobile"
      ],
      "technologies": [
          "Mobile App",
          "UI/UX Design",
          "Branding",
          "Dark Mode"
      ],
      "title": {
          "ar": "حقّ لنا — تصميم تطبيق جوال (الفكرة محمية ومسجلة)",
          "fr": "Haqqona (حقّ لنا) — Design d'application mobile (idée protégée et déposée)",
          "en": "Haqqona (حقّ لنا) — Mobile App Design (Protected & Registered Idea)"
      },
      "short_description": {
          "ar": "تصميم هوية وواجهات تطبيق جوال بطابع جزائري، بنمطين فاتح وداكن. فكرة المشروع محمية ومسجلة، وتفاصيلها غير معروضة.",
          "fr": "Identité visuelle et interfaces d'une application mobile au caractère algérien, en thèmes clair et sombre. L'idée du projet est protégée et déposée ; ses détails ne sont pas publiés.",
          "en": "Brand identity and interface design for a mobile app with an Algerian character, in light and dark themes. The project idea is protected and registered; its details are not disclosed."
      },
      "full_description": {
          "ar": "«حقّ لنا» مشروع تطبيق جوال قمتُ بتصميم هويته البصرية وواجهاته، بألوان مستوحاة من الهوية الوطنية بلمسات ذهبية وخط واضح ومساحات هادئة، ويدعم النمطين الفاتح والداكن. فكرة المشروع محمية ومسجلة، ولذلك لا يُعرض هنا شرح تفصيلي لها أو لآلية عملها، وتقتصر هذه الصفحة على عرض الجانب التصميمي.",
          "fr": "« Haqqona » (حقّ لنا) est un projet d'application mobile dont j'ai conçu l'identité visuelle et les interfaces, avec des couleurs inspirées de l'identité nationale, des touches dorées, une typographie claire et des espaces apaisés, en thèmes clair et sombre. L'idée du projet est protégée et déposée : aucune explication détaillée de son concept ni de son fonctionnement n'est donnée ici, cette page se limite à présenter le volet design.",
          "en": "“Haqqona” (حقّ لنا) is a mobile app project for which I designed the visual identity and interfaces, using colors inspired by the national identity with golden accents, a clear typeface and calm spacing, in both light and dark themes. The project idea is protected and registered, so no detailed explanation of the concept or how it works is provided here; this page only presents the design side."
      },
      "cover_image_url": "assets/projects/haqqona/cover.webp",
      "thumbnail_url": "assets/projects/haqqona/cover.webp",
      "gallery": [
          "assets/projects/haqqona/cover.webp",
          "assets/projects/haqqona/onboarding.webp",
          "assets/projects/haqqona/home.webp",
          "assets/projects/haqqona/library.webp",
          "assets/projects/haqqona/settings.webp",
          "assets/projects/haqqona/identity.webp"
      ]
  },
  {
    id: "acmm-medical-space",
    featured: true,
    year: "2026",
    badge: { ar: "منصة طبية", fr: "Plateforme médicale", en: "Medical Platform" },
    likes_count: 1480,                       // shown as 1.5K
    demo_url: "",                            // ← ضع رابط التجربة هنا إن وجد
    categories: ["mobile", "dashboard"],
    technologies: ["Flutter", "Dart", "Supabase", "PostgreSQL", "Web Dashboard", "QR Code"],

    title: {
      ar: "ACMM — الفضاء الطبي للجمعية الولائية للسلك الطبي",
      fr: "ACMM — Espace médical de l'Association de Magra",
      en: "ACMM — Medical Space for the Magra Medical Association",
    },
    short_description: {
      ar: "تطبيق جوال ولوحة تحكم ويب لجمعية طبية بمقرة: عضوية، مؤتمرات بتذاكر QR، تكوينات، جلسات مباشرة وشهادات.",
      fr: "Application mobile et tableau de bord web pour une association médicale à Magra : adhésion, congrès avec tickets QR, formations, séances en direct et certificats.",
      en: "Mobile app and web dashboard for a medical association in Magra: membership, QR-ticket congresses, trainings, live sessions and certificates.",
    },
    full_description: {
      ar: "ACMM هو الفضاء الرقمي الشامل للجمعية الولائية للسلك الطبي بمقرة (شعارها: التكوّن · التشارك · التقدّم). يتكوّن من تطبيق جوال للأطباء والأعضاء ولوحة تحكم ويب للإدارة. يتيح التطبيق التسجيل وإدارة العضوية والاشتراك السنوي مع بطاقة عضو رقمية، والتسجيل في المؤتمرات والأيام الطبية مع الدفع وتذكرة QR، وحضور الجلسات المباشرة، ومتابعة التكوينات الطبية بالفيديو مع نسبة التقدّم، والحصول على شهادات المشاركة والتقدير، إضافةً إلى مجتمع وأخبار الجمعية. أما لوحة التحكم فتمنح الإدارة رؤية فورية للأعضاء والطلبات والفعاليات والتكوينات، مع نشر اللافتات والإعلانات ومسح التذاكر عند المدخل.",
      fr: "ACMM est l'espace numérique complet de l'Association médicale de Magra (devise : Se former · Partager · Progresser). Il se compose d'une application mobile pour les médecins et membres, et d'un tableau de bord web pour l'administration. L'application permet de créer un compte, gérer l'adhésion et l'abonnement annuel avec une carte de membre numérique, s'inscrire aux congrès et journées médicales avec paiement et ticket QR, suivre des séances en direct, apprendre via des formations vidéo avec suivi de progression, obtenir des certificats de participation, et échanger avec la communauté. Le tableau de bord offre à l'équipe une vue en temps réel des membres, demandes, événements et formations, la publication de bannières et d'annonces, et le scan des billets à l'entrée.",
      en: "ACMM is the complete digital space of the Magra Medical Association (motto: Learn · Share · Progress). It consists of a mobile app for doctors and members and a web dashboard for administrators. The app lets users sign up, manage their membership and annual subscription with a digital member card, register for congresses and medical days with payment and a QR ticket, join live sessions, follow video-based medical trainings with progress tracking, earn participation certificates, and engage with the community and association news. The dashboard gives the team a real-time view of members, requests, events and trainings, lets them publish banners and announcements, and scan tickets at the entrance.",
    },
    problem: {
      ar: "كانت الجمعية تدير الأعضاء والاشتراكات والفعاليات والشهادات بطرق متفرقة وورقية: تسجيل يدوي، دفع غير موثّق، دخول للمؤتمرات دون تحقق سريع، وصعوبة في إبلاغ الأطباء بالتكوينات والأخبار الجديدة وإصدار الشهادات.",
      fr: "L'association gérait membres, cotisations, événements et certificats de manière dispersée et papier : inscriptions manuelles, paiements peu traçables, contrôle d'accès lent aux congrès, et difficulté à informer les médecins des formations et actualités ou à délivrer les certificats.",
      en: "The association handled members, dues, events and certificates through scattered, paper-based processes: manual registrations, poorly tracked payments, slow access control at congresses, and difficulty informing doctors about trainings and news or issuing certificates.",
    },
    solution: {
      ar: "منصة موحّدة: بطاقة عضو رقمية واشتراك سنوي، تسجيل ودفع وتذكرة QR لكل فعالية يتحقق منها المنظّمون بالكاميرا أو بإدخال الرمز، تكوينات فيديو بتتبّع التقدّم وشهادات تُولَّد تلقائياً، جلسات مباشرة، وإشعارات وإعلانات ولافتات تُنشر من لوحة التحكم وتظهر فوراً في التطبيق.",
      fr: "Une plateforme unifiée : carte de membre numérique et abonnement annuel, inscription, paiement et ticket QR par événement vérifié à l'entrée par caméra ou saisie du code, formations vidéo avec suivi de progression et certificats générés automatiquement, séances en direct, et notifications, annonces et bannières publiées depuis le tableau de bord et visibles instantanément dans l'application.",
      en: "A unified platform: digital member card and annual subscription, registration, payment and a QR ticket for every event verified at the door by camera or code entry, video trainings with progress tracking and automatically issued certificates, live sessions, and notifications, announcements and banners published from the dashboard and shown instantly in the app.",
    },
    features: {
      ar: [
        "حساب عضو آمن مع تسجيل دخول ووضع فاتح/داكن",
        "عضوية واشتراك سنوي مع بطاقة عضو رقمية وسجلّ الاشتراكات",
        "مؤتمرات وأيام طبية: البرنامج والمحاضرون والرعاة والتسجيل بنقرة",
        "دفع مؤكَّد وتذكرة QR مع رمز تذكرة (AC-XXXXXX) وشهادة مشاركة",
        "جلسات مباشرة (ويبينار وحالات سريرية) مع عدّاد تنازلي",
        "تكوينات طبية بالفيديو مع تتبّع التقدّم وشهادات تقدير",
        "تحليلات شخصية: التقدّم العام والشهادات والمشاركات",
        "مجتمع وأخبار مع إعجابات وتعليقات",
        "لوحة تحكم ويب: إحصائيات فورية وإدارة الأعضاء والفعاليات والتكوينات",
        "ماسح تذاكر بالكاميرا أو إدخال يدوي للرمز، ونشر اللافتات والإعلانات",
      ],
      fr: [
        "Compte membre sécurisé, mode clair/sombre",
        "Adhésion et abonnement annuel avec carte de membre numérique et historique",
        "Congrès et journées médicales : programme, intervenants, sponsors, inscription en un clic",
        "Paiement confirmé, ticket QR avec code (AC-XXXXXX) et certificat de participation",
        "Séances en direct (webinaires, cas cliniques) avec compte à rebours",
        "Formations médicales vidéo avec suivi de progression et attestations",
        "Analyses personnelles : progression globale, attestations, participations",
        "Communauté et actualités avec réactions et commentaires",
        "Tableau de bord web : statistiques en temps réel, gestion des membres, événements et formations",
        "Scanner de billets par caméra ou saisie manuelle, publication de bannières et annonces",
      ],
      en: [
        "Secure member account with light/dark mode",
        "Membership and annual subscription with a digital member card and history",
        "Congresses and medical days: program, speakers, sponsors, one-tap registration",
        "Confirmed payment, QR ticket with code (AC-XXXXXX) and participation certificate",
        "Live sessions (webinars, clinical cases) with a countdown",
        "Video medical trainings with progress tracking and certificates",
        "Personal analytics: overall progress, certificates, participations",
        "Community and news with reactions and comments",
        "Web dashboard: real-time stats, member, event and training management",
        "Ticket scanner via camera or manual code entry, banner and announcement publishing",
      ],
    },

    cover_image_url: "assets/projects/acmm/cover.webp",
    thumbnail_url:   "assets/projects/acmm/cover.webp",
    gallery: [
      "assets/projects/acmm/cover.webp",
      "assets/projects/acmm/login.webp",
      "assets/projects/acmm/home.webp",
      "assets/projects/acmm/events.webp",
      "assets/projects/acmm/participation.webp",
      "assets/projects/acmm/membership.webp",
      "assets/projects/acmm/live.webp",
      "assets/projects/acmm/trainings.webp",
      "assets/projects/acmm/analytics.webp",
      "assets/projects/acmm/community.webp",
      "assets/projects/acmm/profile.webp",
      "assets/projects/acmm/dash-overview.webp",
      "assets/projects/acmm/dash-scan.webp",
      "assets/projects/acmm/dash-banners.webp",
    ],
  },
  {
      "id": "aurafem-pcos",
      "featured": false,
      "year": "2026",
      "badge": {
          "ar": "منصة صحية متكاملة",
          "fr": "Plateforme de santé",
          "en": "Health Platform"
      },
      "likes_count": 1520,
      "demo_url": "",
      "categories": [
          "mobile",
          "dashboard"
      ],
      "technologies": [
          "Mobile App",
          "Web Dashboard",
          "Supabase",
          "PostgreSQL",
          "QR Code",
          "Dark / Light Theme",
          "Multi-palette",
          "Subscriptions"
      ],
      "title": {
          "ar": "AuraFem — منصة متابعة الصحة الهرمونية للنساء (متلازمة تكيس المبايض)",
          "fr": "AuraFem — Plateforme de suivi de la santé hormonale des femmes (SOPK)",
          "en": "AuraFem — Women's Hormonal Health Platform (PCOS)"
      },
      "short_description": {
          "ar": "3 منصات في مشروع واحد: تطبيق جوال للمريضة، فضاء ويب للطبيبة، ومركز إدارة للمنصة — متابعة الدورة والأعراض ومدى الالتزام بالعلاج، مراسلة مباشرة، اشتراكات ومتجر ومشاركة مجهولة في البحث العلمي.",
          "fr": "3 plateformes en un projet : application mobile patiente, espace web médecin et centre d'administration — suivi du cycle, des symptômes et de l'observance, messagerie directe, abonnements, boutique et participation anonyme à la recherche.",
          "en": "Three platforms in one project: a patient mobile app, a doctor web workspace and an admin center — cycle, symptom and adherence tracking, live messaging, subscriptions, a shop and anonymous research participation."
      },
      "full_description": {
          "ar": "AuraFem مشروع متكامل لمتابعة الصحة الهرمونية للنساء المصابات بمتلازمة تكيس المبايض (SOPK)، يضم 20 شاشة على 3 منصات. تطبيق المريضة يعرض الصفحة الرئيسية بمرحلة الدورة واليوم الحالي منها وبانرات المنصة وبطاقة «مأخوذ اليوم» للكبسولات مع نسبة الالتزام، وصفحة متابعة يومية في دقيقة واحدة (الحالة المزاجية والأعراض والوزن والملاحظات). ويمكن للمريضة ربط حسابها بطبيبتها عبر مسح رمز QR أو إدخال كود الطبيبة، ثم مراسلتها مباشرة، وتحديد وقت التذكير والإشعارات. كما يعرض التطبيق العرض النشط وتفاصيله وسعره بالدينار الجزائري ومزاياه، ومتجراً للمنتجات بالتقييمات والطلبات، وشاشة بحث علمي بمشاركة مجهولة الهوية مع شفافية كاملة حول البيانات المشاركة. أما فضاء الطبيبة على الويب فيبدأ بتسجيل دخول آمن ثم لوحة تضم عدد المريضات والمواعيد والملفات والتنبيهات المهمة وتحليلات وتقويماً شهرياً، وصفحة «مريضاتي» برمز QR وكود ربط قابل للنسخ والطباعة وجدول بنسبة التزام كل مريضة، ومتابعة هرمونية وتغذية ومواعيد وتقارير طبية، ومحادثات فورية مع المريضات، وصفحة التزام تلخص آخر 30 يوماً. وتتيح الإعدادات وضعاً فاتحاً أو داكناً أو تلقائياً مع سبع لوحات ألوان. ويتحكم مركز الإدارة في كل المنصة: نظرة عامة بالأرقام، بانرات وإعلانات، اشتراكات وعروض (السعر والمدة وحصة الأطباء والمزايا)، منتجات برموز QR، محتوى وبرامج متابعة لكل منتج، وأكواد تفعيل مجانية مع تتبع الاستخدام والإلغاء وتصدير CSV، ومتزامن مع Supabase.",
          "fr": "AuraFem est un projet complet de suivi de la santé hormonale des femmes atteintes du syndrome des ovaires polykystiques (SOPK), avec 20 écrans sur 3 plateformes. L'application patiente affiche la phase du cycle et le jour en cours, les bannières de la plateforme et la carte « Ma prise du jour » avec le taux d'observance, ainsi qu'une page de suivi quotidien en une minute (humeur, symptômes, poids, notes). La patiente peut se lier à sa médecin en scannant un QR code ou en saisissant son code, lui écrire directement, et régler l'heure du rappel et les notifications. L'application présente aussi l'offre active avec ses détails, son prix en dinars algériens et ses avantages, une boutique avec avis et commandes, et un écran de recherche scientifique à participation anonyme, avec transparence totale sur les données partagées. L'espace web du médecin commence par une connexion sécurisée, puis un tableau de bord avec patientes, rendez-vous, dossiers, alertes importantes, analytics et calendrier mensuel ; une page « Mes patientes » avec QR code et code de liaison à copier ou imprimer et le taux d'observance de chaque patiente ; suivi hormonal, nutrition, rendez-vous et rapports médicaux ; messagerie en temps réel ; et une page d'observance résumant les 30 derniers jours. Les paramètres offrent un mode clair, sombre ou automatique et sept palettes de couleurs. Le centre d'administration pilote toute la plateforme : vue d'ensemble chiffrée, bannières et annonces, abonnements et offres (prix, durée, quota de médecins, avantages), produits avec codes QR, contenus et programmes de suivi par produit, et codes d'activation gratuits avec suivi des usages, annulation et export CSV, synchronisés avec Supabase.",
          "en": "AuraFem is a complete platform for tracking the hormonal health of women with polycystic ovary syndrome (PCOS), with 20 screens across 3 platforms. The patient app shows the current cycle phase and day, platform banners and a “Today's intake” card for capsules with an adherence rate, plus a one-minute daily tracking page (mood, symptoms, weight, notes). Patients can link to their doctor by scanning a QR code or entering the doctor's code, message her directly, and set the reminder time and notifications. The app also shows the active offer with its details, price in Algerian dinars and benefits, a shop with reviews and orders, and a scientific research screen with anonymous participation and full transparency about the data shared. The doctor's web workspace starts with a secure sign-in, then a dashboard with patients, appointments, records, important alerts, analytics and a monthly calendar; a “My patients” page with a QR code and a linking code to copy or print and each patient's adherence rate; hormonal tracking, nutrition, appointments and medical reports; real-time messaging; and an adherence page summarising the last 30 days. Settings offer light, dark or automatic mode and seven color palettes. The admin center runs the whole platform: a numeric overview, banners and announcements, subscriptions and offers (price, duration, doctor quota, benefits), products with QR codes, content and tracking programs per product, and free activation codes with usage tracking, cancellation and CSV export, synchronized with Supabase."
      },
      "problem": {
          "ar": "متابعة متلازمة تكيس المبايض تتطلب التزاماً يومياً بالعلاج وتسجيلاً للأعراض، بينما تفتقر الطبيبة إلى رؤية واضحة لما يحدث بين الموعدين، ويصعب على المنصة إدارة المنتجات والعروض والمستخدمات في مكان واحد.",
          "fr": "Le suivi du SOPK exige une prise quotidienne du traitement et un suivi des symptômes, alors que la médecin manque de visibilité entre deux rendez-vous et que la plateforme peine à gérer produits, offres et utilisatrices au même endroit.",
          "en": "Managing PCOS requires daily treatment adherence and symptom logging, yet doctors have little visibility between appointments and the platform struggles to manage products, offers and users in one place."
      },
      "solution": {
          "ar": "منظومة من ثلاث واجهات مترابطة: تطبيق يجعل التسجيل اليومي في دقيقة، وفضاء للطبيبة يربط المريضات برمز QR ويعرض الالتزام والمحادثات، ومركز إدارة يتحكم في الاشتراكات والمنتجات وأكواد التفعيل — بهوية وردية هادئة ووضع داكن ولوحات ألوان متعددة.",
          "fr": "Un écosystème de trois interfaces reliées : une application qui ramène le suivi quotidien à une minute, un espace médecin qui lie les patientes par QR code et affiche observance et conversations, et un centre d'administration qui pilote abonnements, produits et codes d'activation — avec une identité rose apaisante, un mode sombre et plusieurs palettes.",
          "en": "An ecosystem of three connected interfaces: an app that makes daily tracking a one-minute task, a doctor workspace that links patients by QR code and shows adherence and conversations, and an admin center that controls subscriptions, products and activation codes — with a calm pink identity, dark mode and multiple palettes."
      },
      "features": {
          "ar": [
              "تطبيق مريضة: مرحلة الدورة، مأخوذ اليوم، ونسبة الالتزام",
              "متابعة يومية في دقيقة: المزاج والأعراض والوزن والملاحظات",
              "ربط المريضة بطبيبتها عبر QR أو كود DR-",
              "مراسلة مباشرة بين المريضة والطبيبة",
              "العرض النشط والاشتراك بالدينار الجزائري مع مزاياه",
              "متجر بتقييمات وطلبات ومشاركة مجهولة في البحث العلمي",
              "فضاء الطبيبة: لوحة بالمريضات والمواعيد والتنبيهات والتحليلات والتقويم",
              "صفحة «مريضاتي» برمز QR وكود قابل للنسخ والطباعة",
              "صفحة التزام لآخر 30 يوماً ومحادثات فورية",
              "إعدادات: وضع فاتح/داكن/تلقائي و7 لوحات ألوان",
              "مركز إدارة: بانرات، اشتراكات وعروض، منتجات برموز QR",
              "محتوى وبرامج متابعة لكل منتج وأكواد تفعيل مجانية بتصدير CSV"
          ],
          "fr": [
              "App patiente : phase du cycle, prise du jour et taux d'observance",
              "Suivi quotidien en une minute : humeur, symptômes, poids, notes",
              "Liaison patiente–médecin par QR code ou code DR-",
              "Messagerie directe patiente–médecin",
              "Offre active et abonnement en dinars algériens avec avantages",
              "Boutique avec avis et commandes, participation anonyme à la recherche",
              "Espace médecin : patientes, rendez-vous, alertes, analytics et calendrier",
              "Page « Mes patientes » avec QR code, code à copier ou imprimer",
              "Observance sur 30 jours et messagerie en temps réel",
              "Paramètres : mode clair/sombre/auto et 7 palettes de couleurs",
              "Centre d'administration : bannières, abonnements et offres, produits avec QR",
              "Contenus et programmes par produit, codes d'activation gratuits avec export CSV"
          ],
          "en": [
              "Patient app: cycle phase, today's intake and adherence rate",
              "One-minute daily tracking: mood, symptoms, weight, notes",
              "Patient–doctor linking via QR code or DR- code",
              "Direct patient–doctor messaging",
              "Active offer and subscription priced in Algerian dinars with benefits",
              "Shop with reviews and orders, anonymous research participation",
              "Doctor workspace: patients, appointments, alerts, analytics and calendar",
              "“My patients” page with QR code and a code to copy or print",
              "30-day adherence view and real-time messaging",
              "Settings: light/dark/auto mode and 7 color palettes",
              "Admin center: banners, subscriptions and offers, products with QR codes",
              "Content and programs per product, free activation codes with CSV export"
          ]
      },
      "cover_image_url": "assets/projects/aurafem/cover.webp",
      "thumbnail_url": "assets/projects/aurafem/cover.webp",
      "gallery": [
          "assets/projects/aurafem/cover.webp",
          "assets/projects/aurafem/mobile-all-screens.webp",
          "assets/projects/aurafem/mobile-home-tracking.webp",
          "assets/projects/aurafem/mobile-doctor-profile.webp",
          "assets/projects/aurafem/mobile-offers.webp",
          "assets/projects/aurafem/mobile-shop-research.webp",
          "assets/projects/aurafem/doctor-login.webp",
          "assets/projects/aurafem/doctor-dashboard.webp",
          "assets/projects/aurafem/doctor-patients.webp",
          "assets/projects/aurafem/doctor-adherence.webp",
          "assets/projects/aurafem/doctor-messages.webp",
          "assets/projects/aurafem/doctor-settings.webp",
          "assets/projects/aurafem/admin-overview.webp",
          "assets/projects/aurafem/admin-banners.webp",
          "assets/projects/aurafem/admin-subscriptions.webp",
          "assets/projects/aurafem/admin-products.webp",
          "assets/projects/aurafem/admin-content.webp",
          "assets/projects/aurafem/admin-codes.webp"
      ]
  },
  {
    id: "acmm-website",
    featured: false,
    year: "2026",
    badge: { ar: "موقع مؤسسي", fr: "Site vitrine", en: "Official Website" },
    likes_count: 1320,
    demo_url: "https://accm-dz.com/",
    categories: ["website"],
    technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Dark / Light Mode", "SEO"],

    title: {
      ar: "ACMM — الموقع الرسمي للجمعية الولائية للسلك الطبي",
      fr: "ACMM — Site officiel de l'Association médicale de Magra",
      en: "ACMM — Official Website of the Magra Medical Association",
    },
    short_description: {
      ar: "موقع ويب رسمي متجاوب للجمعية الطبية بمقرة: الفعاليات، التكوينات، الأخبار، العضوية وتحميل التطبيق، بوضع فاتح وداكن.",
      fr: "Site web officiel et responsive de l'association médicale de Magra : événements, formations, actualités, adhésion et téléchargement de l'application, en mode clair et sombre.",
      en: "Responsive official website for the Magra medical association: events, trainings, news, membership and app download, with light and dark modes.",
    },
    full_description: {
      ar: "الموقع الرسمي للجمعية الولائية للسلك الطبي بمقرة (accm-dz.com)، وهو الواجهة العامة التي تعرّف بالجمعية وتقود الأطباء إلى التسجيل في التطبيق. يعرض الفعاليات القادمة مع عدّاد تنازلي وشريط إعلانات علوي، والتكوينات الطبية بالفيديو مع السعر العادي وسعر العضو، وأخبار الجمعية، وعرض العضوية السنوية (1000 دج/سنة)، وخطوات الانضمام، وروابط تحميل التطبيق من Google Play وApp Store، وصفحة اتصال. التصميم متجاوب بالكامل ويدعم الوضع الفاتح والداكن.",
      fr: "Site officiel de l'Association médicale de Magra (accm-dz.com), vitrine publique qui présente l'association et oriente les médecins vers l'inscription dans l'application. Il affiche les prochains événements avec compte à rebours et bandeau d'annonces, les formations vidéo avec tarif public et tarif adhérent, les actualités, l'offre d'adhésion annuelle (1 000 DA/an), les étapes pour rejoindre l'association, les liens de téléchargement Google Play et App Store, et une page de contact. Le design est entièrement responsive avec mode clair et sombre.",
      en: "The official website of the Magra Medical Association (accm-dz.com), the public front door that introduces the association and guides doctors to sign up in the app. It shows upcoming events with a countdown and a top announcement bar, video trainings with public and member pricing, association news, the annual membership offer (1,000 DA/year), the steps to join, Google Play and App Store download links, and a contact page. The design is fully responsive with light and dark modes.",
    },
    problem: {
      ar: "لم يكن للجمعية حضور رقمي رسمي يعرّف بأنشطتها ويشرح العضوية والأسعار ويوجّه الأطباء نحو التطبيق، فكانت المعلومات تنتشر عبر رسائل ومنشورات متفرقة.",
      fr: "L'association n'avait pas de présence numérique officielle présentant ses activités, expliquant l'adhésion et les tarifs, et orientant les médecins vers l'application ; l'information circulait via des messages et publications dispersés.",
      en: "The association had no official online presence to present its activities, explain membership and pricing, and direct doctors to the app; information was spread across scattered messages and posts.",
    },
    solution: {
      ar: "موقع واحد واضح وسريع على الجوال: شريط إعلانات للفعالية الأقرب، أقسام للفعاليات والتكوينات والأخبار، عرض شفاف للعضوية، خطوات انضمام من أربع مراحل، وأزرار مباشرة لتحميل التطبيق والتواصل.",
      fr: "Un site unique, clair et rapide sur mobile : bandeau d'annonce pour l'événement le plus proche, sections événements, formations et actualités, présentation transparente de l'adhésion, parcours d'inscription en quatre étapes, et boutons directs pour télécharger l'application et contacter l'équipe.",
      en: "A single clear, fast mobile-first site: an announcement bar for the nearest event, sections for events, trainings and news, a transparent membership offer, a four-step join flow, and direct buttons to download the app and contact the team.",
    },
    features: {
      ar: [
        "شريط إعلانات علوي دوّار مع زر «Voir l'événement»",
        "قسم الفعاليات القادمة مع عدّاد تنازلي (أيام / ساعات / دقائق)",
        "عرض التكوينات الطبية بالفيديو مع سعر الأعضاء المخفّض",
        "قسم الأخبار والمقالات الطبية",
        "عرض العضوية السنوية وخطوات الانضمام الأربع",
        "روابط تحميل التطبيق (Google Play / App Store) ومعاينة له",
        "وضع فاتح وداكن بتبديل فوري",
        "تصميم متجاوب بالكامل وصفحة اتصال وروابط التواصل الاجتماعي",
      ],
      fr: [
        "Bandeau d'annonces rotatif avec bouton « Voir l'événement »",
        "Section événements à venir avec compte à rebours (jours / heures / minutes)",
        "Formations médicales vidéo avec tarif adhérent réduit",
        "Section actualités et articles médicaux",
        "Offre d'adhésion annuelle et parcours d'inscription en 4 étapes",
        "Liens de téléchargement (Google Play / App Store) et aperçu de l'application",
        "Mode clair et sombre avec bascule instantanée",
        "Design entièrement responsive, page de contact et réseaux sociaux",
      ],
      en: [
        "Rotating top announcement bar with a “Voir l'événement” button",
        "Upcoming events section with a live countdown (days / hours / minutes)",
        "Video medical trainings with discounted member pricing",
        "News and medical articles section",
        "Annual membership offer and a 4-step join flow",
        "App download links (Google Play / App Store) with an app preview",
        "Light and dark mode with instant toggle",
        "Fully responsive design, contact page and social links",
      ],
    },

    cover_image_url: "assets/projects/acmm-web/cover.webp",
    thumbnail_url:   "assets/projects/acmm-web/cover.webp",
    gallery: [
      "assets/projects/acmm-web/cover.webp",
      "assets/projects/acmm-web/home.webp",
      "assets/projects/acmm-web/home-dark.webp",
      "assets/projects/acmm-web/stats.webp",
      "assets/projects/acmm-web/about.webp",
      "assets/projects/acmm-web/agenda.webp",
      "assets/projects/acmm-web/event.webp",
      "assets/projects/acmm-web/trainings.webp",
      "assets/projects/acmm-web/steps.webp",
      "assets/projects/acmm-web/offers.webp",
      "assets/projects/acmm-web/app.webp",
      "assets/projects/acmm-web/join.webp",
      "assets/projects/acmm-web/news.webp",
      "assets/projects/acmm-web/contact.webp",
      "assets/projects/acmm-web/footer.webp",
    ],
  },
  {
    id: "si-belle-store",
    featured: false,
    year: "2026",
    badge: { ar: "متجر إلكتروني", fr: "Boutique en ligne", en: "E-commerce Store" },
    likes_count: 1260,
    demo_url: "",                            // ← ضع رابط المتجر هنا إن وجد
    categories: ["ecommerce", "website", "dashboard"],
    technologies: ["HTML5", "CSS3", "JavaScript", "Leaflet Maps", "Vercel", "RTL / Multilingual", "Dark / Light Mode"],

    title: {
      ar: "Si Belle — متجر ملابس نسائية بلوحة تحكم متكاملة",
      fr: "Si Belle — Boutique de mode féminine avec tableau de bord",
      en: "Si Belle — Women's Fashion Store with Admin Dashboard",
    },
    short_description: {
      ar: "متجر إلكتروني ثنائي اللغة (عربي/فرنسي) للألبسة النسائية بالجزائر، مع سلة ومفضلة وتتبع الطلبات وفواتير PDF، ولوحة تحكم حيّة.",
      fr: "Boutique en ligne bilingue (arabe/français) de mode féminine en Algérie, avec panier, favoris, suivi de commande, factures PDF et tableau de bord en direct.",
      en: "Bilingual (Arabic/French) online store for women's fashion in Algeria, with cart, favorites, order tracking, PDF invoices and a live admin dashboard.",
    },
    full_description: {
      ar: "Si Belle علامة ألبسة نسائية جزائرية (حجابات، عبايات، إنسمبل، بيجامات، ملابس منزلية، جبّة). يتكوّن المشروع من متجر إلكتروني للزبائن ولوحة تحكم للإدارة. المتجر ثنائي اللغة (عربي مع RTL وفرنسي) بوضع فاتح وداكن، ويعرض التصنيفات والمنتجات المميزة، وصفحة المنتج بالألوان والمقاسات والكمية المتبقية والسعر قبل/بعد الخصم، ثم المفضلة والسلة وإتمام الطلب بالولاية والبلدية والدفع عند الاستلام. بعد الطلب يحصل الزبون على رقم تتبّع (SB-التاريخ-الرمز) وفاتورة PDF، ويمكنه تتبّع طلبه من الصفحة الرئيسية. أما لوحة التحكم فتعرض مؤشرات حيّة (الإيرادات، الطلبات، متوسط السلة)، وإدارة الطلبات بتحديث الحالة (تم التأكيد، قيد التحضير، تم الشحن، تم التسليم) وطباعة فاتورة برمز QR، وتحليلات، وخريطة حقيقية للمبيعات حسب الولاية، وإدارة المنتجات والتصنيفات والموظفين والنصوص والشحن وطرق الدفع.",
      fr: "Si Belle est une marque algérienne de mode féminine (hijabs, abayas, ensembles, pyjamas, tenues d'intérieur, djebba). Le projet comprend une boutique pour les clientes et un tableau de bord pour l'administration. La boutique est bilingue (arabe en RTL et français) avec mode clair et sombre ; elle présente catégories et produits phares, une fiche produit avec couleurs, tailles, stock restant et prix barré, puis favoris, panier et commande avec wilaya, commune et paiement à la livraison. Après la commande, la cliente reçoit un numéro de suivi (SB-date-code) et une facture PDF, et peut suivre sa commande depuis l'accueil. Le tableau de bord affiche des indicateurs en direct (revenus, commandes, panier moyen), gère les commandes avec mise à jour du statut (confirmée, en préparation, expédiée, livrée) et impression de facture avec QR code, propose des analyses, une vraie carte des ventes par wilaya, et la gestion des produits, catégories, équipe, textes, livraison et moyens de paiement.",
      en: "Si Belle is an Algerian women's fashion brand (hijabs, abayas, sets, pajamas, loungewear, djebba). The project has a customer-facing store and an admin dashboard. The store is bilingual (Arabic with RTL, and French) with light and dark modes; it shows categories and featured products, a product page with colors, sizes, remaining stock and strike-through pricing, then favorites, cart and checkout with wilaya, commune and cash on delivery. After ordering, the customer gets a tracking number (SB-date-code) and a PDF invoice, and can track the order from the home page. The dashboard shows live KPIs (revenue, orders, average basket), manages orders with status updates (confirmed, preparing, shipped, delivered) and QR-code invoice printing, offers analytics, a real sales map by wilaya, and management of products, categories, team, texts, shipping and payment methods.",
    },
    problem: {
      ar: "كانت العلامة تستقبل الطلبات عبر رسائل متفرقة دون تتبّع واضح للحالة أو فواتير موحّدة أو رؤية لمناطق المبيعات، ما يسبب أخطاء في المقاسات والمخزون وصعوبة في متابعة الزبائن.",
      fr: "La marque recevait ses commandes par messages dispersés, sans suivi clair du statut, sans factures uniformes ni visibilité sur les zones de vente, d'où des erreurs de tailles et de stock et un suivi client difficile.",
      en: "The brand took orders through scattered messages with no clear status tracking, no standard invoices and no view of sales regions, causing size and stock mistakes and hard customer follow-up.",
    },
    solution: {
      ar: "منظومة متكاملة: متجر سريع بلغتين مع مخزون ظاهر لكل لون ومقاس، وطلب بخطوات بسيطة مع رقم تتبّع وفاتورة PDF، ولوحة تحكم حيّة تدير الطلبات والمخزون وتعرض المبيعات على خريطة الجزائر.",
      fr: "Un système complet : boutique rapide bilingue avec stock visible par couleur et taille, commande simple avec numéro de suivi et facture PDF, et tableau de bord en direct pour gérer commandes et stock et visualiser les ventes sur la carte de l'Algérie.",
      en: "An end-to-end system: a fast bilingual store with stock shown per color and size, simple checkout with a tracking number and PDF invoice, and a live dashboard to manage orders and stock and see sales on a map of Algeria.",
    },
    features: {
      ar: [
        "متجر ثنائي اللغة (عربي RTL / فرنسي) بوضع فاتح وداكن",
        "تصنيفات بالصور ومنتجات مميزة وبحث سريع",
        "صفحة منتج: ألوان ومقاسات وكمية متبقية وسعر قبل/بعد الخصم",
        "مفضلة وسلة مشتريات بتعديل الكمية",
        "طلب بالولاية والبلدية والدفع عند الاستلام",
        "رقم تتبّع للطلب وفاتورة PDF قابلة للتحميل",
        "لوحة تحكم حيّة: إيرادات وطلبات ومتوسط السلة وطلبات آخر 7 أيام",
        "إدارة حالة الطلب وطباعة فاتورة برمز QR",
        "خريطة المبيعات حسب الولاية وتحليلات",
        "إدارة المنتجات والتصنيفات والموظفين والنصوص والشحن وطرق الدفع",
      ],
      fr: [
        "Boutique bilingue (arabe RTL / français), mode clair et sombre",
        "Catégories illustrées, produits phares et recherche rapide",
        "Fiche produit : couleurs, tailles, stock restant, prix barré",
        "Favoris et panier avec ajustement des quantités",
        "Commande avec wilaya, commune et paiement à la livraison",
        "Numéro de suivi de commande et facture PDF téléchargeable",
        "Tableau de bord en direct : revenus, commandes, panier moyen, 7 derniers jours",
        "Gestion du statut des commandes et impression de facture avec QR code",
        "Carte des ventes par wilaya et analyses",
        "Gestion des produits, catégories, équipe, textes, livraison et paiements",
      ],
      en: [
        "Bilingual store (Arabic RTL / French) with light and dark mode",
        "Illustrated categories, featured products and quick search",
        "Product page: colors, sizes, remaining stock, strike-through price",
        "Favorites and cart with quantity controls",
        "Checkout with wilaya, commune and cash on delivery",
        "Order tracking number and downloadable PDF invoice",
        "Live dashboard: revenue, orders, average basket, last 7 days",
        "Order status management and QR-code invoice printing",
        "Sales map by wilaya and analytics",
        "Management of products, categories, team, texts, shipping and payments",
      ],
    },

    cover_image_url: "assets/projects/sibelle/cover.webp",
    thumbnail_url:   "assets/projects/sibelle/cover.webp",
    gallery: [
      "assets/projects/sibelle/cover.webp",
      "assets/projects/sibelle/hero.webp",
      "assets/projects/sibelle/store-categories.webp",
      "assets/projects/sibelle/mobile.webp",
      "assets/projects/sibelle/product.webp",
      "assets/projects/sibelle/favorites.webp",
      "assets/projects/sibelle/cart.webp",
      "assets/projects/sibelle/order-success.webp",
      "assets/projects/sibelle/invoice.webp",
      "assets/projects/sibelle/dash-overview.webp",
      "assets/projects/sibelle/dash-order.webp",
      "assets/projects/sibelle/dash-print.webp",
      "assets/projects/sibelle/dash-map.webp",
    ],
  },
  {
    id: "autodev-agency",
    featured: false,
    year: "2026",
    badge: { ar: "موقع وكالة", fr: "Site d'agence", en: "Agency Website" },
    likes_count: 1390,
    demo_url: "https://auto-dev-agency.vercel.app/",
    categories: ["website", "dashboard"],
    technologies: ["HTML5", "CSS3", "JavaScript", "AI Chatbot", "Admin Dashboard", "Vercel", "RTL / Multilingual", "Dark / Light Mode"],

    title: {
      ar: "AutoDev Agency — موقع وكالة برمجيات بلوحة تحكم ومساعد ذكي",
      fr: "AutoDev Agency — Site d'agence logicielle avec tableau de bord et assistant IA",
      en: "AutoDev Agency — Software Agency Website with Dashboard and AI Assistant",
    },
    short_description: {
      ar: "موقع عصري لوكالة تطوير برمجيات من تيزي وزو، بثلاث لغات ووضع فاتح/داكن، مع معرض أعمال ونموذج طلب مشروع ومساعد ذكي ولوحة تحكم كاملة.",
      fr: "Site moderne d'une agence de développement logiciel de Tizi Ouzou, multilingue avec mode clair/sombre, portfolio, formulaire de demande de projet, assistant IA et tableau de bord complet.",
      en: "A modern website for a software development agency in Tizi Ouzou, multilingual with light/dark mode, a portfolio, a project request wizard, an AI assistant and a full admin dashboard.",
    },
    full_description: {
      ar: "AutoDev Agency وكالة تطوير برمجيات من تيزي وزو بالجزائر تقدّم تطبيقات الجوال ومنصات الويب وواجهات UI/UX وأتمتة الأعمال والحوسبة السحابية. يتكوّن المشروع من موقع تعريفي للوكالة ولوحة تحكم لإدارتها. الموقع يضم صفحة رئيسية بتصميم تفاعلي، وخدمات، ومعرض أعمال بتصنيفات وإعجابات ومشاركة ونافذة تفاصيل لكل مشروع، وآراء العملاء، وصفحة من نحن، وطريقة العمل، وأسئلة شائعة، وصفحة تواصل، مع بحث سريع. ويقدّم نموذجاً من أربع خطوات لطلب مشروع جديد، ومساعداً ذكياً يجيب عن الخدمات والأسعار ومدة التنفيذ ويعرض المشاريع. يعمل بالعربية والفرنسية والإنجليزية مع دعم RTL وأوضاع العرض الفاتح والداكن والتباين العالي، ويتكيّف مع الجوال. أما لوحة التحكم فتتيح إدارة الطلبات والعملاء والمشاريع والمهام والرسائل والشركاء والعقود والإعلانات، ومحتوى الموقع ومشاريع البورتفوليو وآراء العملاء والمدونة والأسئلة الشائعة والفواتير والصلاحيات والموظفين والإعدادات.",
      fr: "AutoDev Agency est une agence de développement logiciel basée à Tizi Ouzou (Algérie) : applications mobiles, plateformes web, interfaces UI/UX, automatisation et cloud. Le projet comprend un site vitrine et un tableau de bord d'administration. Le site propose une page d'accueil interactive, les services, un portfolio avec catégories, mentions « j'aime », partage et fenêtre de détails par projet, les avis clients, une page À propos, la méthode de travail, une FAQ, un formulaire de contact et une recherche rapide. Il offre un assistant en 4 étapes pour demander un projet et un assistant IA qui répond sur les services, les tarifs et les délais et présente les réalisations. Disponible en arabe, français et anglais avec RTL, modes clair, sombre et contraste élevé, et adapté au mobile. Le tableau de bord permet de gérer demandes, clients, projets, tâches, messages, partenaires, contrats et annonces, ainsi que le contenu du site, le portfolio, les avis, le blog, la FAQ, les factures, les permissions, l'équipe et les paramètres.",
      en: "AutoDev Agency is a software development agency based in Tizi Ouzou, Algeria, offering mobile apps, web platforms, UI/UX design, business automation and cloud services. The project has a public agency website and an admin dashboard. The site features an interactive home page, services, a portfolio with categories, likes, sharing and a detail modal per project, client testimonials, an About page, a work process section, an FAQ, a contact page and quick search. It includes a 4-step project request wizard and an AI assistant that answers questions about services, pricing and timelines and showcases projects. It runs in Arabic, French and English with RTL support, light, dark and high-contrast themes, and is fully responsive. The dashboard manages requests, clients, projects, tasks, messages, partners, contracts and ads, plus site content, portfolio projects, testimonials, blog, FAQ, invoices, permissions, staff and settings.",
    },
    problem: {
      ar: "كانت الوكالة تفتقر إلى واجهة رقمية موحّدة تعرض خدماتها وأعمالها بشكل احترافي، وتستقبل طلبات العملاء بطريقة منظّمة، وتجيب عن الأسئلة المتكررة بسرعة، وتدير المشاريع والعملاء والفواتير من مكان واحد.",
      fr: "L'agence manquait d'une vitrine numérique unifiée pour présenter ses services et réalisations de façon professionnelle, recevoir les demandes clients de manière structurée, répondre vite aux questions fréquentes et gérer projets, clients et factures depuis un seul endroit.",
      en: "The agency lacked a unified digital presence to showcase its services and work professionally, receive client requests in an organized way, answer common questions quickly, and manage projects, clients and invoices from one place.",
    },
    solution: {
      ar: "موقع سريع ومتعدد اللغات بهوية بصرية واضحة ومعرض أعمال تفاعلي، ونموذج طلب مشروع من أربع خطوات، ومساعد ذكي يرد فوراً ويوجّه الزائر، ولوحة تحكم تدير كل المحتوى والطلبات والعملاء والفواتير وتنعكس تغييراتها مباشرة على الموقع.",
      fr: "Un site rapide et multilingue à l'identité visuelle claire, un portfolio interactif, un formulaire de demande de projet en quatre étapes, un assistant IA qui répond instantanément et oriente le visiteur, et un tableau de bord qui gère contenus, demandes, clients et factures, avec des changements reflétés directement sur le site.",
      en: "A fast multilingual website with a clear visual identity, an interactive portfolio, a four-step project request form, an AI assistant that replies instantly and guides visitors, and a dashboard that manages content, requests, clients and invoices with changes reflected directly on the site.",
    },
    features: {
      ar: [
        "صفحة رئيسية تفاعلية بوضع فاتح وداكن وتباين عالٍ",
        "ثلاث لغات (عربي RTL / فرنسي / إنجليزي) وتصميم متجاوب مع الجوال",
        "معرض أعمال بتصنيفات وإعجابات ومشاركة ونافذة تفاصيل لكل مشروع",
        "نموذج طلب مشروع من 4 خطوات",
        "مساعد ذكي يجيب عن الخدمات والأسعار ومدة التنفيذ ويعرض المشاريع",
        "صفحات الخدمات والعملاء ومن نحن وطريقة العمل والأسئلة الشائعة والتواصل",
        "بحث سريع في الموقع وشريط موافقة على ملفات تعريف الارتباط",
        "لوحة تحكم: إحصائيات وتوزيع الطلبات وميزانية الإعلانات والإيرادات",
        "إدارة الطلبات والعملاء والمشاريع والمهام والرسائل والشركاء والعقود",
        "إدارة محتوى الموقع والمدونة والأسئلة الشائعة والفواتير والصلاحيات والموظفين والإعدادات",
      ],
      fr: [
        "Page d'accueil interactive avec modes clair, sombre et contraste élevé",
        "Trois langues (arabe RTL / français / anglais) et design adaptatif mobile",
        "Portfolio avec catégories, likes, partage et fenêtre de détails par projet",
        "Formulaire de demande de projet en 4 étapes",
        "Assistant IA : services, tarifs, délais et présentation des projets",
        "Pages services, clients, À propos, méthode de travail, FAQ et contact",
        "Recherche rapide et bandeau de consentement aux cookies",
        "Tableau de bord : statistiques, répartition des demandes, budget publicitaire et revenus",
        "Gestion des demandes, clients, projets, tâches, messages, partenaires et contrats",
        "Gestion du contenu, du blog, de la FAQ, des factures, des permissions, de l'équipe et des paramètres",
      ],
      en: [
        "Interactive home page with light, dark and high-contrast modes",
        "Three languages (Arabic RTL / French / English) and a mobile-responsive design",
        "Portfolio with categories, likes, sharing and a detail modal per project",
        "4-step project request wizard",
        "AI assistant for services, pricing, timelines and project showcase",
        "Services, clients, About, work process, FAQ and contact pages",
        "Quick site search and a cookie consent banner",
        "Dashboard: stats, request distribution, ad budget and revenue",
        "Management of requests, clients, projects, tasks, messages, partners and contracts",
        "Management of site content, blog, FAQ, invoices, permissions, staff and settings",
      ],
    },

    cover_image_url: "assets/projects/autodev/cover.webp",
    thumbnail_url:   "assets/projects/autodev/cover.webp",
    gallery: [
      "assets/projects/autodev/cover.webp",
      "assets/projects/autodev/home-dark.webp",
      "assets/projects/autodev/home.webp",
      "assets/projects/autodev/projects.webp",
      "assets/projects/autodev/featured.webp",
      "assets/projects/autodev/project-modal.webp",
      "assets/projects/autodev/about.webp",
      "assets/projects/autodev/faq.webp",
      "assets/projects/autodev/start.webp",
      "assets/projects/autodev/contact.webp",
      "assets/projects/autodev/theme.webp",
      "assets/projects/autodev/mobile.webp",
      "assets/projects/autodev/mobile-chat.webp",
      "assets/projects/autodev/dash-overview.webp",
      "assets/projects/autodev/dash-settings.webp",
    ],
  },
  {
    id: "cisterna-app",
    featured: false,
    year: "2026",
    badge: {"ar": "تطبيق جوال", "fr": "Application mobile", "en": "Mobile App"},
    likes_count: 1340,
    demo_url: "",
    categories: ["mobile"],
    technologies: ["Flutter", "Dart", "Firebase", "Google Maps", "GPS Tracking", "Push Notifications"],

    title: {
      "ar": "Cisterna — تطبيقا الزبون والسائق لتوصيل المياه",
      "fr": "Cisterna — Applications Client et Chauffeur pour la livraison d'eau",
      "en": "Cisterna — Customer & Driver Apps for Water Delivery"
    },
    short_description: {
      "ar": "تطبيقان للجوال لمنصة Cisterna: تطبيق للزبون لطلب المياه وتتبّع الشاحنة، وتطبيق للسائق لاستقبال الطلبات والملاحة ومتابعة الأرباح.",
      "fr": "Deux applications mobiles pour la plateforme Cisterna : une application client pour commander l'eau et suivre le camion, et une application chauffeur pour recevoir les commandes, naviguer et suivre ses gains.",
      "en": "Two mobile apps for the Cisterna platform: a customer app to order water and track the truck, and a driver app to receive orders, navigate and follow earnings."
    },
    full_description: {
      "ar": "Cisterna منصة لتوصيل المياه بالشاحنات تربط الزبون بالسائق لحظياً. يضم المشروع تطبيقين بهوية زرقاء موحّدة. تطبيق الزبون يتيح اختيار نوع المياه (صالحة للشرب أو غير صالحة) وتحديد الكمية بمنزلقة باللتر مع السعر الإجمالي، ثم تتبّع الشاحنة على الخريطة مباشرة مع المسافة والوقت المتبقي، واستلام إشعارات في كل مرحلة (وصل السائق، غادر، تم التسليم)، ومراجعة سجل الطلبات وتقييم الخدمة وإدارة الملف الشخصي. أما تطبيق السائق فيصله الطلب فوراً مع تنبيه، ويفتح الملاحة نحو الزبون ويعرض مسار الطريق، ويتيح إدارة حالة التسليم بنقرة واحدة، ومتابعة الأرباح وتقييم الزبائن وسعة الخزان والديون، وإدارة الملف الشخصي والحالة (متصل/غير متصل).",
      "fr": "Cisterna est une plateforme de livraison d'eau par camion qui relie le client au chauffeur en temps réel. Le projet comprend deux applications à l'identité bleue unifiée. L'application client permet de choisir le type d'eau (potable ou non potable), de définir la quantité avec un curseur en litres et le prix total, de suivre le camion en direct sur la carte avec distance et temps restant, de recevoir des notifications à chaque étape (chauffeur arrivé, parti, livré), de consulter l'historique, de noter le service et de gérer son profil. L'application chauffeur reçoit la commande avec alerte instantanée, lance la navigation vers le client avec l'itinéraire, permet de mettre à jour le statut de livraison en un geste, de suivre ses gains, les notes clients, la capacité du réservoir et les dettes, et de gérer son profil et son statut (en ligne / hors ligne).",
      "en": "Cisterna is a truck-based water delivery platform that connects customers and drivers in real time. The project has two apps sharing one blue identity. The customer app lets users pick the water type (drinkable or non-drinkable), set the quantity with a litre slider and see the total price, then track the truck live on the map with distance and ETA, receive a notification at each stage (driver arrived, left, delivered), review order history, rate the service and manage their profile. The driver app receives the order instantly with an alert, starts navigation to the customer with the route drawn, updates delivery status in one tap, and tracks earnings, customer ratings, tank capacity and debts, plus profile and online/offline status."
    },
    problem: {
      "ar": "طلب المياه بالشاحنات يتم غالباً بالهاتف دون معرفة موعد الوصول أو موقع الشاحنة، وبلا سجل واضح للطلبات أو تقييم للخدمة، بينما يفتقر السائق لأداة تنظّم طلباته وملاحته وأرباحه.",
      "fr": "La commande d'eau par camion se fait souvent par téléphone, sans connaître l'heure d'arrivée ni la position du camion, sans historique clair ni évaluation du service, tandis que le chauffeur n'a pas d'outil pour organiser ses commandes, sa navigation et ses gains.",
      "en": "Ordering water trucks usually happens by phone, with no idea of arrival time or truck location, no clear order history or service rating, while drivers lack a tool to organize orders, navigation and earnings."
    },
    solution: {
      "ar": "تطبيقان متكاملان: الزبون يطلب بخطوات بسيطة ويتتبّع شاحنته مباشرة ويتلقى إشعارات ويقيّم الخدمة، والسائق يستقبل الطلبات ويتنقّل ويحدّث حالة التسليم ويتابع أرباحه من شاشة واحدة.",
      "fr": "Deux applications complémentaires : le client commande simplement, suit son camion en direct, reçoit des notifications et note le service ; le chauffeur reçoit les commandes, navigue, met à jour la livraison et suit ses gains depuis un seul écran.",
      "en": "Two complementary apps: customers order in a few steps, track their truck live, get notifications and rate the service; drivers receive orders, navigate, update delivery status and follow earnings from one screen."
    },
    features: {
      "ar": [
        "اختيار نوع المياه (شرب / غير صالحة للشرب) وتحديد الكمية بالمنزلقة مع السعر الإجمالي",
        "تتبّع الشاحنة على الخريطة مباشرة مع المسافة والوقت المتبقي",
        "إشعارات فورية: وصل السائق، غادر، تم التسليم",
        "سجل الطلبات وتقييم السائق والخدمة",
        "إدارة الملف الشخصي وشاشة بداية وقائمة جانبية",
        "تطبيق السائق: استقبال الطلبات بتنبيه فوري",
        "ملاحة نحو الزبون مع رسم المسار على الخريطة",
        "إدارة حالة التسليم بنقرة واحدة",
        "نظرة على الأرباح والتقييم وسعة الخزان وشريط الديون",
        "حالة السائق (متصل / غير متصل) وملف شخصي ومستندات"
      ],
      "fr": [
        "Choix du type d'eau (potable / non potable) et quantité par curseur avec prix total",
        "Suivi du camion en direct sur la carte avec distance et temps restant",
        "Notifications instantanées : chauffeur arrivé, parti, livré",
        "Historique des commandes et notation du chauffeur et du service",
        "Gestion du profil, écran d'accueil et menu latéral",
        "Application chauffeur : réception des commandes avec alerte instantanée",
        "Navigation vers le client avec itinéraire tracé sur la carte",
        "Mise à jour du statut de livraison en un geste",
        "Aperçu des gains, notes, capacité du réservoir et barre de dettes",
        "Statut du chauffeur (en ligne / hors ligne), profil et documents"
      ],
      "en": [
        "Choose water type (drinkable / non-drinkable) and set quantity with a slider and total price",
        "Live truck tracking on the map with distance and ETA",
        "Instant notifications: driver arrived, left, delivered",
        "Order history and driver/service rating",
        "Profile management, splash screen and side menu",
        "Driver app: orders received with an instant alert",
        "Navigation to the customer with the route drawn on the map",
        "One-tap delivery status updates",
        "Earnings, rating, tank capacity and debt bar overview",
        "Driver status (online / offline), profile and documents"
      ]
    },

    cover_image_url: "assets/projects/cisterna-app/cover.webp",
    thumbnail_url:   "assets/projects/cisterna-app/cover.webp",
    gallery: [
      "assets/projects/cisterna-app/cover.webp",
      "assets/projects/cisterna-app/customer-app.webp",
      "assets/projects/cisterna-app/driver-app.webp",
    ],
  },
  {
    id: "cisterna-web",
    featured: false,
    year: "2026",
    badge: {"ar": "موقع ولوحة تحكم", "fr": "Site et tableau de bord", "en": "Website & Dashboard"},
    likes_count: 1280,
    demo_url: "",
    categories: ["website", "dashboard"],
    technologies: ["HTML5", "CSS3", "JavaScript", "Firebase", "Fleet Tracking", "RTL / Arabic", "Dark / Light Mode"],

    title: {
      "ar": "Cisterna — موقع تعريفي ولوحة تحكم لإدارة الشاحنات والطلبات",
      "fr": "Cisterna — Site vitrine et tableau de bord de gestion des camions et commandes",
      "en": "Cisterna — Landing Website & Admin Dashboard for Trucks and Orders"
    },
    short_description: {
      "ar": "موقع تعريفي عصري لمنصة Cisterna لتوصيل المياه مع نموذج تعليقات، ولوحة تحكم حيّة لإدارة الطلبات والشاحنات والسائقين والمستخدمين والإعدادات.",
      "fr": "Site vitrine moderne pour la plateforme de livraison d'eau Cisterna avec formulaire d'avis, et tableau de bord en direct pour gérer commandes, camions, chauffeurs, utilisateurs et paramètres.",
      "en": "A modern landing website for the Cisterna water delivery platform with a feedback form, and a live dashboard to manage orders, trucks, drivers, users and settings."
    },
    full_description: {
      "ar": "يضم المشروع موقعاً تعريفياً بالعربية ولوحة تحكم للمسؤولين. الموقع يعرّف بالمنصة عبر واجهة رئيسية، وشرح «كيف يعمل» في ثلاث خطوات، والمميزات (تتبّع مباشر، توصيل سريع، إشعارات، دفع آمن، تواصل مع السائق، تقييم شفاف)، ونوعي المياه (صالحة للشرب وغير صالحة)، وإحصائيات المنصة، وروابط تحميل التطبيق من Google Play وApp Store، ونموذج لإرسال التعليقات مع التقييم بالنجوم، وصفحة من نحن وتذييل بروابط التواصل. أما لوحة التحكم فتخصّ المسؤولين بتسجيل دخول مستقل، وتعرض نظرة عامة بأرقام الطلبات المقبولة والمعلّقة والمرفوضة والإيرادات وحصة المنصة وحصة السائقين وتنبيهات الشاحنات، وتدير الطلبات وطلبات الموقع والشاحنات (حالة الاتصال والسعة والموقع) والمستخدمين وتنبيهات المياه والمكالمات وقبول السائقين والسائقين المحظورين وتعليقات الموقع والمسؤولين، مع إعدادات نسبة ربح السائق وحد إيقاف الحساب وروابط التواصل والتطبيقات.",
      "fr": "Le projet comprend un site vitrine en arabe et un tableau de bord pour les administrateurs. Le site présente la plateforme avec une page d'accueil, « Comment ça marche » en trois étapes, les atouts (suivi en direct, livraison rapide, notifications, paiement sécurisé, échange avec le chauffeur, notation transparente), les deux types d'eau (potable et non potable), des statistiques, les liens de téléchargement Google Play et App Store, un formulaire d'avis avec note en étoiles, une page À propos et un pied de page avec les liens sociaux. Le tableau de bord, à connexion séparée, affiche une vue d'ensemble (commandes acceptées, en attente, refusées, revenus, part de la plateforme et des chauffeurs, alertes camions) et gère commandes, demandes du site, camions (connexion, capacité, position), utilisateurs, alertes eau, appels, acceptation des chauffeurs, chauffeurs bannis, avis du site et administrateurs, avec des paramètres de part du chauffeur, seuil de blocage de compte et liens sociaux et applications.",
      "en": "The project has an Arabic landing website and an admin dashboard. The website presents the platform with a hero section, a three-step “How it works”, key features (live tracking, fast delivery, notifications, secure payment, driver communication, transparent rating), the two water types (drinkable and non-drinkable), platform stats, Google Play and App Store download links, a feedback form with star rating, an About page and a footer with social links. The dashboard, with its own admin login, shows an overview (accepted, pending and rejected orders, revenue, platform and driver shares, truck alerts) and manages orders, website requests, trucks (connection, capacity, location), users, water alerts, calls, driver approvals, banned drivers, website feedback and admins, with settings for driver profit share, account suspension limit, and social and app links."
    },
    problem: {
      "ar": "لم يكن للمنصة واجهة ويب تعرّف بخدماتها وتستقبل آراء الزبائن، ولا أداة مركزية لمتابعة الأسطول والطلبات والإيرادات وقبول السائقين وضبط سياسة الأرباح والديون.",
      "fr": "La plateforme n'avait ni vitrine web pour présenter ses services et recueillir les avis des clients, ni outil central pour suivre la flotte, les commandes, les revenus, l'acceptation des chauffeurs et la politique de gains et de dettes.",
      "en": "The platform had no web presence to present its services and collect customer feedback, and no central tool to follow the fleet, orders, revenue, driver approvals and the profit and debt policy."
    },
    solution: {
      "ar": "موقع تعريفي واضح يدفع الزائر لتحميل التطبيق ويجمع التعليقات، ولوحة تحكم حيّة تُظهر حالة الأسطول والطلبات والإيرادات وتنبّه لمشاكل GPS وتعدّد الأجهزة، وتتيح ضبط نسبة ربح السائق وحد الديون من الإعدادات.",
      "fr": "Un site vitrine clair qui incite à télécharger l'application et collecte les avis, et un tableau de bord en direct qui montre l'état de la flotte, des commandes et des revenus, alerte sur les problèmes GPS et les appareils multiples, et permet de régler la part du chauffeur et le seuil de dette.",
      "en": "A clear landing site that drives app downloads and collects feedback, and a live dashboard showing fleet, orders and revenue status, alerting on GPS issues and multiple devices, and letting admins set the driver profit share and debt limit."
    },
    features: {
      "ar": [
        "موقع تعريفي بالعربية بتصميم عصري ووضع فاتح وداكن",
        "شرح «كيف يعمل» في ثلاث خطوات والمميزات ونوعي المياه",
        "روابط تحميل التطبيق من Google Play وApp Store",
        "نموذج تعليقات (إطراء / اقتراح / انشغال) مع تقييم بالنجوم",
        "لوحة تحكم بتسجيل دخول للمسؤولين فقط",
        "نظرة عامة: حالة الطلبات والإيرادات وحصة المنصة والسائقين",
        "تنبيهات نشطة على الشاحنات (انقطاع GPS، تعدد الأجهزة)",
        "إدارة الشاحنات: حالة الاتصال والسعة والتقييم وآخر تحديث",
        "إدارة الطلبات والمستخدمين وقبول السائقين والسائقين المحظورين",
        "إعدادات: نسبة ربح السائق وحد إيقاف الحساب وروابط التواصل والتطبيقات"
      ],
      "fr": [
        "Site vitrine en arabe au design moderne, modes clair et sombre",
        "« Comment ça marche » en trois étapes, atouts et deux types d'eau",
        "Liens de téléchargement Google Play et App Store",
        "Formulaire d'avis (éloge / suggestion / problème) avec étoiles",
        "Tableau de bord avec connexion réservée aux administrateurs",
        "Vue d'ensemble : statut des commandes, revenus, parts plateforme et chauffeurs",
        "Alertes actives sur les camions (perte GPS, appareils multiples)",
        "Gestion des camions : connexion, capacité, note et dernière mise à jour",
        "Gestion des commandes, utilisateurs, acceptation et bannissement des chauffeurs",
        "Paramètres : part du chauffeur, seuil de blocage, liens sociaux et applications"
      ],
      "en": [
        "Arabic landing website with a modern design, light and dark modes",
        "Three-step “How it works”, key features and the two water types",
        "Google Play and App Store download links",
        "Feedback form (praise / suggestion / issue) with star rating",
        "Admin-only dashboard login",
        "Overview: order status, revenue, platform and driver shares",
        "Active truck alerts (GPS lost, multiple devices)",
        "Truck management: connection status, capacity, rating and last update",
        "Management of orders, users, driver approvals and banned drivers",
        "Settings: driver profit share, account suspension limit, social and app links"
      ]
    },

    cover_image_url: "assets/projects/cisterna-web/cover.webp",
    thumbnail_url:   "assets/projects/cisterna-web/cover.webp",
    gallery: [
      "assets/projects/cisterna-web/cover.webp",
      "assets/projects/cisterna-web/how.webp",
      "assets/projects/cisterna-web/features.webp",
      "assets/projects/cisterna-web/water-types.webp",
      "assets/projects/cisterna-web/about.webp",
      "assets/projects/cisterna-web/download.webp",
      "assets/projects/cisterna-web/feedback.webp",
      "assets/projects/cisterna-web/footer.webp",
      "assets/projects/cisterna-web/dash-login.webp",
      "assets/projects/cisterna-web/dash-overview.webp",
      "assets/projects/cisterna-web/dash-trucks.webp",
      "assets/projects/cisterna-web/dash-feedback.webp",
      "assets/projects/cisterna-web/dash-settings.webp",
    ],
  },
  {
    "id": "wasla-driver-app",
    "featured": false,
    "year": "2026",
    "badge": {
      "ar": "تطبيق جوال",
      "fr": "Application mobile",
      "en": "Mobile App"
    },
    "likes_count": 1420,
    "demo_url": "",
    "categories": [
      "mobile"
    ],
    "technologies": [
      "Flutter",
      "Dart",
      "Google Maps",
      "GPS Tracking",
      "Real-time Chat",
      "Push Notifications"
    ],
    "title": {
      "ar": "وصلة للسائقين — تطبيق السائق للتوصيل والصفقات",
      "fr": "Wasla Drivers — Application chauffeur pour la livraison et les courses",
      "en": "Wasla Drivers — Delivery & Trips Driver App"
    },
    "short_description": {
      "ar": "تطبيق جوال للسائقين في منصة «وصلة»: استقبال الطلبات القريبة، تتبّع الرحلة على الخريطة، تفاوض على السعر، دردشة مباشرة مع الزبون ولوحة أرباح وتقييم.",
      "fr": "Application mobile pour les chauffeurs de la plateforme « Wasla » : commandes à proximité, suivi du trajet sur la carte, négociation du prix, chat direct avec le client et tableau de gains et de notes.",
      "en": "Mobile app for drivers on the “Wasla” platform: nearby orders, live trip tracking on the map, price negotiation, direct chat with the customer and an earnings and rating dashboard."
    },
    "full_description": {
      "ar": "«وصلة» منصة جزائرية للتوصيل والصفقات تربط الزبون بالسائق مباشرة، وهذا المشروع هو تطبيق السائق بهوية خضراء واضحة. تبدأ التجربة بشاشة ترحيب ثم لوحة تحكم تعرض حالة الاتصال (متصل/غير متصل) بمفتاح واحد، وعدد الطلبات المكتملة والجارية، والتقييم، وإجمالي الأرباح الشهرية ومتوسط قيمة الطلب. تصل الطلبات القريبة من السائق مع مسافة الزبون، فيتفاوض على السعر مع الزبون، ثم يبدأ الرحلة على خريطة تعرض مسار الذهاب لنقطة الاستلام ثم التسليم مع المؤقّت والمسافة والوقت المقدّر والأجرة، وزر «تم التوصيل» لإنهاء الطلب. كما يضم التطبيق دردشة فورية بين السائق والزبون مع قبول أو رفض الطلب في أي وقت، وصفحة حساب فيها نسبة الإنجاز والطلبات المكتملة وبيانات المركبة وتعديل الملف الشخصي، مع دعم مباشر على مدار الساعة. وأُعدّت لحملة التسويق تصاميم ترويجية للتطبيق (للسائقين وللزبائن) ولقطات لمتجر التطبيقات.",
      "fr": "« Wasla » est une plateforme algérienne de livraison et de courses qui relie directement client et chauffeur ; ce projet est l'application chauffeur, à l'identité verte. L'expérience commence par un écran d'accueil puis un tableau de bord avec le statut (en ligne / hors ligne) en un geste, les commandes terminées et en cours, la note et les gains mensuels avec la valeur moyenne par commande. Les commandes proches arrivent avec la distance du client ; le chauffeur négocie le prix, puis lance le trajet sur une carte affichant l'itinéraire vers le point de retrait puis de livraison, avec chrono, distance, durée estimée et tarif, et un bouton « Livré » pour clôturer. L'application inclut un chat instantané chauffeur-client avec acceptation ou refus à tout moment, et une page compte avec taux de réussite, commandes terminées, données du véhicule et édition du profil, avec support direct 24h/24. Des visuels promotionnels (chauffeurs et clients) et des captures pour les stores ont aussi été conçus.",
      "en": "“Wasla” is an Algerian delivery and trips platform that connects customers and drivers directly; this project is the driver app with a clear green identity. The experience starts with a splash screen, then a dashboard with online/offline status on one switch, completed and ongoing orders, rating, monthly earnings and average order value. Nearby orders reach the driver with the customer's distance; the driver negotiates the price, then starts the trip on a map showing the route to pickup and drop-off with timer, distance, ETA and fare, and a “Delivered” button to close the order. The app also has instant driver–customer chat with accept/decline at any time, and an account page with completion rate, completed orders, vehicle data and profile editing, backed by 24/7 live support. Promotional visuals (drivers and customers) and app-store screenshots were also designed."
    },
    "problem": {
      "ar": "السائقون المستقلون يفتقرون لأداة واحدة تنظّم الطلبات القريبة والتفاوض على السعر والملاحة والتواصل مع الزبون ومتابعة الأرباح، فيضيع وقتهم وتغيب الشفافية.",
      "fr": "Les chauffeurs indépendants n'ont pas d'outil unique pour organiser les commandes proches, négocier le prix, naviguer, échanger avec le client et suivre leurs gains, d'où perte de temps et manque de transparence.",
      "en": "Independent drivers lack a single tool to organize nearby orders, negotiate prices, navigate, talk to customers and track earnings, which wastes time and hurts transparency."
    },
    "solution": {
      "ar": "تطبيق واحد يجمع الطلبات القريبة والتفاوض والخريطة والدردشة ولوحة الأرباح والتقييم، بتصميم أخضر بسيط وواجهة عربية RTL، ليبدأ السائق رحلته ويحقق أرباحاً أفضل.",
      "fr": "Une seule application réunissant commandes proches, négociation, carte, chat, gains et notes, avec un design vert épuré en arabe RTL, pour que le chauffeur démarre et gagne mieux.",
      "en": "One app combining nearby orders, negotiation, map, chat, earnings and rating, with a clean green Arabic RTL design, so drivers can start earning more."
    },
    "features": {
      "ar": [
        "لوحة تحكم: حالة متصل/غير متصل، الطلبات المكتملة والجارية، التقييم",
        "أرباح الشهر ومتوسط قيمة الطلب وأرباح اليوم",
        "طلبات قريبة من السائق مع المسافة والسعر",
        "التفاوض على السعر مع الزبون",
        "خريطة الرحلة بمسار الاستلام والتسليم والمؤقّت والأجرة",
        "زر «تم التوصيل» وعرض الخريطة الكاملة وإحداثيات النقاط",
        "دردشة فورية مع الزبون وقبول أو رفض الطلب",
        "صفحة الحساب: نسبة الإنجاز وبيانات المركبة وتعديل الملف",
        "دعم مباشر على مدار الساعة",
        "هوية خضراء وواجهة عربية RTL مع شاشة ترحيب"
      ],
      "fr": [
        "Tableau de bord : statut en ligne/hors ligne, commandes terminées et en cours, note",
        "Gains du mois, valeur moyenne par commande et gains du jour",
        "Commandes proches avec distance et prix",
        "Négociation du prix avec le client",
        "Carte du trajet : retrait, livraison, chrono et tarif",
        "Bouton « Livré », carte complète et coordonnées des points",
        "Chat instantané avec le client et acceptation/refus de la commande",
        "Page compte : taux de réussite, données du véhicule, édition du profil",
        "Support direct 24h/24",
        "Identité verte et interface arabe RTL avec écran d'accueil"
      ],
      "en": [
        "Dashboard: online/offline status, completed and ongoing orders, rating",
        "Monthly earnings, average order value and today's earnings",
        "Nearby orders with distance and price",
        "Price negotiation with the customer",
        "Trip map with pickup and drop-off route, timer and fare",
        "“Delivered” button, full map view and point coordinates",
        "Instant chat with the customer and accept/decline orders",
        "Account page: completion rate, vehicle data and profile editing",
        "24/7 live support",
        "Green identity and Arabic RTL UI with a splash screen"
      ]
    },
    "cover_image_url": "assets/projects/wasla-driver/cover.webp",
    "thumbnail_url": "assets/projects/wasla-driver/cover.webp",
    "gallery": [
      "assets/projects/wasla-driver/cover.webp",
      "assets/projects/wasla-driver/customer-banner.webp",
      "assets/projects/wasla-driver/splash.webp",
      "assets/projects/wasla-driver/dashboard.webp",
      "assets/projects/wasla-driver/orders.webp",
      "assets/projects/wasla-driver/trip.webp",
      "assets/projects/wasla-driver/chat.webp",
      "assets/projects/wasla-driver/profile.webp"
    ]
  },
  {
      "id": "mawsoul-delivery",
      "featured": false,
      "year": "2026",
      "badge": {
          "ar": "تطبيق توصيل",
          "fr": "Application de livraison",
          "en": "Delivery App"
      },
      "likes_count": 1580,
      "demo_url": "",
      "categories": [
          "mobile"
      ],
      "technologies": [
          "Mobile App",
          "Delivery",
          "Live Tracking",
          "Cart & Checkout",
          "Arabic RTL",
          "DZD"
      ],
      "title": {
          "ar": "موصول — تطبيق توصيل ذكي للمتاجر والمطاعم والبقالة والهدايا",
          "fr": "Mawsoul — Application de livraison intelligente pour boutiques, restaurants, épicerie et cadeaux",
          "en": "Mawsoul — Smart Delivery App for Stores, Restaurants, Groceries & Gifts"
      },
      "short_description": {
          "ar": "تطبيق توصيل بهوية بنفسجية وذهبية: أقسام المتاجر والمطاعم والبقالة والهدايا، سلة مشتريات، تتبّع مباشر للطلب على الخريطة، وطرق دفع وعناوين وإشعارات.",
          "fr": "Application de livraison à l'identité violette et dorée : boutiques, restaurants, épicerie et cadeaux, panier, suivi en direct de la commande sur la carte, moyens de paiement, adresses et notifications.",
          "en": "A delivery app with a purple and gold identity: stores, restaurants, groceries and gifts, shopping cart, live order tracking on a map, payment methods, addresses and notifications."
      },
      "full_description": {
          "ar": "«موصول» (Mawsoul) تطبيق جوال بواجهة عربية وهوية بنفسجية وذهبية وشعار حقيبة بدبوس موقع، تحت شعار «كل ما تحتاجه .. نوصله لك». يبدأ بشاشة تحميل بالشعار وطرد بجناحين، ثم شاشة ترحيب بتسجيل الدخول أو إنشاء حساب أو المتابعة بجوجل وآبل، وشاشة إنشاء حساب برقم هاتف جزائري (+213) وبريد اختياري. تعرض الصفحة الرئيسية الموقع (الجزائر العاصمة) وبحثاً عن منتج أو متجر وبانر «توصيل أسرع في كل مكان» وأقساماً للمتاجر والمطاعم والبقالة والهدايا وعروضاً مميزة مثل خصم 50% وتوصيل مجاني لأول طلب. وتتيح شاشة تفاصيل الطلب تتبعاً مباشراً على الخريطة مع الوقت المتبقي (15 دقيقة) وبيانات السائق وتقييمه وأزرار الاتصال والمحادثة وشريط مراحل الطلب. ويضم التطبيق سلة التسوق بالمجموع بالدينار الجزائري، وطلباتي بحالاتها، وعناويني، وطرق الدفع (بطاقة بنكية، الدفع عند الاستلام، محفظة إلكترونية، PayPal)، والإشعارات، والملف الشخصي، والإعدادات (اللغة والوضع الليلي والمساعدة)، وشاشة «تم التوصيل بنجاح» لتقييم التجربة.",
          "fr": "« Mawsoul » est une application mobile à l'interface arabe, à l'identité violette et dorée, avec un logo en forme de sac et de repère de localisation et le slogan « Tout ce dont vous avez besoin, on vous le livre ». Elle commence par un écran de chargement au logo avec un colis ailé, puis un écran d'accueil (connexion, création de compte, Google et Apple) et un écran d'inscription avec numéro algérien (+213) et e-mail facultatif. L'accueil affiche la position (Alger), la recherche d'un produit ou d'une boutique, la bannière « Livraison plus rapide partout », les catégories boutiques, restaurants, épicerie et cadeaux, et des offres comme -50 % ou la livraison gratuite dès la première commande. L'écran de détails de la commande offre un suivi en direct sur la carte avec le temps restant (15 minutes), le livreur et sa note, les boutons appel et chat et une barre d'étapes. L'application comprend aussi le panier avec total en dinars algériens, mes commandes par statut, mes adresses, les moyens de paiement (carte bancaire, paiement à la livraison, portefeuille électronique, PayPal), les notifications, le profil, les paramètres (langue, mode sombre, aide) et un écran « Livré avec succès » pour noter l'expérience.",
          "en": "“Mawsoul” is a mobile app with an Arabic interface and a purple-and-gold identity, featuring a bag-and-location-pin logo and the tagline “Everything you need… we deliver it to you”. It opens with a logo loading screen and a winged parcel, then a welcome screen (sign in, create account, Google and Apple) and a sign-up screen with an Algerian phone number (+213) and optional email. The home screen shows the location (Algiers), a search for products or stores, a “Faster delivery everywhere” banner, categories for stores, restaurants, groceries and gifts, and featured offers such as 50% off and free delivery on the first order. The order details screen offers live tracking on a map with the remaining time (15 minutes), the courier and rating, call and chat buttons and a step progress bar. The app also includes a shopping cart with the total in Algerian dinars, my orders by status, my addresses, payment methods (bank card, cash on delivery, e-wallet, PayPal), notifications, profile, settings (language, dark mode, help) and a “Delivered successfully” screen to rate the experience."
      },
      "problem": {
          "ar": "الزبون يتنقل بين تطبيقات ومحادثات مختلفة ليطلب من متجر أو مطعم أو بقالة، ولا يعرف أين وصل طلبه ولا متى سيصل، ويصعب عليه تنظيم عناوينه وطرق دفعه.",
          "fr": "Le client jongle entre plusieurs applications et conversations pour commander auprès d'une boutique, d'un restaurant ou d'une épicerie, sans savoir où en est sa commande ni quand elle arrivera, et peine à organiser ses adresses et moyens de paiement.",
          "en": "Customers jump between apps and chats to order from a store, restaurant or grocery, without knowing where their order is or when it will arrive, and struggle to manage their addresses and payment methods."
      },
      "solution": {
          "ar": "تطبيق واحد بالعربية يجمع كل أنواع التوصيل، مع تتبّع مباشر على الخريطة ووقت وصول واضح، وسلة وعناوين وطرق دفع متعددة، وتقييم بعد كل توصيل.",
          "fr": "Une seule application en arabe qui réunit tous les types de livraison, avec suivi en direct sur la carte, heure d'arrivée claire, panier, adresses, plusieurs moyens de paiement et évaluation après chaque livraison.",
          "en": "A single Arabic app that brings every kind of delivery together, with live map tracking and a clear arrival time, a cart, addresses, multiple payment methods and a rating after each delivery."
      },
      "features": {
          "ar": [
              "شاشة تحميل وترحيب بهوية بنفسجية وذهبية",
              "تسجيل الدخول وإنشاء حساب برقم هاتف جزائري أو عبر جوجل وآبل",
              "أقسام: المتاجر، المطاعم، البقالة، الهدايا",
              "عروض مميزة وخصومات وتوصيل مجاني لأول طلب",
              "تتبّع مباشر للطلب على الخريطة مع الوقت المتبقي",
              "بيانات السائق وتقييمه مع اتصال ومحادثة",
              "سلة التسوق بالدينار الجزائري",
              "طلباتي بحالات: الكل، قيد التوصيل، تم التوصيل",
              "إدارة العناوين وطرق الدفع المتعددة",
              "الإشعارات والملف الشخصي والإعدادات ووضع ليلي",
              "تقييم التجربة بعد التوصيل"
          ],
          "fr": [
              "Écrans de chargement et d'accueil à l'identité violette et dorée",
              "Connexion et inscription par numéro algérien, Google ou Apple",
              "Catégories : boutiques, restaurants, épicerie, cadeaux",
              "Offres, remises et livraison gratuite dès la première commande",
              "Suivi en direct de la commande sur la carte avec temps restant",
              "Infos du livreur, note, appel et chat",
              "Panier en dinars algériens",
              "Mes commandes par statut : toutes, en cours, livrées",
              "Gestion des adresses et de plusieurs moyens de paiement",
              "Notifications, profil, paramètres et mode sombre",
              "Évaluation de l'expérience après la livraison"
          ],
          "en": [
              "Loading and welcome screens in a purple and gold identity",
              "Sign-in and sign-up with an Algerian phone number, Google or Apple",
              "Categories: stores, restaurants, groceries, gifts",
              "Featured offers, discounts and free delivery on the first order",
              "Live order tracking on a map with remaining time",
              "Courier details, rating, call and chat",
              "Shopping cart in Algerian dinars",
              "My orders by status: all, in delivery, delivered",
              "Address management and multiple payment methods",
              "Notifications, profile, settings and dark mode",
              "Experience rating after delivery"
          ]
      },
      "cover_image_url": "assets/projects/mawsoul/cover.webp",
      "thumbnail_url": "assets/projects/mawsoul/cover.webp",
      "gallery": [
          "assets/projects/mawsoul/cover.webp",
          "assets/projects/mawsoul/promo.webp",
          "assets/projects/mawsoul/auth.webp",
          "assets/projects/mawsoul/screens.webp"
      ]
  },
  {
    "id": "wasla-web",
    "featured": false,
    "year": "2026",
    "badge": {
      "ar": "موقع ولوحة تحكم",
      "fr": "Site et tableau de bord",
      "en": "Website & Dashboard"
    },
    "likes_count": 1310,
    "demo_url": "",
    "categories": [
      "website",
      "dashboard"
    ],
    "technologies": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Supabase",
      "PostgreSQL",
      "Leaflet",
      "Google Maps",
      "RTL / Arabic"
    ],
    "title": {
      "ar": "وصلة — موقع تعريفي ولوحة تحكم لإدارة التوصيل والسائقين",
      "fr": "Wasla — Site vitrine et tableau de bord de gestion des livraisons et chauffeurs",
      "en": "Wasla — Landing Website & Admin Dashboard for Deliveries and Drivers"
    },
    "short_description": {
      "ar": "موقع تعريفي عصري لمنصة «وصلة» للتوصيل مع تجنيد السائقين وتعليقات الزبائن، ولوحة تحكم إدارية للطلبات والسائقين والخريطة المباشرة والتحليلات والإعدادات.",
      "fr": "Site vitrine moderne pour la plateforme de livraison « Wasla » avec recrutement de chauffeurs et avis clients, et tableau de bord admin : commandes, chauffeurs, carte en direct, analyses et paramètres.",
      "en": "A modern landing website for the “Wasla” delivery platform with driver recruitment and customer feedback, and an admin dashboard for orders, drivers, live map, analytics and settings."
    },
    "full_description": {
      "ar": "يضم المشروع موقعاً تعريفياً بالعربية ولوحة تحكم للمسؤولين لمنصة «وصلة». الموقع يقدّم المنصة بواجهة رئيسية متحركة وإحصائيات (أكثر من 5000 طلب، 200+ سائق، تقييم 4.9، وقت توصيل 30 دقيقة)، وقسم المميزات (تتبّع مباشر، توصيل فائق السرعة، تواصل مع السائق، دفع آمن، إشعارات فورية، نظام تقييم شفاف)، وصفحة موجّهة للسائقين بشروط الانضمام وروابط تحميل التطبيق من Google Play وApp Store، ونموذج تعليقات بتقييم النجوم وعرض آخر التعليقات، ومعلومات الدعم وتذييل بروابط التواصل الاجتماعي. أما لوحة التحكم فتتطلب تسجيل دخول للمشرفين وتعرض نظرة عامة (إجمالي الطلبات والزبائن والسائقين النشطين والإيرادات، رسم الطلبات اليومية، آخر النشاطات، وحالة الطلبات وطرق الدفع وحالة السائقين)، وتدير الطلبات (تصفية، تفاصيل، تصدير CSV) والسائقين والزبائن وطلبات التوثيق وأكواد الخصم والمشرفين، مع خريطة مباشرة لمواقع السائقين، وتحليلات للإيرادات والعمولة ومعدل الإتمام والإلغاء ومتوسط المسافة وقيمة الطلب وتوزيع المسافات وأداء السائقين، وإعدادات تتحكم بنسبة العمولة ورسوم الانطلاق وسعر الكيلومتر والخريطة الافتراضية وروابط المتاجر والسياسات والتواصل الاجتماعي.",
      "fr": "Le projet comprend un site vitrine en arabe et un tableau de bord administrateur pour la plateforme « Wasla ». Le site présente la plateforme avec un hero animé et des statistiques (5000+ commandes, 200+ chauffeurs, note 4,9, livraison en 30 min), les atouts (suivi en direct, livraison ultra-rapide, échange avec le chauffeur, paiement sécurisé, notifications instantanées, notation transparente), une page dédiée aux chauffeurs avec conditions d'inscription et liens Google Play et App Store, un formulaire d'avis avec étoiles et derniers avis, les contacts du support et un pied de page avec réseaux sociaux. Le tableau de bord, à connexion réservée aux admins, affiche une vue d'ensemble (commandes, clients, chauffeurs actifs, revenus, courbe quotidienne, activités récentes, statut des commandes, modes de paiement, état des chauffeurs) et gère commandes (filtres, détails, export CSV), chauffeurs, clients, demandes de vérification, codes promo et superviseurs, avec carte en direct des chauffeurs, analyses (revenus, commission, taux de réussite et d'annulation, distance moyenne, valeur moyenne, répartition des distances, performance des chauffeurs) et paramètres : commission, frais de départ, prix au km, carte par défaut, liens des stores, politiques et réseaux sociaux.",
      "en": "The project has an Arabic landing website and an admin dashboard for the “Wasla” platform. The site presents the platform with an animated hero and stats (5000+ orders, 200+ drivers, 4.9 rating, 30-minute delivery), key features (live tracking, ultra-fast delivery, driver chat, secure payment, instant notifications, transparent rating), a driver-focused page with joining requirements and Google Play / App Store links, a feedback form with star rating and latest reviews, support contacts and a footer with social links. The dashboard, behind an admin login, shows an overview (orders, customers, active drivers, revenue, daily orders chart, recent activity, order status, payment methods, driver status) and manages orders (filters, details, CSV export), drivers, customers, verification requests, discount codes and supervisors, with a live driver map, analytics (revenue, commission, completion and cancellation rates, average distance and order value, distance distribution, driver performance) and settings for commission rate, base fare, per-km rate, default map, store links, policies and social links."
    },
    "problem": {
      "ar": "لم يكن للمنصة واجهة ويب تعرّف بها وتستقطب السائقين وتجمع آراء الزبائن، ولا أداة مركزية لمتابعة الطلبات والسائقين والإيرادات وضبط العمولة والأسعار.",
      "fr": "La plateforme n'avait ni vitrine web pour se présenter, recruter des chauffeurs et recueillir les avis, ni outil central pour suivre commandes, chauffeurs et revenus et régler commission et tarifs.",
      "en": "The platform had no web presence to introduce itself, recruit drivers and collect feedback, and no central tool to follow orders, drivers and revenue and to set commission and pricing."
    },
    "solution": {
      "ar": "موقع واضح يدفع الزائر لتحميل التطبيق والانضمام كسائق، ولوحة تحكم حيّة تعرض الأرقام والخريطة والتحليلات وتتيح تغيير العمولة والأسعار فوراً بدون تعديل في الكود.",
      "fr": "Un site clair qui incite à télécharger l'application et à rejoindre les chauffeurs, et un tableau de bord en direct avec chiffres, carte et analyses, permettant de changer commission et tarifs sans toucher au code.",
      "en": "A clear site that drives app downloads and driver sign-ups, and a live dashboard with figures, map and analytics that lets admins change commission and pricing instantly without touching code."
    },
    "features": {
      "ar": [
        "موقع تعريفي بالعربية بتصميم عصري وواجهة رئيسية متحركة",
        "إحصائيات المنصة وقسم المميزات الست",
        "صفحة للسائقين بشروط الانضمام وروابط تحميل التطبيق",
        "نموذج تعليقات بتقييم النجوم وعرض آخر التعليقات",
        "لوحة تحكم بتسجيل دخول للمشرفين فقط",
        "نظرة عامة: الطلبات والإيرادات وحالة السائقين وطرق الدفع",
        "إدارة الطلبات مع تصفية وتفاصيل وتصدير CSV",
        "خريطة مباشرة لمواقع السائقين النشطين",
        "تحليلات: الإيرادات والعمولة ومعدل الإتمام والإلغاء وأداء السائقين",
        "إعدادات: العمولة ورسوم الانطلاق وسعر الكيلومتر وروابط المتاجر والسياسات"
      ],
      "fr": [
        "Site vitrine en arabe au design moderne avec hero animé",
        "Statistiques de la plateforme et six atouts",
        "Page chauffeurs avec conditions et liens de téléchargement",
        "Formulaire d'avis avec étoiles et derniers avis",
        "Tableau de bord à connexion réservée aux administrateurs",
        "Vue d'ensemble : commandes, revenus, état des chauffeurs, paiements",
        "Gestion des commandes avec filtres, détails et export CSV",
        "Carte en direct des chauffeurs actifs",
        "Analyses : revenus, commission, taux de réussite et d'annulation, performance",
        "Paramètres : commission, frais de départ, prix au km, liens des stores, politiques"
      ],
      "en": [
        "Arabic landing website with a modern design and animated hero",
        "Platform stats and six key features",
        "Driver page with joining requirements and app download links",
        "Feedback form with star rating and latest reviews",
        "Admin-only dashboard login",
        "Overview: orders, revenue, driver status and payment methods",
        "Order management with filters, details and CSV export",
        "Live map of active drivers",
        "Analytics: revenue, commission, completion and cancellation rates, performance",
        "Settings: commission, base fare, per-km rate, store links and policies"
      ]
    },
    "cover_image_url": "assets/projects/wasla-web/cover.webp",
    "thumbnail_url": "assets/projects/wasla-web/cover.webp",
    "gallery": [
      "assets/projects/wasla-web/cover.webp",
      "assets/projects/wasla-web/hero-dark.webp",
      "assets/projects/wasla-web/features.webp",
      "assets/projects/wasla-web/stats-app.webp",
      "assets/projects/wasla-web/download.webp",
      "assets/projects/wasla-web/feedback.webp",
      "assets/projects/wasla-web/contact.webp",
      "assets/projects/wasla-web/dash-login.webp",
      "assets/projects/wasla-web/dash-overview.webp",
      "assets/projects/wasla-web/dash-orders.webp",
      "assets/projects/wasla-web/dash-map.webp",
      "assets/projects/wasla-web/dash-analytics.webp",
      "assets/projects/wasla-web/dash-settings.webp",
      "assets/projects/wasla-web/dash-stores.webp"
    ]
  },
  {
      "id": "edupro-learning",
      "featured": false,
      "year": "2026",
      "badge": {
          "ar": "منصة تعليمية",
          "fr": "Plateforme éducative",
          "en": "E-Learning App"
      },
      "likes_count": 1370,
      "demo_url": "",
      "categories": [
          "mobile"
      ],
      "technologies": [
          "Mobile App",
          "E-Learning",
          "Education",
          "Online Courses",
          "Live Streaming",
          "Video Lessons",
          "Quizzes",
          "Certificates",
          "Arabic RTL"
      ],
      "title": {
          "ar": "EduPro — منصة تعليمية متكاملة بدورات وبث مباشر واختبارات وشهادات",
          "fr": "EduPro — Plateforme d'apprentissage complète avec cours, directs, quiz et certificats",
          "en": "EduPro — Complete Learning Platform with Courses, Live Streams, Quizzes & Certificates"
      },
      "short_description": {
          "ar": "تطبيق تعليمي بالعربية بهوية برتقالية: دورات بالفيديو، بث مباشر مع دردشة، اختبارات بمؤقّت، شهادات إتمام، وملف شخصي بالإنجازات والإحصائيات.",
          "fr": "Application d'apprentissage en arabe à l'identité orange : cours vidéo, directs avec chat, quiz chronométrés, certificats et profil avec réussites et statistiques.",
          "en": "An Arabic learning app with an orange identity: video courses, live streams with chat, timed quizzes, completion certificates, and a profile with achievements and stats."
      },
      "full_description": {
          "ar": "EduPro («تعلّم · اكتشف · انجح») منصة تعليمية متكاملة بواجهة عربية وهوية برتقالية دافئة وشعار قبعة تخرّج. تبدأ بشاشة تحميل ثم شاشة ترحيب بتسجيل الدخول أو إنشاء حساب أو المتابعة عبر جوجل وآبل. تعرض الصفحة الرئيسية تحية للطالب وبانر «بث مباشر الآن» وأقسام المنصة (البرمجة، اللغات، العلوم) ودورات مقترحة. وتضم شاشة الدورات بحثاً وتصفية حسب الفئة مع التقييم وعدد الطلاب، ويقدّم مشغّل الدروس فيديو بتبويبات للأسئلة والملفات والملاحظات وزر «الدرس التالي». ويدعم التطبيق البث المباشر مع دردشة المشاركين، واختبارات بأسئلة متعددة الخيارات ومؤقّت زمني (15 دقيقة). أما الملف الشخصي فيعرض مستوى الطالب وعدد الدورات المكتملة وساعات التعلّم ونسبة التقدّم والأوسمة وإحصائيات التعلّم، مع صفحة «شهاداتي» لتحميل شهادة إتمام الدورة، وإعدادات للإشعارات واللغة والمظهر والخصوصية والدعم.",
          "fr": "EduPro (« Apprends · Explore · Réussis ») est une plateforme d'apprentissage complète à l'interface arabe et à l'identité orange chaleureuse, avec un logo en forme de toque de diplômé. Elle commence par un écran de chargement puis un écran d'accueil (connexion, création de compte, Google et Apple). L'accueil salue l'étudiant et propose une bannière « En direct maintenant », les rubriques (programmation, langues, sciences) et des cours suggérés. L'écran des cours offre recherche et filtres par catégorie avec note et nombre d'étudiants ; le lecteur de leçons propose la vidéo, des onglets questions, fichiers et notes, et un bouton « Leçon suivante ». L'application gère aussi les directs avec chat des participants et des quiz à choix multiples chronométrés (15 minutes). Le profil affiche le niveau, les cours terminés, les heures d'apprentissage, la progression, les badges et des statistiques, avec une page « Mes certificats » pour télécharger l'attestation de réussite, et des paramètres (notifications, langue, apparence, confidentialité, aide).",
          "en": "EduPro (“Learn · Explore · Succeed”) is a complete learning platform with an Arabic interface, a warm orange identity and a graduation-cap logo. It opens with a splash screen and a welcome screen (sign in, create account, Google and Apple). The home screen greets the student and shows a “Live now” banner, platform categories (programming, languages, science) and suggested courses. The courses screen offers search and category filters with ratings and student counts, and the lesson player combines video with tabs for questions, files and notes plus a “Next lesson” button. The app also supports live streams with participant chat and timed multiple-choice quizzes (15 minutes). The profile shows the student's level, completed courses, learning hours, progress, badges and learning stats, with a “My certificates” page to download a course completion certificate, and settings for notifications, language, appearance, privacy and support."
      },
      "problem": {
          "ar": "المتعلّم العربي يتنقّل بين تطبيقات للدروس المسجّلة وأخرى للبث المباشر وثالثة للاختبارات، ولا يملك مكاناً واحداً يتابع فيه تقدّمه ويحصل على شهادة.",
          "fr": "L'apprenant jongle entre des applications pour les cours enregistrés, les directs et les tests, sans lieu unique pour suivre sa progression et obtenir un certificat.",
          "en": "Arabic-speaking learners switch between apps for recorded lessons, live classes and tests, with no single place to track progress and earn a certificate."
      },
      "solution": {
          "ar": "منصة واحدة بالعربية تجمع الدورات المصوّرة والبث المباشر والاختبارات والشهادات، مع ملف شخصي يعرض التقدّم والإنجازات ليبقى المتعلّم متحمّساً.",
          "fr": "Une seule plateforme en arabe réunissant cours vidéo, directs, quiz et certificats, avec un profil qui montre la progression et les réussites pour garder l'élève motivé.",
          "en": "A single Arabic platform that brings video courses, live classes, quizzes and certificates together, with a profile showing progress and achievements to keep learners motivated."
      },
      "features": {
          "ar": [
              "شاشة تحميل وترحيب بهوية برتقالية",
              "تسجيل الدخول وإنشاء حساب أو عبر جوجل وآبل",
              "صفحة رئيسية بتحية وبانر البث المباشر ودورات مقترحة",
              "أقسام: البرمجة، اللغات، العلوم وغيرها",
              "بحث في الدورات وتصفية بالفئة مع التقييم وعدد الطلاب",
              "مشغّل دروس بالفيديو مع تبويبات الأسئلة والملفات والملاحظات",
              "بث مباشر مع دردشة المشاركين",
              "اختبارات متعددة الخيارات بمؤقّت زمني",
              "ملف شخصي بالمستوى والإنجازات والأوسمة والإحصائيات",
              "شهادة إتمام الدورة قابلة للتحميل",
              "إعدادات الإشعارات واللغة والمظهر والخصوصية والدعم"
          ],
          "fr": [
              "Écrans de chargement et d'accueil à l'identité orange",
              "Connexion, inscription, Google et Apple",
              "Accueil avec salutation, bannière de direct et cours suggérés",
              "Rubriques : programmation, langues, sciences et plus",
              "Recherche et filtres de cours avec note et nombre d'étudiants",
              "Lecteur vidéo avec onglets questions, fichiers et notes",
              "Directs avec chat des participants",
              "Quiz à choix multiples chronométrés",
              "Profil : niveau, réussites, badges et statistiques",
              "Certificat de réussite téléchargeable",
              "Paramètres : notifications, langue, apparence, confidentialité, aide"
          ],
          "en": [
              "Splash and welcome screens in an orange identity",
              "Sign-in, sign-up, Google and Apple",
              "Home with greeting, live banner and suggested courses",
              "Categories: programming, languages, science and more",
              "Course search and category filters with ratings and student counts",
              "Video lesson player with questions, files and notes tabs",
              "Live streams with participant chat",
              "Timed multiple-choice quizzes",
              "Profile with level, achievements, badges and learning stats",
              "Downloadable course completion certificate",
              "Settings for notifications, language, appearance, privacy and support"
          ]
      },
      "cover_image_url": "assets/projects/edupro/cover.webp",
      "thumbnail_url": "assets/projects/edupro/cover.webp",
      "gallery": [
          "assets/projects/edupro/cover.webp",
          "assets/projects/edupro/home-live.webp",
          "assets/projects/edupro/courses-lesson-quiz.webp",
          "assets/projects/edupro/profile-certificate.webp"
      ]
  },
  {
    "id": "pixstube",
    "featured": false,
    "year": "2026",
    "badge": {
      "ar": "منصة ويب",
      "fr": "Plateforme web",
      "en": "Web Platform"
    },
    "likes_count": 1250,
    "demo_url": "",
    "categories": [
      "website"
    ],
    "technologies": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "AI Image Generation",
      "Google Sign-In",
      "Responsive Design",
      "Dark / Light Mode"
    ],
    "title": {
      "ar": "Pixstube — مكتبة صور مجانية ومنصة ذكاء اصطناعي لتوليد الصور",
      "fr": "Pixstube — Banque d'images gratuites et plateforme IA de génération d'images",
      "en": "Pixstube — Free Stock Library & AI Image Generation Platform"
    },
    "short_description": {
      "ar": "منصة ويب تجمع مكتبة صور وفيديوهات وموسيقى مجانية بمسابقات ومنتدى ومدوّنة، مع مجموعة أدوات ذكاء اصطناعي: مساعد دردشة ومولّد صور بنماذج متعددة.",
      "fr": "Plateforme web réunissant une banque d'images, vidéos et musiques gratuites avec concours, forum et blog, et une suite IA : assistant conversationnel et générateur d'images multi-modèles.",
      "en": "A web platform combining a free stock library of images, videos and music with contests, a forum and a blog, plus an AI suite: a chat assistant and a multi-model image generator."
    },
    "full_description": {
      "ar": "Pixstube منصة ويب من شقّين. الأول مكتبة مخزون (Stock) تضم أكثر من 5.9 مليون صورة وفيديو وموسيقى بترخيص مجاني، بصفحة رئيسية فيها بحث وتبويبات (صور، رسوم، متجهات، فيديو، موسيقى، مؤثرات صوتية) وكلمات بحث شائعة وتصنيفات، وشبكة صور مع زر «عرض المزيد»، ومجموعات مختارة، ومدوّنة لآخر المقالات، وقسم مجتمع فيه مسابقات ومنتدى ورفع أعمال. الثاني منصة ذكاء اصطناعي بتصميم داكن: مساعد دردشة بمحادثات سابقة وعدد رسائل مجانية، ومولّد صور بوصف نصي وأنماط جاهزة (واقعي، فن رقمي، ثلاثي الأبعاد، أنمي، رسم زيتي، ألوان مائية)، وعرض للنماذج المتاحة (Google وFlux وIdeogram وChatGPT وRunway وغيرها) مع شرح لكل نموذج، وقسم «كيف تنشئ صوراً» بثلاث خطوات، ودروس مرئية، وتذييل بالمنتجات (مولّد فيديو وصوت وAPI وتطبيقا Android وiOS) واختيار اللغة. كما توجد صفحة تسجيل دخول وإنشاء حساب بالبريد أو Google، ووضع فاتح وداكن.",
      "fr": "Pixstube est une plateforme web en deux volets. Le premier est une banque d'images (stock) de plus de 5,9 millions d'images, vidéos et musiques gratuites, avec page d'accueil dotée d'une recherche et d'onglets (photos, illustrations, vecteurs, vidéos, musique, effets sonores), mots-clés populaires et catégories, grille d'images avec « Voir plus », collections, blog et espace communauté (concours, forum, dépôt d'œuvres). Le second est une plateforme IA au design sombre : assistant conversationnel avec historique et messages gratuits, générateur d'images à partir d'un texte avec styles prédéfinis (réaliste, art numérique, 3D, anime, peinture à l'huile, aquarelle), présentation des modèles disponibles (Google, Flux, Ideogram, ChatGPT, Runway, etc.) avec leur description, section « Comment créer des images » en trois étapes, tutoriels vidéo, et pied de page listant les produits (générateur vidéo et voix, API, applications Android et iOS) avec choix de langue. Une page de connexion / inscription par e-mail ou Google et les modes clair et sombre complètent l'ensemble.",
      "en": "Pixstube is a two-part web platform. The first is a stock library of 5.9 million+ free images, videos and music, with a home page offering search and tabs (photos, illustrations, vectors, videos, music, sound effects), popular keywords and categories, an image grid with a “See more” button, curated collections, a blog and a community area with contests, a forum and uploads. The second is a dark-themed AI suite: a chat assistant with conversation history and free messages, a text-to-image generator with preset styles (realistic, digital art, 3D render, anime, oil painting, watercolor), a showcase of available models (Google, Flux, Ideogram, ChatGPT, Runway and more) with descriptions, a three-step “How to create AI images” section, video tutorials, and a footer listing products (video and voice generators, API, Android and iOS apps) with a language selector. A login / sign-up page with email or Google and light and dark modes complete the platform."
    },
    "problem": {
      "ar": "المبدعون يتنقلون بين مواقع متعددة للحصول على صور مجانية وأدوات ذكاء اصطناعي ومجتمع لعرض أعمالهم، مع نماذج توليد متفرقة يصعب مقارنتها.",
      "fr": "Les créateurs jonglent entre plusieurs sites pour trouver des images gratuites, des outils d'IA et une communauté où montrer leur travail, avec des modèles de génération dispersés et difficiles à comparer.",
      "en": "Creators juggle several sites to find free images, AI tools and a community to showcase their work, with scattered generation models that are hard to compare."
    },
    "solution": {
      "ar": "منصة واحدة تجمع مكتبة مخزون ضخمة ومجتمعاً إبداعياً ومولّد صور ومساعد دردشة بعدة نماذج ذكاء اصطناعي، بواجهة نظيفة ووضع فاتح وداكن وتسجيل دخول سريع.",
      "fr": "Une seule plateforme réunissant une grande banque d'images, une communauté créative, un générateur d'images et un assistant conversationnel multi-modèles, avec une interface épurée, modes clair et sombre et connexion rapide.",
      "en": "One platform that brings together a large stock library, a creative community, an image generator and a chat assistant powered by several AI models, with a clean interface, light and dark modes and quick sign-in."
    },
    "features": {
      "ar": [
        "مكتبة صور وفيديو وموسيقى مجانية بأكثر من 5.9 مليون عنصر",
        "بحث وتبويبات للصور والرسوم والمتجهات والفيديو والموسيقى والمؤثرات",
        "مجموعات مختارة وتصنيفات شائعة ومدوّنة",
        "مجتمع: مسابقات ومنتدى ورفع الأعمال",
        "مساعد دردشة بالذكاء الاصطناعي مع سجل محادثات",
        "مولّد صور بوصف نصي وأنماط جاهزة",
        "عرض نماذج متعددة (Google وFlux وIdeogram وChatGPT وRunway وغيرها)",
        "شرح خطوات إنشاء الصور ودروس مرئية",
        "تسجيل دخول بالبريد أو Google ووضع فاتح وداكن",
        "تذييل بالمنتجات (فيديو وصوت وAPI وتطبيقات) واختيار اللغة"
      ],
      "fr": [
        "Banque gratuite de 5,9 millions+ d'images, vidéos et musiques",
        "Recherche et onglets : photos, illustrations, vecteurs, vidéos, musique, effets",
        "Collections, catégories populaires et blog",
        "Communauté : concours, forum et dépôt d'œuvres",
        "Assistant conversationnel IA avec historique",
        "Générateur d'images par texte avec styles prédéfinis",
        "Présentation de modèles multiples (Google, Flux, Ideogram, ChatGPT, Runway…)",
        "Étapes de création d'images et tutoriels vidéo",
        "Connexion par e-mail ou Google, modes clair et sombre",
        "Pied de page produits (vidéo, voix, API, apps) et choix de langue"
      ],
      "en": [
        "Free library of 5.9 million+ images, videos and music",
        "Search and tabs for photos, illustrations, vectors, videos, music and sound effects",
        "Curated collections, popular categories and a blog",
        "Community: contests, forum and uploads",
        "AI chat assistant with conversation history",
        "Text-to-image generator with preset styles",
        "Showcase of multiple models (Google, Flux, Ideogram, ChatGPT, Runway and more)",
        "Step-by-step image creation guide and video tutorials",
        "Email or Google sign-in, light and dark modes",
        "Product footer (video, voice, API, apps) and language selector"
      ]
    },
    "cover_image_url": "assets/projects/pixstube/cover.webp",
    "thumbnail_url": "assets/projects/pixstube/cover.webp",
    "gallery": [
      "assets/projects/pixstube/cover.webp",
      "assets/projects/pixstube/models.webp",
      "assets/projects/pixstube/how-to.webp",
      "assets/projects/pixstube/tutorials.webp",
      "assets/projects/pixstube/ai-chat.webp",
      "assets/projects/pixstube/ai-image.webp",
      "assets/projects/pixstube/auth.webp",
      "assets/projects/pixstube/footer.webp",
      "assets/projects/pixstube/stock-home.webp",
      "assets/projects/pixstube/stock-gallery.webp",
      "assets/projects/pixstube/stock-blog.webp",
      "assets/projects/pixstube/stock-community.webp",
      "assets/projects/pixstube/stock-login.webp"
    ]
  }
,
  {
    id: "domino-game",
    featured: false,
    year: "2026",
    badge: {"ar": "لعبة جوال", "fr": "Jeu mobile", "en": "Mobile Game"},
    likes_count: 1260,
    demo_url: "",
    categories: ["mobile"],
    technologies: ["Flutter", "Dart", "Google Sign-In", "Multiplayer", "Leaderboard", "Rewarded Ads", "RTL / Arabic"],

    title: {
      "ar": "دومينو — لعبة الدومينو العربية مع الأصدقاء والدوري",
      "fr": "Domino — Jeu de dominos en arabe avec amis et tournoi",
      "en": "Domino — Arabic Domino Game with Friends & Tournaments"
    },
    short_description: {
      "ar": "لعبة دومينو للجوال بواجهة عربية RTL: لعب ودّي ضد صديق، مباريات الدوري وترتيب اللاعبين، عملات وجواهر ومستويات، واختيار الأفاتار وتسجيل الدخول بالبريد أو Google.",
      "fr": "Jeu de dominos mobile en arabe RTL : parties amicales, matchs de tournoi avec classement, pièces, gemmes et niveaux, choix d'avatar et connexion par e-mail ou Google.",
      "en": "A mobile domino game with an Arabic RTL interface: friendly matches against a friend, tournament games with a leaderboard, coins, gems and levels, avatar selection and email or Google sign-in."
    },
    full_description: {
      "ar": "«دومينو» لعبة جوال عربية تجمع متعة الدومينو الكلاسيكية مع نظام تقدّم حديث. تبدأ التجربة بشاشة تحميل بشعار اللعبة وقطع دومينو متحركة، ثم تسجيل الدخول أو إنشاء حساب بالبريد الإلكتروني وكلمة المرور أو عبر Google، مع خيار استعادة كلمة المرور. بعد ذلك يختار اللاعب أفاتاره (شاب أو فتاة) بتأثير توهّج يتغيّر لونه حسب الاختيار. الشاشة الرئيسية تعرض بطاقات أنماط اللعب: «العب الآن» بشكل ودّي، «ضد صديق»، «مباريات الدوري» بعدّاد محاولات متبقية (10/10)، و«شاهد واربح» لمكافأة بالعملات، إضافة إلى الصوت والإحصائيات وزر ترتيب الدوري. يعرض الحساب اسم اللاعب ورصيده من العملات والجواهر والنقاط والمستوى، وتفتح بطاقة الملف الشخصي بالبريد والمستوى وخبرة XP. وتضم صفحة ترتيب الدوري قائمة اللاعبين بالميداليات الذهبية والفضية والبرونزية ونقاط كل لاعب وموضعك الحالي وحالة الدوري.",
      "fr": "« Domino » est un jeu mobile arabe qui allie le plaisir du domino classique à un système de progression moderne. L'expérience débute par un écran de chargement avec le logo et des dominos animés, puis la connexion ou la création de compte par e-mail et mot de passe ou via Google, avec récupération du mot de passe. Le joueur choisit ensuite son avatar (garçon ou fille) avec un halo lumineux dont la couleur change selon le choix. L'écran d'accueil propose des cartes de modes : « Jouer maintenant » en mode amical, « Contre un ami », « Matchs du tournoi » avec compteur de tentatives restantes (10/10) et « Regarde et gagne » pour une récompense en pièces, avec le son, les statistiques et le bouton de classement. Le compte affiche le pseudo, les pièces, les gemmes, les points et le niveau, et la carte de profil montre l'e-mail, le niveau et l'XP. La page de classement liste les joueurs avec médailles or, argent et bronze, leurs points, votre position actuelle et l'état du tournoi.",
      "en": "“Domino” is an Arabic mobile game that blends classic dominoes with a modern progression system. The experience starts with a loading screen showing the logo and animated domino tiles, then sign-in or sign-up with email and password or Google, with password recovery. The player then picks an avatar (boy or girl) with a glowing ring whose color changes with the selection. The home screen offers game-mode cards: “Play now” for friendly games, “Vs a friend”, “Tournament matches” with a remaining-attempts counter (10/10) and “Watch & win” for a coin reward, plus sound, stats and a leaderboard button. The top bar shows the player's name, coins, gems, points and level, and a profile card shows email, level and XP. The leaderboard page lists players with gold, silver and bronze medals, their points, your current rank and the tournament status."
    },
    problem: {
      "ar": "ألعاب الدومينو المتوفرة قلّما تقدّم واجهة عربية أصيلة بنظام دوري وترتيب ومكافآت يحفّز اللاعب على العودة واللعب مع الأصدقاء.",
      "fr": "Les jeux de dominos existants offrent rarement une vraie interface arabe avec tournoi, classement et récompenses qui incitent à revenir et à jouer entre amis.",
      "en": "Existing domino games rarely offer a native Arabic interface with tournaments, rankings and rewards that keep players coming back and playing with friends."
    },
    solution: {
      "ar": "لعبة بواجهة عربية RTL بتصميم ليلي أنيق، تجمع اللعب الودّي والدوري والترتيب والعملات والمستويات وتسجيل دخول سريع، لتجربة ممتعة وتنافسية.",
      "fr": "Un jeu à l'interface arabe RTL au design nocturne soigné, réunissant parties amicales, tournoi, classement, pièces, niveaux et connexion rapide pour une expérience fun et compétitive.",
      "en": "A game with a polished dark Arabic RTL design that combines friendly play, tournaments, rankings, coins, levels and quick sign-in for a fun, competitive experience."
    },
    features: {
      "ar": [
        "تسجيل الدخول وإنشاء حساب بالبريد الإلكتروني أو Google",
        "استعادة كلمة المرور وإظهار/إخفاء كلمتها",
        "اختيار الأفاتار (شاب/فتاة) بتأثير توهّج متغيّر اللون",
        "اللعب الودّي والمباراة ضد صديق",
        "مباريات الدوري بعدّاد محاولات متبقية",
        "ترتيب الدوري بميداليات ذهبية وفضية وبرونزية وموضعك الحالي",
        "العملات والجواهر والنقاط والمستويات وخبرة XP",
        "«شاهد واربح»: مكافأة عملات مقابل مشاهدة إعلان",
        "بطاقة الملف الشخصي وإحصائيات اللاعب",
        "واجهة عربية RTL وشاشة تحميل بقطع دومينو متحركة"
      ],
      "fr": [
        "Connexion et inscription par e-mail ou Google",
        "Récupération du mot de passe et affichage/masquage de celui-ci",
        "Choix d'avatar (garçon/fille) avec halo lumineux changeant de couleur",
        "Parties amicales et match contre un ami",
        "Matchs de tournoi avec compteur de tentatives restantes",
        "Classement avec médailles or, argent, bronze et votre position",
        "Pièces, gemmes, points, niveaux et XP",
        "« Regarde et gagne » : pièces en échange d'une publicité",
        "Carte de profil et statistiques du joueur",
        "Interface arabe RTL et écran de chargement avec dominos animés"
      ],
      "en": [
        "Sign-in and sign-up with email or Google",
        "Password recovery and show/hide password toggle",
        "Avatar selection (boy/girl) with a color-changing glow",
        "Friendly games and a match against a friend",
        "Tournament matches with a remaining-attempts counter",
        "Leaderboard with gold, silver and bronze medals and your current rank",
        "Coins, gems, points, levels and XP",
        "“Watch & win”: coin reward for watching an ad",
        "Profile card and player stats",
        "Arabic RTL UI and a loading screen with animated domino tiles"
      ]
    },
    cover_image_url: "assets/projects/domino/cover.webp",
    thumbnail_url: "assets/projects/domino/cover.webp",
    gallery: [
      "assets/projects/domino/cover.webp",
      "assets/projects/domino/splash.webp",
      "assets/projects/domino/login.webp",
      "assets/projects/domino/signup.webp",
      "assets/projects/domino/avatar-boy.webp",
      "assets/projects/domino/avatar-girl.webp",
      "assets/projects/domino/home.webp",
      "assets/projects/domino/profile.webp",
      "assets/projects/domino/leaderboard.webp"
    ]
  },
  {
    id: "mawadda-app",
    featured: false,
    year: "2025",
    badge: {"ar": "تطبيق جوال", "fr": "Application mobile", "en": "Mobile App"},
    likes_count: 1380,
    demo_url: "",
    categories: ["mobile"],
    technologies: ["Flutter", "Dart", "Real-time Chat", "Dark / Light Theme", "Search Filters", "RTL / Arabic"],

    title: {
      "ar": "مودّة — تطبيق للزواج الشرعي",
      "fr": "Mawadda — Application de mariage conforme à la charia",
      "en": "Mawadda — Sharia-Compliant Marriage App"
    },
    short_description: {
      "ar": "تطبيق جوال للتعارف بغرض الزواج الشرعي: تسجيل بملف مفصّل، تصفّح الرجال والنساء مع فلترة، المفضّلة، طلبات الرؤية الشرعية ومحادثات منضبطة، بوضعين فاتح وداكن وواجهة عربية RTL.",
      "fr": "Application mobile de rencontre en vue d'un mariage conforme à la charia : inscription avec profil détaillé, navigation hommes/femmes avec filtres, favoris, demandes de vision légale et conversations encadrées, en thèmes clair et sombre et interface arabe RTL.",
      "en": "A mobile app for Sharia-compliant marriage introductions: detailed sign-up profile, men/women browsing with filters, favorites, legal-viewing requests and guided chats, in light and dark themes with an Arabic RTL interface."
    },
    full_description: {
      "ar": "«مودّة» تطبيق عربي مخصّص للزواج الشرعي. يبدأ بشاشة تحميل بشعار التطبيق ثم شاشة ترحيب بزرّي تسجيل الدخول وإنشاء حساب، وتظهر رسالة ترحيبية تشرح غاية التطبيق وضوابطه قبل البدء. يطلب التسجيل بيانات مثل البريد الإلكتروني والاسم الكامل واسم الأب والجنس وتاريخ الميلاد ورقم الهاتف وكلمة المرور. الصفحة الرئيسية تعرض بطاقات الأعضاء بتبويب «الرجال» و«النساء» وزر للفلترة، وكل بطاقة تحمل رقم العضو والمكان والعمر والحالة الاجتماعية وزر المفضّلة، مع شريط تنقّل سفلي (الرئيسية، المفضّلة، الطلبات، المحادثات). تعرض صفحة العضو معلومات مفصّلة مثل الحالة الاجتماعية والطول والوزن ولون البشرة وتاريخ الميلاد والبلد والولاية والمظهر والمستوى التعليمي. وتتيح المحادثات تواصلاً منضبطاً مع طلب «الرؤية الشرعية» وتنبيه أخلاقي بآية قرآنية قبل الكتابة، كما يقدّم التطبيق صفحة «ملفي» لتعديل البيانات الشخصية، ويدعم الوضعين الفاتح والداكن.",
      "fr": "« Mawadda » est une application arabe dédiée au mariage conforme à la charia. Elle débute par un écran de chargement avec le logo, puis un écran d'accueil avec connexion et création de compte, et un message de bienvenue expliquant l'objectif et les règles de l'application. L'inscription demande e-mail, nom complet, nom du père, sexe, date de naissance, téléphone et mot de passe. La page d'accueil présente des cartes de membres avec onglets « Hommes » et « Femmes » et un bouton de filtre ; chaque carte indique le numéro du membre, le lieu, l'âge, la situation familiale et un bouton favori, avec une barre de navigation (Accueil, Favoris, Demandes, Conversations). La fiche d'un membre détaille situation familiale, taille, poids, teint, date de naissance, pays, wilaya, apparence et niveau d'études. Les conversations sont encadrées, avec une demande de « vision légale » et un rappel éthique avec un verset coranique avant d'écrire. L'application propose aussi la page « Mon profil » et les thèmes clair et sombre.",
      "en": "“Mawadda” is an Arabic app dedicated to Sharia-compliant marriage. It starts with a loading screen showing the logo, then a welcome screen with sign-in and sign-up buttons and a welcome message explaining the app's purpose and rules. Registration collects email, full name, father's name, gender, date of birth, phone number and password. The home page shows member cards with “Men” and “Women” tabs and a filter button; each card shows the member ID, location, age, marital status and a favorite button, with a bottom navigation bar (Home, Favorites, Requests, Chats). A member page details marital status, height, weight, skin tone, birth date, country, state, appearance and education level. Chats are guided, with a “legal viewing” request and an ethical reminder with a Quranic verse before typing. The app also offers a “My profile” page and light and dark themes."
    },
    problem: {
      "ar": "الراغبون في الزواج الشرعي يحتاجون منصة جادة تحفظ الخصوصية والضوابط الشرعية، بدل التعارف العشوائي عبر وسائل التواصل.",
      "fr": "Les personnes souhaitant un mariage conforme à la charia ont besoin d'une plateforme sérieuse qui respecte la vie privée et les règles religieuses, plutôt que des rencontres aléatoires sur les réseaux sociaux.",
      "en": "People seeking a Sharia-compliant marriage need a serious platform that respects privacy and religious rules, instead of random introductions on social media."
    },
    solution: {
      "ar": "تطبيق بملفات تعريفية مفصّلة وفلترة وتصفّح منظّم ومحادثات منضبطة وطلبات رؤية شرعية، بتصميم هادئ بوضعين فاتح وداكن وواجهة عربية RTL.",
      "fr": "Une application avec profils détaillés, filtres, navigation structurée, conversations encadrées et demandes de vision légale, au design apaisé en thèmes clair et sombre et interface arabe RTL.",
      "en": "An app with detailed profiles, filters, organized browsing, guided chats and legal-viewing requests, in a calm design with light and dark themes and an Arabic RTL interface."
    },
    features: {
      "ar": [
        "شاشة تحميل وترحيب برسالة تعريفية بضوابط التطبيق",
        "تسجيل الدخول وإنشاء حساب ببيانات مفصّلة",
        "تصفّح الأعضاء بتبويب الرجال والنساء مع فلترة",
        "بطاقات تعرض رقم العضو والمكان والعمر والحالة الاجتماعية",
        "قائمة المفضّلة",
        "صفحة تفاصيل العضو: الطول والوزن والمظهر والمستوى التعليمي وغيرها",
        "محادثات منضبطة مع طلب الرؤية الشرعية",
        "تنبيه أخلاقي بآية قرآنية قبل بدء المراسلة",
        "صفحة «ملفي» لتعديل المعلومات الشخصية",
        "وضع فاتح ووضع داكن وواجهة عربية RTL"
      ],
      "fr": [
        "Écran de chargement et d'accueil avec message présentant les règles",
        "Connexion et inscription avec données détaillées",
        "Navigation hommes/femmes avec filtres",
        "Cartes affichant numéro, lieu, âge et situation familiale",
        "Liste de favoris",
        "Fiche membre : taille, poids, apparence, niveau d'études, etc.",
        "Conversations encadrées avec demande de vision légale",
        "Rappel éthique avec verset coranique avant d'écrire",
        "Page « Mon profil » pour modifier ses informations",
        "Thèmes clair et sombre et interface arabe RTL"
      ],
      "en": [
        "Loading and welcome screens with a message presenting the app's rules",
        "Sign-in and sign-up with detailed data",
        "Men/Women browsing with filters",
        "Cards showing member ID, location, age and marital status",
        "Favorites list",
        "Member page: height, weight, appearance, education level and more",
        "Guided chats with a legal-viewing request",
        "Ethical reminder with a Quranic verse before messaging",
        "“My profile” page to edit personal information",
        "Light and dark themes and an Arabic RTL interface"
      ]
    },
    cover_image_url: "assets/projects/mawadda/cover.webp",
    thumbnail_url: "assets/projects/mawadda/cover.webp",
    gallery: [
      "assets/projects/mawadda/cover.webp",
      "assets/projects/mawadda/splash.webp",
      "assets/projects/mawadda/welcome.webp",
      "assets/projects/mawadda/intro.webp",
      "assets/projects/mawadda/login.webp",
      "assets/projects/mawadda/register.webp",
      "assets/projects/mawadda/home-men.webp",
      "assets/projects/mawadda/home-women.webp",
      "assets/projects/mawadda/favorites.webp",
      "assets/projects/mawadda/user-details.webp",
      "assets/projects/mawadda/chats.webp",
      "assets/projects/mawadda/chat.webp",
      "assets/projects/mawadda/chat-notice.webp",
      "assets/projects/mawadda/profile.webp"
    ]
  },
  {
    id: "lygend-gym",
    featured: false,
    year: "2025",
    badge: {"ar": "تطبيق جوال وسطح المكتب", "fr": "Application mobile et desktop", "en": "Mobile & Desktop App"},
    likes_count: 1290,
    demo_url: "",
    categories: ["mobile", "dashboard"],
    technologies: ["Flutter", "Dart", "Desktop App", "Dark / Light Theme", "Multi-language", "Subscriptions"],

    title: {
      "ar": "Lygend Gym — تطبيق اشتراكات النادي الرياضي ولوحة إدارة الفروع",
      "fr": "Lygend Gym — Application d'abonnements de salle de sport et gestion des branches",
      "en": "Lygend Gym — Gym Subscriptions App & Branch Management"
    },
    short_description: {
      "ar": "تطبيق جوال لنادي رياضي متعدد الفروع: حساب شخصي، عروض وبانرات، اشتراكات للرجال والنساء بالدينار الجزائري، وتطبيق سطح مكتب لإدارة الفروع والاشتراكات، بوضعين فاتح وداكن.",
      "fr": "Application mobile pour une salle de sport multi-branches : compte personnel, offres et bannières, abonnements hommes et femmes en dinars algériens, et application desktop pour gérer branches et abonnements, en thèmes clair et sombre.",
      "en": "A mobile app for a multi-branch gym: personal account, offers and banners, men's and women's subscriptions priced in Algerian dinars, and a desktop app to manage branches and subscriptions, in light and dark themes."
    },
    full_description: {
      "ar": "يضم المشروع تطبيقاً للجوال وتطبيقاً لسطح المكتب لنادي «Lygend Gym» الرياضي. يبدأ تطبيق الجوال بشاشة تحميل بشعار النادي ثم تسجيل الدخول أو إنشاء حساب بالاسم والبريد وكلمة المرور ورقم الهاتف مع صورة شخصية وموافقة على الشروط وسياسة الخصوصية، مع زر لتبديل اللغة والوضع الفاتح/الداكن. الصفحة الرئيسية تعرض بحثاً وعروضاً بانرات مثل «خصم يصل إلى 50%»، وأيقونات سريعة (نساء، رجال، القوانين، النادي، الكارديو، الفروع) وبطاقات فروع النادي وزر «اشترك الآن». صفحة الاشتراكات تعرض باقات الرجال والنساء بالأسعار بالدينار الجزائري (شهرية وحصص) مع ملاحظة رسوم البطاقة عند أول تسجيل. وتتيح صفحة الملف الشخصي عرض بيانات العضو. أما تطبيق سطح المكتب فيعرض شاشة قفل بالشعار وصفحة الفروع، ولوحة لكل فرع بجدول الاشتراكات وبيانات الأعضاء وأسعارها وتواريخ إنشائها، كما يتيح إدارة بانرات الصفحة الرئيسية للتطبيق (تعديل وحذف).",
      "fr": "Le projet comprend une application mobile et une application desktop pour la salle de sport « Lygend Gym ». L'application mobile débute par un écran de chargement au logo, puis connexion ou création de compte (nom, e-mail, mot de passe, téléphone, photo de profil) avec acceptation des conditions et de la politique de confidentialité, et boutons de langue et de thème clair/sombre. L'accueil propose une recherche, des bannières d'offres comme « jusqu'à 50 % de réduction », des icônes rapides (femmes, hommes, règlement, salle, cardio, branches), les cartes des branches et un bouton « S'abonner ». La page des abonnements présente les formules hommes et femmes en dinars algériens (mensuel et séances) avec une note sur les frais de carte à la première inscription, et la page profil affiche les données du membre. L'application desktop affiche un écran de verrouillage au logo et la page des branches, puis un tableau de bord par branche avec la liste des abonnements, les membres, leurs prix et dates de création, et la gestion des bannières de l'accueil mobile (modifier et supprimer).",
      "en": "The project includes a mobile app and a desktop app for the “Lygend Gym” fitness club. The mobile app starts with a logo loading screen, then sign-in or sign-up (name, email, password, phone, profile photo) with terms and privacy-policy acceptance, plus language and light/dark theme switches. The home screen offers search, offer banners such as “up to 50% off”, quick icons (women, men, rules, gym, cardio, branches), branch cards and a “Subscribe Now” button. The subscriptions page lists men's and women's plans priced in Algerian dinars (monthly and sessions) with a note about the card fee at first registration, and the profile page shows member data. The desktop app shows a branded lock screen and a branches page, then a per-branch dashboard with the subscriptions table, members, prices and creation dates, and management of the mobile home banners (edit and delete)."
    },
    problem: {
      "ar": "النوادي متعددة الفروع تعتمد على إدارة يدوية للاشتراكات والعروض، ويصعب على الأعضاء معرفة الباقات والأسعار والاشتراك بسهولة.",
      "fr": "Les salles multi-branches gèrent souvent abonnements et offres à la main, et les membres ont du mal à connaître les formules, les prix et à s'abonner facilement.",
      "en": "Multi-branch gyms often manage subscriptions and offers manually, and members struggle to see plans, prices and subscribe easily."
    },
    solution: {
      "ar": "تطبيق جوال سهل للأعضاء للاطلاع على الفروع والعروض والاشتراك، وتطبيق سطح مكتب للإدارة لمتابعة الاشتراكات في كل فرع وتحديث البانرات، بهوية صفراء وسوداء قوية.",
      "fr": "Une application mobile simple pour consulter branches et offres et s'abonner, et une application desktop pour suivre les abonnements par branche et mettre à jour les bannières, avec une identité jaune et noire forte.",
      "en": "An easy mobile app for members to browse branches and offers and subscribe, and a desktop app for staff to follow subscriptions per branch and update banners, with a bold yellow-and-black identity."
    },
    features: {
      "ar": [
        "شاشة تحميل بشعار النادي وتسجيل الدخول وإنشاء حساب بصورة شخصية",
        "الموافقة على الشروط وسياسة الخصوصية عند التسجيل",
        "تبديل اللغة والوضع الفاتح/الداكن",
        "بحث وبانرات عروض (خصم يصل إلى 50%)",
        "أيقونات سريعة: نساء، رجال، القوانين، النادي، الكارديو، الفروع",
        "بطاقات فروع النادي",
        "باقات اشتراك للرجال والنساء بالدينار الجزائري",
        "صفحة الملف الشخصي للعضو",
        "تطبيق سطح مكتب: شاشة قفل وصفحة الفروع",
        "لوحة فرع بجدول الاشتراكات وإدارة بانرات الرئيسية (تعديل/حذف)"
      ],
      "fr": [
        "Écran de chargement au logo, connexion et inscription avec photo de profil",
        "Acceptation des conditions et de la politique de confidentialité",
        "Changement de langue et de thème clair/sombre",
        "Recherche et bannières d'offres (jusqu'à -50 %)",
        "Icônes rapides : femmes, hommes, règlement, salle, cardio, branches",
        "Cartes des branches",
        "Formules d'abonnement hommes et femmes en dinars algériens",
        "Page profil du membre",
        "Application desktop : écran de verrouillage et page des branches",
        "Tableau de bord par branche avec abonnements et gestion des bannières (modifier/supprimer)"
      ],
      "en": [
        "Branded loading screen, sign-in and sign-up with profile photo",
        "Terms and privacy-policy acceptance at registration",
        "Language and light/dark theme switch",
        "Search and offer banners (up to 50% off)",
        "Quick icons: women, men, rules, gym, cardio, branches",
        "Gym branch cards",
        "Men's and women's subscription plans in Algerian dinars",
        "Member profile page",
        "Desktop app: lock screen and branches page",
        "Branch dashboard with subscriptions table and home banner management (edit/delete)"
      ]
    },
    cover_image_url: "assets/projects/lygend-gym/cover.webp",
    thumbnail_url: "assets/projects/lygend-gym/cover.webp",
    gallery: [
      "assets/projects/lygend-gym/cover.webp",
      "assets/projects/lygend-gym/splash.webp",
      "assets/projects/lygend-gym/login.webp",
      "assets/projects/lygend-gym/register.webp",
      "assets/projects/lygend-gym/register-dark.webp",
      "assets/projects/lygend-gym/terms.webp",
      "assets/projects/lygend-gym/home.webp",
      "assets/projects/lygend-gym/home-dark.webp",
      "assets/projects/lygend-gym/subscriptions.webp",
      "assets/projects/lygend-gym/profile.webp",
      "assets/projects/lygend-gym/banners.webp",
      "assets/projects/lygend-gym/desktop-admin.webp"
    ]
  },
  {
      "id": "nova-pet",
      "featured": false,
      "year": "2025",
      "badge": {
          "ar": "متجر مستلزمات حيوانات أليفة",
          "fr": "Boutique pour animaux",
          "en": "Pet Supplies Store"
      },
      "likes_count": 1350,
      "demo_url": "",
      "categories": [
          "mobile",
          "ecommerce",
          "dashboard"
      ],
      "technologies": [
          "Mobile App",
          "E-commerce",
          "Admin Panel",
          "Loyalty Points",
          "Coupons",
          "Invoices (PDF)",
          "Multi-language"
      ],
      "title": {
          "ar": "Nova Pet — متجر مستلزمات الحيوانات الأليفة بنقاط ولاء وكوبونات",
          "fr": "Nova Pet — Boutique d'accessoires pour animaux avec points de fidélité et coupons",
          "en": "Nova Pet — Pet Supplies Store with Loyalty Points & Coupons"
      },
      "short_description": {
          "ar": "تطبيق جوال لمتجر مستلزمات حيوانات أليفة: تصفح المنتجات والتقييمات، سلة وطلبات، شحن وتوصيل، نقاط ولاء، كوبونات خصم وفواتير، مع لوحة إدارة، بواجهة عربية وإنجليزية.",
          "fr": "Application mobile pour une boutique d'accessoires pour animaux : produits et avis, panier et commandes, livraison, points de fidélité, coupons de réduction et factures, avec panneau d'administration, en arabe et en anglais.",
          "en": "A mobile app for a pet supplies store: product browsing and ratings, cart and orders, delivery, loyalty points, discount coupons and invoices, with an admin panel, in Arabic and English."
      },
      "full_description": {
          "ar": "Nova Pet تطبيق جوال متكامل لمتجر إلكتروني لمستلزمات الحيوانات الأليفة. يبدأ بشاشة تحميل بشعار المتجر ثم تسجيل الدخول أو إنشاء حساب بالاسم والبريد وكلمة المرور ورمز دعوة اختياري مع الموافقة على الشروط وسياسة الخصوصية، مع تبديل اللغة بين العربية والإنجليزية. الصفحة الرئيسية تعرض بحثاً وبانرات عروض ومنتجات مميزة، وصفحة المنتج تعرض الصورة والتقييم والوصف واختيار الكمية وزر «أضف إلى السلة» مع آراء العملاء. تتيح السلة تحديد الطلبات وتعديلها أو حذفها ثم تأكيدها، وتعرض شاشة الشحن رقم الهاتف والعنوان وموقع التوصيل وحقل كود الخصم مع ملخص المبلغ (المجموع الفرعي ورسوم التوصيل والمبلغ النهائي) والنقاط المكتسبة والمتاحة. ويتابع العميل طلباته وحالتها (قيد الانتظار، تم التسليم) ويحمّل فاتورة PDF لكل طلب، ويعرض ملفه الشخصي بياناته ونقاطه. وتتيح لوحة الإدارة عرض المنتجات وتوليد كوبونات خصم بنسبة مئوية وحد أقصى للاستخدام تُحفظ في قاعدة البيانات.",
          "fr": "Nova Pet est une application mobile complète pour une boutique en ligne d'accessoires pour animaux. Elle démarre par un écran de chargement au logo, puis connexion ou création de compte (nom, e-mail, mot de passe, code d'invitation facultatif) avec acceptation des conditions et de la politique de confidentialité, et changement de langue arabe/anglais. L'accueil propose recherche, bannières d'offres et produits en vedette ; la fiche produit affiche l'image, la note, la description, le choix de quantité, le bouton « Ajouter au panier » et les avis clients. Le panier permet de sélectionner, modifier ou supprimer des commandes puis de les confirmer ; l'écran de livraison affiche téléphone, adresse, lieu de livraison et champ de code promo, avec le récapitulatif (sous-total, frais de livraison, montant final) et les points gagnés et disponibles. Le client suit ses commandes et leur statut (en attente, livré), télécharge une facture PDF pour chacune et consulte son profil et ses points. Le panneau d'administration permet de voir les produits et de générer des coupons de réduction (pourcentage et nombre maximal d'utilisations) enregistrés en base de données.",
          "en": "Nova Pet is a complete mobile app for an online pet supplies store. It starts with a branded loading screen, then sign-in or sign-up (name, email, password, optional invitation code) with terms and privacy-policy acceptance, and an Arabic/English language switch. The home screen offers search, offer banners and featured products; the product page shows the image, rating, description, quantity selector, an “Add to Cart” button and customer reviews. The cart lets users select, edit or delete orders and then confirm them; the shipping screen shows phone, address, delivery location and a coupon field, with a summary (subtotal, delivery fee, final amount) and points earned and available. Customers track orders and their status (pending, delivered), download a PDF invoice for each, and view their profile and points. The admin panel lets staff view products and generate discount coupons (percentage and maximum usage count) saved to the database."
      },
      "problem": {
          "ar": "المتاجر الصغيرة للحيوانات الأليفة تفتقر غالباً إلى قناة طلب مباشرة وسهلة، وتدير الطلبات والخصومات والفواتير يدوياً دون تحفيز العملاء على العودة.",
          "fr": "Les petites boutiques pour animaux manquent souvent d'un canal de commande simple et direct, et gèrent commandes, remises et factures à la main, sans fidéliser leurs clients.",
          "en": "Small pet stores often lack a simple, direct ordering channel and handle orders, discounts and invoices manually, with nothing to bring customers back."
      },
      "solution": {
          "ar": "تطبيق يجمع التصفح والسلة والشحن والفواتير في تجربة واحدة، مع نقاط ولاء وكوبونات خصم تُولَّد من لوحة الإدارة بنقرات قليلة، وواجهة ثنائية اللغة تناسب العملاء المحليين.",
          "fr": "Une application qui réunit catalogue, panier, livraison et factures dans une seule expérience, avec points de fidélité et coupons générés en quelques clics depuis le panneau d'administration, et une interface bilingue adaptée aux clients locaux.",
          "en": "An app that brings browsing, cart, delivery and invoices into one experience, with loyalty points and discount coupons generated in a few taps from the admin panel, and a bilingual interface suited to local customers."
      },
      "features": {
          "ar": [
              "شاشة تحميل بشعار المتجر وتسجيل الدخول وإنشاء حساب برمز دعوة اختياري",
              "تبديل اللغة بين العربية والإنجليزية",
              "بحث وبانرات عروض ومنتجات مميزة",
              "صفحة منتج بتقييم ووصف واختيار الكمية وآراء العملاء",
              "سلة طلبات بتحديد وتعديل وحذف وتأكيد",
              "شاشة شحن بالعنوان وموقع التوصيل وكود الخصم",
              "ملخص المبلغ مع رسوم التوصيل",
              "نقاط ولاء مكتسبة ومتاحة",
              "متابعة الطلبات وحالتها مع فاتورة PDF",
              "لوحة إدارة لتوليد كوبونات خصم بنسبة وحد استخدام"
          ],
          "fr": [
              "Écran de chargement au logo, connexion et inscription avec code d'invitation facultatif",
              "Changement de langue arabe/anglais",
              "Recherche, bannières d'offres et produits en vedette",
              "Fiche produit avec note, description, quantité et avis clients",
              "Panier avec sélection, modification, suppression et confirmation",
              "Écran de livraison avec adresse, lieu et code promo",
              "Récapitulatif du montant avec frais de livraison",
              "Points de fidélité gagnés et disponibles",
              "Suivi des commandes et statut avec facture PDF",
              "Panneau d'administration pour générer des coupons (pourcentage et limite d'usage)"
          ],
          "en": [
              "Branded loading screen, sign-in and sign-up with optional invitation code",
              "Arabic/English language switch",
              "Search, offer banners and featured products",
              "Product page with rating, description, quantity and customer reviews",
              "Cart with select, edit, delete and confirm",
              "Shipping screen with address, delivery location and coupon code",
              "Amount summary with delivery fee",
              "Loyalty points earned and available",
              "Order tracking and status with PDF invoice",
              "Admin panel to generate discount coupons (percentage and usage limit)"
          ]
      },
      "cover_image_url": "assets/projects/nova-pet/cover.webp",
      "thumbnail_url": "assets/projects/nova-pet/cover.webp",
      "gallery": [
          "assets/projects/nova-pet/cover.webp",
          "assets/projects/nova-pet/splash.webp",
          "assets/projects/nova-pet/login.webp",
          "assets/projects/nova-pet/register.webp",
          "assets/projects/nova-pet/home.webp",
          "assets/projects/nova-pet/product.webp",
          "assets/projects/nova-pet/cart.webp",
          "assets/projects/nova-pet/shipping.webp",
          "assets/projects/nova-pet/coupon-form.webp",
          "assets/projects/nova-pet/coupon-generated.webp",
          "assets/projects/nova-pet/orders.webp",
          "assets/projects/nova-pet/invoice.webp",
          "assets/projects/nova-pet/profile.webp"
      ]
  },
  {
      "id": "novamart-store",
      "featured": false,
      "year": "2025",
      "badge": {
          "ar": "متجر إلكتروني",
          "fr": "Boutique en ligne",
          "en": "Online Store"
      },
      "likes_count": 1420,
      "demo_url": "",
      "categories": [
          "mobile",
          "ecommerce"
      ],
      "technologies": [
          "Mobile App",
          "E-commerce",
          "Google Sign-In",
          "Inventory",
          "Discounts",
          "DZD"
      ],
      "title": {
          "ar": "Novamart — متجر إلكتروني للملابس بعروض وإدارة مخزون",
          "fr": "Novamart — Boutique de vêtements en ligne avec promotions et gestion de stock",
          "en": "Novamart — Online Clothing Store with Deals & Inventory"
      },
      "short_description": {
          "ar": "تطبيق جوال لمتجر ملابس: تسجيل بحساب جوجل، عروض ساخنة بنسب خصم، أحدث المنتجات بالدينار الجزائري، وصفحة مخزون لمتابعة الكميات.",
          "fr": "Application mobile pour une boutique de vêtements : connexion Google, offres du moment avec remises, derniers produits en dinars algériens et page de stock pour suivre les quantités.",
          "en": "A mobile app for a clothing store: Google sign-in, hot deals with discount rates, latest products priced in Algerian dinars, and an inventory page to track quantities."
      },
      "full_description": {
          "ar": "Novamart تطبيق جوال لمتجر إلكتروني لبيع الملابس. يبدأ بشاشة تحميل بشعار المتجر ثم شاشة «أنشئ حسابك الآن» مع تسجيل سريع بحساب جوجل. تعرض صفحة الخصومات قسم «العروض الساخنة» ببطاقات المنتجات والأسعار القديمة والجديدة ونسبة الخصم (مثل 20%) وقيمة التوفير، يليه قسم «أحدث المنتجات» بالأسعار بالدينار الجزائري، مع بحث وسلة مشتريات. ويضم التطبيق صفحة «مخزوني» تعرض المنتجات وكمياتها المتبقية بأشرطة تقدّم ومدة التوفر، وزر إضافة سريع، وشريط تنقل سفلي بين الرئيسية والخصومات والطلبات والملف الشخصي والمخزون.",
          "fr": "Novamart est une application mobile pour une boutique de vêtements en ligne. Elle démarre par un écran de chargement au logo, puis l'écran « Créez votre compte » avec connexion rapide via Google. La page des promotions présente les « Offres du moment » avec cartes produits, ancien et nouveau prix, pourcentage de remise (par ex. 20 %) et économie réalisée, suivies des « Derniers produits » en dinars algériens, avec recherche et panier. L'application comprend aussi une page « Mon stock » qui affiche les produits et leurs quantités restantes avec barres de progression et durée de disponibilité, un bouton d'ajout rapide et une barre de navigation entre accueil, promotions, commandes, profil et stock.",
          "en": "Novamart is a mobile app for an online clothing store. It starts with a branded loading screen, then a “Create your account now” screen with quick Google sign-in. The discounts page shows a “Hot Deals” section with product cards, old and new prices, a discount badge (e.g. 20% OFF) and the amount saved, followed by “Latest Products” priced in Algerian dinars, with search and a shopping cart. The app also has a “My Inventory” page listing products and remaining quantities with progress bars and availability duration, a quick-add button, and a bottom bar to switch between Home, Discounts, Orders, Profile and Inventory."
      },
      "problem": {
          "ar": "المتاجر الصغيرة للملابس تعتمد غالباً على مواقع التواصل لعرض المنتجات والعروض، ويصعب عليها متابعة المخزون وتنظيم الخصومات.",
          "fr": "Les petites boutiques de vêtements s'appuient souvent sur les réseaux sociaux pour présenter produits et offres, et peinent à suivre leur stock et organiser les remises.",
          "en": "Small clothing stores often rely on social media to show products and offers, and struggle to track stock and organize discounts."
      },
      "solution": {
          "ar": "تطبيق واضح بهوية خضراء يجمع العروض والمنتجات والمخزون في مكان واحد، مع تسجيل دخول سريع بجوجل وأسعار بالدينار الجزائري.",
          "fr": "Une application claire à l'identité verte qui réunit offres, produits et stock au même endroit, avec connexion Google rapide et prix en dinars algériens.",
          "en": "A clear green-branded app that brings deals, products and inventory together, with quick Google sign-in and prices in Algerian dinars."
      },
      "features": {
          "ar": [
              "شاشة تحميل بشعار المتجر",
              "تسجيل الدخول وإنشاء حساب بحساب جوجل",
              "قسم العروض الساخنة بنسب الخصم والتوفير",
              "قسم أحدث المنتجات بالدينار الجزائري",
              "بحث وسلة مشتريات",
              "صفحة مخزون بكميات وأشرطة تقدّم",
              "شريط تنقل: الرئيسية، الخصومات، الطلبات، الملف الشخصي، المخزون"
          ],
          "fr": [
              "Écran de chargement au logo",
              "Connexion et inscription via Google",
              "Offres du moment avec remises et économies",
              "Derniers produits en dinars algériens",
              "Recherche et panier",
              "Page de stock avec quantités et barres de progression",
              "Navigation : accueil, promotions, commandes, profil, stock"
          ],
          "en": [
              "Branded loading screen",
              "Sign-in and sign-up with Google",
              "Hot deals with discount rates and savings",
              "Latest products priced in Algerian dinars",
              "Search and shopping cart",
              "Inventory page with quantities and progress bars",
              "Navigation: Home, Discounts, Orders, Profile, Inventory"
          ]
      },
      "cover_image_url": "assets/projects/novamart/cover.webp",
      "thumbnail_url": "assets/projects/novamart/cover.webp",
      "gallery": [
          "assets/projects/novamart/cover.webp",
          "assets/projects/novamart/brand.webp",
          "assets/projects/novamart/screens.webp",
          "assets/projects/novamart/promo.webp"
      ]
  },
  {
      "id": "alnajjar-app",
      "featured": false,
      "year": "2025",
      "badge": {
          "ar": "تطبيق إدارة أعمال",
          "fr": "Application de gestion",
          "en": "Business Management App"
      },
      "likes_count": 1260,
      "demo_url": "",
      "categories": [
          "mobile",
          "dashboard"
      ],
      "technologies": [
          "Mobile App",
          "Business Management",
          "Subscriptions",
          "Earnings Tracking",
          "Appointments",
          "DZD"
      ],
      "title": {
          "ar": "النجّار — تطبيق إدارة الطلبات والمواعيد والأرباح",
          "fr": "Al-Najjar — Application de gestion des commandes, rendez-vous et bénéfices",
          "en": "Al-Najjar — Orders, Appointments & Earnings Management App"
      },
      "short_description": {
          "ar": "تطبيق عربي لإدارة عمل ورشة النجارة: الطلبات والمواعيد والناقلين، وتتبّع الدخل والمصاريف وصافي الربح، مع ملف شخصي وباقات اشتراك.",
          "fr": "Application en arabe pour gérer une activité de menuiserie : commandes, rendez-vous et transporteurs, suivi des revenus, dépenses et bénéfice net, avec profil et formules d'abonnement.",
          "en": "An Arabic app for managing a carpentry business: orders, appointments and carriers, tracking of income, expenses and net profit, with a profile and subscription plans."
      },
      "full_description": {
          "ar": "«النجّار» تطبيق جوال بواجهة عربية لإدارة عمل ورشة نجارة. يحتوي على شريط تنقل بخمسة أقسام: الطلبات، الأرباح، الناقلين، المواعيد، والملف الشخصي. تعرض صفحة «إدارة الأرباح والمصاريف» الدخل والمصاريف وصافي الربح بالدينار الجزائري مع فلاتر (اليوم، الأسبوع، الشهر، السنة) وقائمة عمليات قابلة للتعديل والحذف. وتتيح صفحة «إدارة المواعيد» عرض المواعيد بحالتها (قيد الانتظار) وتاريخها ووقتها ورقم هاتف العميل وملاحظاته. يعرض الملف الشخصي بيانات المستخدم والشركة ونوع الحساب وسجل الطلبات، كما تقدّم صفحة «الباقات والأسعار» باقات اشتراك (الأساسية والمتوسطة) بعدد العمال والتقارير، وتُعرض المنتجات حسب الفئات مع زر إضافة.",
          "fr": "« Al-Najjar » est une application mobile en arabe pour gérer une activité de menuiserie. Sa barre de navigation compte cinq sections : commandes, bénéfices, transporteurs, rendez-vous et profil. La page « Gestion des bénéfices et dépenses » affiche revenus, dépenses et bénéfice net en dinars algériens avec filtres (jour, semaine, mois, année) et une liste d'opérations modifiables et supprimables. La page « Gestion des rendez-vous » présente les rendez-vous avec leur statut (en attente), date, heure, téléphone du client et notes. Le profil affiche les informations de l'utilisateur et de l'entreprise, le type de compte et l'historique des commandes ; la page « Formules et tarifs » propose des abonnements (de base et intermédiaire) selon le nombre d'employés et les rapports, et les produits sont classés par catégories avec un bouton d'ajout.",
          "en": "“Al-Najjar” (The Carpenter) is an Arabic-language mobile app for managing a carpentry business. A bottom bar has five sections: Orders, Earnings, Carriers, Appointments and Profile. The “Earnings & Expenses” page shows income, expenses and net profit in Algerian dinars with filters (day, week, month, year) and a list of editable, deletable entries. The “Appointments” page lists appointments with their status (pending), date, time, customer phone and notes. The profile shows user and company details, account type and order history, and the “Plans & Pricing” page offers subscription plans (Basic and Medium) by number of workers and reports, while products are grouped by category with an add button."
      },
      "problem": {
          "ar": "أصحاب ورشات النجارة يدوّنون الطلبات والمواعيد والمصاريف في دفاتر أو رسائل متفرقة، فيصعب عليهم معرفة أرباحهم الفعلية وتنظيم عملهم.",
          "fr": "Les menuisiers notent commandes, rendez-vous et dépenses dans des carnets ou messages dispersés, et peinent à connaître leurs vrais bénéfices et à organiser leur travail.",
          "en": "Carpentry workshop owners record orders, appointments and expenses in notebooks or scattered messages, making it hard to know real profit and stay organized."
      },
      "solution": {
          "ar": "تطبيق واحد بالعربية يجمع الطلبات والمواعيد والناقلين والأرباح، مع ملخص مالي واضح وباقات اشتراك تنمو مع حجم الفريق.",
          "fr": "Une seule application en arabe qui réunit commandes, rendez-vous, transporteurs et bénéfices, avec un résumé financier clair et des formules d'abonnement adaptées à la taille de l'équipe.",
          "en": "A single Arabic app that brings orders, appointments, carriers and earnings together, with a clear financial summary and subscription plans that scale with team size."
      },
      "features": {
          "ar": [
              "واجهة عربية بالكامل",
              "شريط تنقل: الطلبات، الأرباح، الناقلين، المواعيد، الملف الشخصي",
              "إدارة الأرباح والمصاريف بفلاتر اليوم والأسبوع والشهر والسنة",
              "عرض الدخل والمصاريف وصافي الربح بالدينار الجزائري",
              "إضافة وتعديل وحذف العمليات المالية",
              "إدارة المواعيد بالحالة والتاريخ والوقت والهاتف والملاحظات",
              "ملف شخصي بسجل الطلبات",
              "باقات اشتراك أساسية ومتوسطة",
              "منتجات مصنّفة حسب الفئات"
          ],
          "fr": [
              "Interface entièrement en arabe",
              "Navigation : commandes, bénéfices, transporteurs, rendez-vous, profil",
              "Gestion des bénéfices et dépenses avec filtres jour, semaine, mois, année",
              "Revenus, dépenses et bénéfice net en dinars algériens",
              "Ajout, modification et suppression des opérations",
              "Gestion des rendez-vous : statut, date, heure, téléphone, notes",
              "Profil avec historique des commandes",
              "Formules d'abonnement de base et intermédiaire",
              "Produits classés par catégories"
          ],
          "en": [
              "Fully Arabic interface",
              "Navigation: Orders, Earnings, Carriers, Appointments, Profile",
              "Earnings and expenses management with day, week, month and year filters",
              "Income, expenses and net profit in Algerian dinars",
              "Add, edit and delete financial entries",
              "Appointments with status, date, time, phone and notes",
              "Profile with order history",
              "Basic and Medium subscription plans",
              "Products grouped by category"
          ]
      },
      "cover_image_url": "assets/projects/alnajjar/cover.webp",
      "thumbnail_url": "assets/projects/alnajjar/cover.webp",
      "gallery": [
          "assets/projects/alnajjar/cover.webp",
          "assets/projects/alnajjar/earnings.webp",
          "assets/projects/alnajjar/screens.webp"
      ]
  },
  {
      "id": "rihlaty-app",
      "featured": false,
      "year": "2025",
      "badge": {
          "ar": "تطبيق جوال",
          "fr": "Application mobile",
          "en": "Mobile App"
      },
      "likes_count": 1210,
      "demo_url": "",
      "categories": [
          "mobile"
      ],
      "technologies": [
          "Mobile App",
          "Google Sign-In",
          "Email Auth",
          "Privacy Policy",
          "Arabic UI"
      ],
      "title": {
          "ar": "رحلتي — تطبيق جوال بتسجيل دخول وسياسة خصوصية",
          "fr": "Rihlaty — Application mobile avec authentification et politique de confidentialité",
          "en": "Rihlaty — Mobile App with Authentication & Privacy Policy"
      },
      "short_description": {
          "ar": "تصميم واجهات تطبيق «رحلتي» بهوية بنية هادئة: شاشة تحميل، تسجيل دخول بالبريد، إنشاء حساب بجوجل، وسياسة خصوصية واضحة.",
          "fr": "Conception des écrans de l'application « Rihlaty » à l'identité brune et sobre : écran de chargement, connexion par e-mail, création de compte via Google et politique de confidentialité claire.",
          "en": "Interface design for the “Rihlaty” app with a calm brown identity: loading screen, email sign-in, Google sign-up and a clear privacy policy."
      },
      "full_description": {
          "ar": "«رحلتي» (Rihlaty) تطبيق جوال بواجهة عربية وهوية بصرية بنية دافئة وشعار بخط عربي مميز. يبدأ بشاشة تحميل بالشعار، ثم شاشة تسجيل الدخول بالبريد الإلكتروني وكلمة المرور، وشاشة «أنشئ حسابك الآن» مع التسجيل بحساب جوجل ورسم طريق بدبابيس مواقع، ورابط لمن لديه حساب بالفعل. وتعرض شاشة «سياسة الخصوصية» بنوداً مرقّمة حول جمع البيانات واستخدامها وحمايتها وملفات تعريف الارتباط، مع زر «أوافق» للموافقة قبل المتابعة.",
          "fr": "« Rihlaty » est une application mobile à l'interface arabe et à l'identité visuelle brune et chaleureuse, avec un logo en calligraphie arabe distinctive. Elle commence par un écran de chargement au logo, puis l'écran de connexion par e-mail et mot de passe, et l'écran « Créez votre compte » avec inscription via Google et une illustration de route avec repères de lieux, ainsi qu'un lien pour ceux qui ont déjà un compte. L'écran « Politique de confidentialité » présente des points numérotés sur la collecte, l'utilisation et la protection des données et les cookies, avec un bouton « J'accepte » avant de continuer.",
          "en": "“Rihlaty” is a mobile app with an Arabic interface and a warm brown visual identity, featuring a distinctive Arabic-calligraphy logo. It starts with a logo loading screen, then an email and password sign-in screen and a “Create your account now” screen with Google sign-up, a road illustration with location pins and a link for existing users. The “Privacy Policy” screen lists numbered points on data collection, use and protection and cookies, with an “I agree” button to accept before continuing."
      },
      "problem": {
          "ar": "تحتاج التطبيقات الجديدة إلى بداية واضحة وموثوقة: تسجيل سهل وشفافية في التعامل مع بيانات المستخدم.",
          "fr": "Les nouvelles applications ont besoin d'un démarrage clair et rassurant : inscription simple et transparence sur l'usage des données.",
          "en": "New apps need a clear, trustworthy start: easy sign-up and transparency about how user data is handled."
      },
      "solution": {
          "ar": "واجهات أنيقة بنمط عربي تجمع تسجيل الدخول بالبريد أو جوجل مع سياسة خصوصية مفهومة وموافقة صريحة.",
          "fr": "Des écrans élégants au style arabe qui combinent connexion par e-mail ou Google, politique de confidentialité compréhensible et consentement explicite.",
          "en": "Elegant Arabic-style screens combining email or Google sign-in with an understandable privacy policy and explicit consent."
      },
      "features": {
          "ar": [
              "شاشة تحميل بشعار بخط عربي",
              "تسجيل الدخول بالبريد الإلكتروني وكلمة المرور",
              "إنشاء حساب بحساب جوجل",
              "رابط «لديك حساب بالفعل؟»",
              "سياسة خصوصية بنقاط مرقّمة وزر موافقة",
              "هوية بصرية بنية هادئة وواجهة عربية"
          ],
          "fr": [
              "Écran de chargement au logo calligraphique",
              "Connexion par e-mail et mot de passe",
              "Création de compte via Google",
              "Lien « Vous avez déjà un compte ? »",
              "Politique de confidentialité numérotée avec bouton d'acceptation",
              "Identité brune sobre et interface arabe"
          ],
          "en": [
              "Loading screen with a calligraphic logo",
              "Email and password sign-in",
              "Account creation with Google",
              "“Already have an account?” link",
              "Numbered privacy policy with an agree button",
              "Calm brown identity and Arabic interface"
          ]
      },
      "cover_image_url": "assets/projects/rihlaty/cover.webp",
      "thumbnail_url": "assets/projects/rihlaty/cover.webp",
      "gallery": [
          "assets/projects/rihlaty/cover.webp",
          "assets/projects/rihlaty/intro.webp",
          "assets/projects/rihlaty/auth.webp"
      ]
  },
  {
      "id": "penguchat-messaging",
      "featured": false,
      "year": "2026",
      "badge": {
          "ar": "تطبيق مراسلة",
          "fr": "Application de messagerie",
          "en": "Messaging App"
      },
      "likes_count": 1290,
      "demo_url": "",
      "categories": [
          "mobile"
      ],
      "technologies": [
          "Mobile App",
          "Real-time Chat",
          "Google Sign-In",
          "Email Auth",
          "Marketplace",
          "Voice-to-Text"
      ],
      "title": {
          "ar": "PenguChat — تطبيق مراسلة فورية مع نشر المنتجات والخدمات",
          "fr": "PenguChat — Application de messagerie instantanée avec publication de produits et services",
          "en": "PenguChat — Real-time Messaging App with Products & Services Marketplace"
      },
      "short_description": {
          "ar": "تطبيق مراسلة بشخصية البطريق: دردشة فورية، تسجيل بجوجل أو البريد، بحث عن مستخدم بالاسم، ونشر المنتجات والخدمات للتواصل مع الناشر.",
          "fr": "Application de messagerie à la mascotte pingouin : chat en temps réel, inscription Google ou e-mail, recherche d'utilisateur et publication de produits et services.",
          "en": "A penguin-themed messaging app: real-time chat, Google or email sign-up, user search by username, and publishing products and services to contact the seller."
      },
      "full_description": {
          "ar": "PenguChat تطبيق مراسلة متكامل بهوية بيج هادئة وشخصية بطريق لطيفة. يتيح التسجيل عبر جوجل أو البريد الإلكتروني مع صفحة لرفع الصورة الشخصية وتعديل البيانات، وشاشة دخول بخيار «تذكرني». من قائمة المحادثات يمكن فتح الشريط الجانبي لتصفح المحتوى وتعديل الملف الشخصي، والبحث عن مستخدم آخر باسمه وبدء محادثة معه. يدعم التطبيق الرسائل الفورية ومشاركة الصور والفيديوهات والملفات وجدولة الرسائل للإرسال لاحقاً، مع تحويل الصوت إلى نص. وعبر زر «+» يمكن نشر منتج أو خدمة (اسم ووصف وصور) أو تصفح المنتجات والخدمات، ثم مراسلة الناشر مباشرة من صفحة المنتج.",
          "fr": "PenguChat est une application de messagerie complète à l'identité beige apaisante et à la mascotte pingouin. L'inscription se fait via Google ou e-mail, suivie d'une page pour ajouter une photo de profil et modifier ses informations, avec un écran de connexion et l'option « Se souvenir de moi ». Depuis la liste des discussions, le menu latéral permet d'explorer le contenu et de modifier son profil, et la recherche permet de trouver un utilisateur par son nom pour démarrer une conversation. L'application gère les messages en temps réel, le partage d'images, de vidéos et de fichiers, la programmation d'envoi et la conversion de la voix en texte. Le bouton « + » permet de publier un produit ou un service (nom, description, images) ou de parcourir les annonces, puis de contacter directement le vendeur depuis la fiche.",
          "en": "PenguChat is a complete messaging app with a calm beige identity and a friendly penguin mascot. Users sign up with Google or email, then land on a page to upload a profile picture and edit their details, with a login screen and a “Remember me” option. From the chats list, the sidebar lets them explore the app and edit their profile, and a search finds another user by username to start a conversation. The app supports real-time messages, sharing images, videos and files, scheduled messages for later delivery, and voice-to-text conversion. The “+” button lets users publish a product or service (name, description, images) or browse listings, then message the publisher directly from the product page."
      },
      "problem": {
          "ar": "المراسلة والتسويق للمنتجات والخدمات غالباً ما يكونان في تطبيقين منفصلين، فيضيع الزبون بين البحث عن البائع ومحاولة التواصل معه.",
          "fr": "La messagerie et la promotion de produits ou services se font souvent dans des applications séparées, ce qui complique la prise de contact avec le vendeur.",
          "en": "Messaging and promoting products or services usually live in separate apps, which makes it harder for buyers to find and reach the seller."
      },
      "solution": {
          "ar": "تطبيق واحد يجمع الدردشة الفورية مع قسم لنشر المنتجات والخدمات، بحيث تبدأ المحادثة مع الناشر بضغطة واحدة من صفحة المنتج.",
          "fr": "Une seule application qui réunit le chat en temps réel et une section de publication de produits et services : la conversation avec le vendeur démarre en un clic depuis la fiche.",
          "en": "One app that combines real-time chat with a products and services section, so a conversation with the publisher starts in a single tap from the product page."
      },
      "features": {
          "ar": [
              "التسجيل عبر جوجل أو البريد الإلكتروني",
              "صفحة رفع الصورة الشخصية وتعديل البيانات",
              "تسجيل الدخول مع خيار «تذكرني»",
              "قائمة المحادثات مع شريط جانبي",
              "البحث عن مستخدم بالاسم وبدء محادثة",
              "رسائل فورية ومشاركة الصور والفيديوهات والملفات",
              "جدولة الرسائل وتحويل الصوت إلى نص",
              "نشر منتج أو خدمة بالاسم والوصف والصور",
              "تصفح المنتجات والخدمات ومراسلة الناشر مباشرة"
          ],
          "fr": [
              "Inscription via Google ou e-mail",
              "Page de photo de profil et de modification des informations",
              "Connexion avec option « Se souvenir de moi »",
              "Liste des discussions avec menu latéral",
              "Recherche d'utilisateur par nom et début de conversation",
              "Messages en temps réel, partage d'images, vidéos et fichiers",
              "Messages programmés et conversion voix-texte",
              "Publication de produit ou service (nom, description, images)",
              "Parcours des annonces et message direct au vendeur"
          ],
          "en": [
              "Sign-up with Google or email",
              "Profile picture upload and personal details page",
              "Login with a “Remember me” option",
              "Chats list with a sidebar",
              "Search users by username and start a conversation",
              "Real-time messages, image, video and file sharing",
              "Scheduled messages and voice-to-text",
              "Publish a product or service with name, description and images",
              "Browse listings and message the publisher directly"
          ]
      },
      "cover_image_url": "assets/projects/penguchat/cover.webp",
      "thumbnail_url": "assets/projects/penguchat/cover.webp",
      "gallery": [
          "assets/projects/penguchat/cover.webp",
          "assets/projects/penguchat/signup.webp",
          "assets/projects/penguchat/communicate.webp",
          "assets/projects/penguchat/publish.webp",
          "assets/projects/penguchat/contact.webp"
      ]
  }
];

// Node (api/project-share.js) can reuse the same data
if (typeof module !== "undefined" && module.exports) {
  module.exports = { LOCAL_PROJECTS, LOCAL_CATEGORIES };
}
