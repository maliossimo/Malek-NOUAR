// Navigation shrink/expand functionality
const mainNav = document.getElementById('mainNav');
// Target the desktop navigation container. Navigation links are hidden
// via CSS on small screens and always visible on larger viewports.
const navLinks = document.getElementById('navLinksDesktop');

// We no longer compute visibility for the desktop navigation here.  Visibility
// is controlled entirely via responsive utility classes in the markup.

function handleScroll() {
  // Shrink and fade the navigation bar slightly when scrolling down
  if (window.scrollY > 60) {
    mainNav.classList.add('scale-95', 'opacity-90');
  } else {
    mainNav.classList.remove('scale-95', 'opacity-90');
  }
  // No need to toggle nav links visibility here; responsive CSS handles it.
}

// Initialize on page load
handleScroll();
window.addEventListener('scroll', handleScroll);
// We don't need to listen to resize events for nav visibility as this is
// handled by CSS.

// Expand nav when hovering (desktop only).  We no longer show/hide links
// programmatically; we simply remove the scale and opacity classes on hover to
// restore the bar to full size.
if (mainNav) {
  mainNav.addEventListener('mouseenter', () => {
    mainNav.classList.remove('scale-95', 'opacity-90');
  });
  mainNav.addEventListener('mouseleave', () => {
    handleScroll();
  });
}

// Reveal animations using IntersectionObserver
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);
reveals.forEach((el) => {
  observer.observe(el);
});

// Internationalization (i18n) logic
// Translation dictionary: keys correspond to data-i18n attributes in the HTML.
const translations = {
  fr: {
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.skills': 'Compétences',
    'nav.experience': 'Expériences',
    'nav.projects': 'Projets',
    'nav.contact': 'Contact',
    'hero.tagline': 'Développeur passionné en <span class="text-blue-400">Python</span>, <span class="text-green-400">C#</span> et <span class="text-purple-400">Angular</span>',
    'cta.download': 'Télécharger CV',
    'cta.contact': 'Me contacter',
    'about.heading': 'À propos',
    'about.paragraph1': 'Développeur full stack confirmé avec plus de 7 ans d\'expérience en interne chez LGM, je conçois et développe des applications logicielles robustes et innovantes. Expert en Python, C#, Angular, CI/CD et Docker, j\'évolue aussi bien sur des architectures microservices que sur des applications desktop. Habitué aux environnements Agile et internationaux, je m\'adapte rapidement et collabore efficacement avec des équipes pluridisciplinaires.',
    'about.paragraph2': 'Diplomé ingénieur en informatique de l\'ENSIIE et titulaire d\'une licence de mathématiques de Sorbonne Université, j\'accorde une grande importance à la rigueur scientifique et à la qualité du code. Mes réalisations clés incluent la réduction des temps d\'immobilisation ferroviaire chez Alstom via un algorithme d\'optimisation et une interface C#/WPF, l\'accélération de la validation numérique chez Safran grâce à un outil Python/Qt/PostgreSQL, et la sécurisation des interventions caténaires avec un outil temps réel Angular/.NET/Docker.',
    'strengths.heading': 'Atouts principaux',
    'strengths.item1': 'Expertise technique solide en Python, C#, Angular, CI/CD & Docker.',
    'strengths.item2': 'Adaptabilité et autonomie dans des contextes variés et internationaux.',
    'strengths.item3': 'Expérience avérée dans la gestion de projets et le travail en équipe Agile.',
    'why.heading': 'Pourquoi me choisir ?',
    'why.card1.title': 'Fiabilité & Qualité',
    'why.card1.desc': 'Code robuste, tests rigoureux et respect des meilleures pratiques assurent des solutions pérennes et sécurisées.',
    'why.card2.title': 'Innovation & Créativité',
    'why.card2.desc': 'Toujours en veille technologique, j\'apporte des idées nouvelles et des solutions adaptées aux enjeux de demain.',
    'why.card3.title': 'Collaboration & Écoute',
    'why.card3.desc': 'Communication claire et travail d\'équipe sont au cœur de ma démarche pour garantir la réussite des projets.',
    'contact.heading': 'Contact',
    'contact.nameLabel': 'Nom',
    'contact.emailLabel': 'Email',
    'contact.messageLabel': 'Message',
    'contact.sendButton': 'Envoyer',
    'contact.thanks': 'Merci ! Votre message a bien été envoyé.'
    ,
    // About: languages and soft skills
    'about.languages.heading': 'Langues',
    'about.languages.french': 'Français : courant',
    'about.languages.english': 'Anglais : professionnel (C1)',
    'about.softskills.heading': 'Soft skills',
    'about.softskills.item1': 'Travail en équipe internationale',
    'about.softskills.item2': 'Adaptabilité et autonomie',
    'about.softskills.item3': 'Orientation résultats',
    'about.softskills.item4': 'Communication claire',
    'about.softskills.item5': 'Esprit analytique',
    // Contact section text for social links paragraph
    'contact.socialParagraph': 'Vous pouvez également me trouver sur les réseaux sociaux ou m’envoyer directement un email.'
    ,
    // Section headings and download labels
    'skills.heading': 'Compétences',
    'skills.frontend': 'Frontend',
    'skills.backend': 'Backend',
    'skills.databases': 'Bases de données',
    'skills.devops': 'DevOps & Outils',
    'experience.heading': 'Expériences',
    'projects.heading': 'Projets',
    'downloads.heading': 'Téléchargements',
    'downloads.cvTitle': 'Curriculum Vitae',
    'downloads.cvDescription': 'Téléchargez mon CV détaillé, présentant mon parcours professionnel, mes compétences et mes réalisations clés.',
    'downloads.cvButton': 'Télécharger le CV',
    'logos.heading': 'Technologies & Clients'
    ,
    // Experience timeline descriptions and impacts in French (original text)
    'experience.item1.desc': 'Développement d’un outil temps réel pour la mise en protection des caténaires : Angular/.NET/Docker, microservices, base de données PostgreSQL temps réel.',
    'experience.item1.impact': 'Impact : sécurisation et suivi en temps réel.',
    'experience.item2.desc': 'Conception d’un outil interne de gestion multi‑sites : full stack Python/Angular/PostgreSQL avec pipelines CI/CD GitLab.',
    'experience.item2.impact': 'Impact : collaboration renforcée et pilotage optimisé.',
    'experience.item3.desc': 'Développement d’API pour l’interconnexion de systèmes industriels : Python (FastAPI), OpenAPI, CI/CD.',
    'experience.item3.impact': 'Impact : automatisation des échanges de données et réduction des erreurs.',
    'experience.item4.desc': 'Digitalisation de la maintenance du matériel roulant au Royaume‑Uni, en Roumanie et en Inde : algorithme d’optimisation et interface C#/WPF.',
    'experience.item4.impact': 'Impact : réduction des immobilisations et déploiement industriel.',
    'experience.item5.desc': 'Outil de suivi de configuration numérique CATIA en Python/Qt/PostgreSQL avec pipelines CI/CD et tests unitaires.',
    'experience.item5.impact': 'Impact : validation numérique accélérée et fiabilisée.',
    'experience.item6.desc': 'Automatisation de la migration de données GMAO via des scripts Python/Excel.',
    'experience.item6.impact': 'Impact : fiabilisation des flux et gain de temps.',
    'experience.item7.desc': 'Applications de gestion du packaging et réglementaire : Angular 15 / ASP.NET / PostgreSQL.',
    'experience.item7.impact': 'Impact : amélioration du suivi réglementaire et du cycle packaging.'
    ,
    // Project descriptions in French
    'projects.item1.desc': 'Outil temps réel pour la mise en protection des caténaires.',
    'projects.item2.desc': 'Outil interne de gestion multi‑sites.',
    'projects.item3.desc': 'APIs industrielles & interconnexion de systèmes.',
    'projects.item4.desc': 'Digitalisation de la maintenance du matériel roulant.',
    'projects.item5.desc': 'Suivi de configuration numérique CATIA.',
    'projects.item6.desc': 'Scripts Python/Excel pour migration de données GMAO.',
    'projects.item7.desc': 'Applications packaging & réglementaire.'
    ,
    // Project titles (cards) in French
    'projects.item2.title': 'Projet SPLIT',
    'projects.item3.title': 'Projet APIVUT'
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'hero.tagline': 'Passionate developer in <span class="text-blue-400">Python</span>, <span class="text-green-400">C#</span> and <span class="text-purple-400">Angular</span>',
    'cta.download': 'Download CV',
    'cta.contact': 'Contact me',
    'about.heading': 'About me',
    'about.paragraph1': 'Full‑stack developer with over 7 years of experience at LGM, I design and build robust, innovative software applications. An expert in Python, C#, Angular, CI/CD and Docker, I work on both microservices architectures and desktop applications. Used to Agile and international environments, I adapt quickly and collaborate effectively with multidisciplinary teams.',
    'about.paragraph2': 'Graduated in computer engineering from ENSIIE and holding a mathematics degree from Sorbonne University, I place great importance on scientific rigour and code quality. My key achievements include reducing rail downtime at Alstom with an optimization algorithm and a C#/WPF interface, accelerating digital validation at Safran with a Python/Qt/PostgreSQL tool, and securing catenary interventions with a real‑time Angular/.NET/Docker application.',
    'strengths.heading': 'Main strengths',
    'strengths.item1': 'Solid technical expertise in Python, C#, Angular, CI/CD & Docker.',
    'strengths.item2': 'Adaptability and autonomy in varied and international contexts.',
    'strengths.item3': 'Proven experience in project management and Agile teamwork.',
    'why.heading': 'Why choose me?',
    'why.card1.title': 'Reliability & Quality',
    'why.card1.desc': 'Robust code, rigorous testing and adherence to best practices ensure long‑lasting, secure solutions.',
    'why.card2.title': 'Innovation & Creativity',
    'why.card2.desc': 'Always keeping up with technology, I bring new ideas and solutions adapted to tomorrow’s challenges.',
    'why.card3.title': 'Collaboration & Communication',
    'why.card3.desc': 'Clear communication and teamwork are at the heart of my approach to ensure project success.',
    'contact.heading': 'Contact',
    'contact.nameLabel': 'Name',
    'contact.emailLabel': 'Email',
    'contact.messageLabel': 'Message',
    'contact.sendButton': 'Send',
    'contact.thanks': 'Thank you! Your message has been sent successfully.'
    ,
    // About: languages and soft skills
    'about.languages.heading': 'Languages',
    'about.languages.french': 'French: fluent',
    'about.languages.english': 'English: professional (C1)',
    'about.softskills.heading': 'Soft skills',
    'about.softskills.item1': 'Teamwork in international settings',
    'about.softskills.item2': 'Adaptability and autonomy',
    'about.softskills.item3': 'Results‑oriented',
    'about.softskills.item4': 'Clear communication',
    'about.softskills.item5': 'Analytical mindset',
    // Contact section text for social links paragraph
    'contact.socialParagraph': 'You can also find me on social networks or email me directly.'
    ,
    // Section headings and download labels
    'skills.heading': 'Skills',
    'skills.frontend': 'Frontend',
    'skills.backend': 'Backend',
    'skills.databases': 'Databases',
    'skills.devops': 'DevOps & Tools',
    'experience.heading': 'Experience',
    'projects.heading': 'Projects',
    'downloads.heading': 'Downloads',
    'downloads.cvTitle': 'Curriculum Vitae',
    'downloads.cvDescription': 'Download my detailed CV, presenting my professional background, skills and key achievements.',
    'downloads.cvButton': 'Download CV',
    'logos.heading': 'Technologies & Clients'
    ,
    // Experience timeline descriptions and impacts in English
    'experience.item1.desc': 'Development of a real‑time tool for protecting catenaries: Angular/.NET/Docker, microservices, real‑time PostgreSQL database.',
    'experience.item1.impact': 'Impact: real‑time protection and monitoring.',
    'experience.item2.desc': 'Design of an internal multi‑site management tool: full stack Python/Angular/PostgreSQL with GitLab CI/CD pipelines.',
    'experience.item2.impact': 'Impact: enhanced collaboration and optimized management.',
    'experience.item3.desc': 'API development for connecting industrial systems: Python (FastAPI), OpenAPI, CI/CD.',
    'experience.item3.impact': 'Impact: automated data exchange and reduced errors.',
    'experience.item4.desc': 'Digitization of rolling stock maintenance in the UK, Romania and India: optimization algorithm and C#/WPF interface.',
    'experience.item4.impact': 'Impact: reduced downtime and industrial deployment.',
    'experience.item5.desc': 'Digital configuration tracking tool for CATIA in Python/Qt/PostgreSQL with CI/CD pipelines and unit tests.',
    'experience.item5.impact': 'Impact: faster and more reliable digital validation.',
    'experience.item6.desc': 'Automation of GMAO data migration via Python/Excel scripts.',
    'experience.item6.impact': 'Impact: improved data reliability and time savings.',
    'experience.item7.desc': 'Packaging and regulatory management applications: Angular 15 / ASP.NET / PostgreSQL.',
    'experience.item7.impact': 'Impact: improved regulatory tracking and packaging cycle.'
    ,
    // Project descriptions in English
    'projects.item1.desc': 'Real‑time tool for catenary protection.',
    'projects.item2.desc': 'Internal multi‑site management tool.',
    'projects.item3.desc': 'Industrial APIs & system interconnection.',
    'projects.item4.desc': 'Digitization of rolling stock maintenance.',
    'projects.item5.desc': 'Digital configuration tracking for CATIA.',
    'projects.item6.desc': 'Python/Excel scripts for GMAO data migration.',
    'projects.item7.desc': 'Packaging & regulatory applications.'
    ,
    // Project titles (cards) in English
    'projects.item2.title': 'SPLIT Project',
    'projects.item3.title': 'APIVUT Project'
  }
};

/**
 * Set the website language and update all elements with data‑i18n attributes.
 * @param {string} lang Two‑letter language code (e.g. 'fr' or 'en').
 */
function setLanguage(lang) {
  const trans = translations[lang] || translations.fr;
  document.documentElement.lang = lang;
  // Persist the choice in localStorage
  try {
    localStorage.setItem('lang', lang);
  } catch (e) {
    // localStorage might be unavailable in some environments
  }
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const value = trans[key];
    if (value !== undefined) {
      el.innerHTML = value;
    }
  });
}

// Attach event listeners to language toggle buttons and initialize language
(() => {
  const langFrButton = document.getElementById('langFr');
  const langEnButton = document.getElementById('langEn');
  if (langFrButton) {
    langFrButton.addEventListener('click', () => setLanguage('fr'));
  }
  if (langEnButton) {
    langEnButton.addEventListener('click', () => setLanguage('en'));
  }
  // Initialize language based on previous preference or default to French
  let storedLang = 'fr';
  try {
    storedLang = localStorage.getItem('lang') || 'fr';
  } catch (e) {
    storedLang = 'fr';
  }
  // Call setLanguage immediately to update the UI
  setLanguage(storedLang);
})();