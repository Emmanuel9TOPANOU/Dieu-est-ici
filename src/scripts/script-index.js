document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('fixed-header-container');
  const topBar = document.getElementById('top-bar');
  const navToggle = document.querySelector('[data-nav-toggle]');
  const mobileNavigation = document.getElementById('mobile-navigation');
  const overlay = document.getElementById('mobile-overlay');
  const closeSidebarBtn = document.querySelector('.close-sidebar');
  const navIcon = document.querySelector('[data-nav-icon]');

  // --- GESTION DES LIENS ACTIFS ---
  const currentUrl = window.location.pathname;
  
  // Fonction pour appliquer la classe active sur un lien
  const setActiveLink = (link, isMobile) => {
    if (isMobile) {
      link.classList.add('bg-slate-100', 'text-[#FFAF00]');
    } else {
      link.classList.add('text-[#FFAF00]');
    }
  };

  // Fonction pour retirer les classes actives de tous les liens
  const removeActiveClasses = (container, isMobile) => {
    const links = container.querySelectorAll('a');
    links.forEach(link => {
      if (isMobile) {
        link.classList.remove('bg-slate-100', 'text-[#FFAF00]');
      } else {
        link.classList.remove('text-[#FFAF00]');
      }
    });
  };

  // Traitement des liens desktop
  const desktopNav = document.querySelector('nav.xl\\:flex');
  if (desktopNav) {
    const desktopLinks = desktopNav.querySelectorAll('a');
    desktopLinks.forEach(link => {
      const linkPath = new URL(link.href, window.location.origin).pathname;
      const cleanLinkPath = linkPath === '/' ? '/index.html' : linkPath;
      const cleanCurrentUrl = currentUrl === '/' || currentUrl === '' ? '/index.html' : currentUrl;

      if (cleanCurrentUrl === cleanLinkPath) {
        removeActiveClasses(desktopNav, false);
        setActiveLink(link, false);
      } else {
        link.classList.add('hover:text-[#FFAF00]');
      }
    });
  }

  // Traitement des liens mobile (sidebar)
  if (mobileNavigation) {
    const mobileLinks = mobileNavigation.querySelectorAll('a');
    mobileLinks.forEach(link => {
      const linkPath = new URL(link.href, window.location.origin).pathname;
      const cleanLinkPath = linkPath === '/' ? '/index.html' : linkPath;
      const cleanCurrentUrl = currentUrl === '/' || currentUrl === '' ? '/index.html' : currentUrl;

      if (cleanCurrentUrl === cleanLinkPath) {
        removeActiveClasses(mobileNavigation, true);
        setActiveLink(link, true);
      }
      // Ajout du hover pour les liens mobiles
      link.classList.add('hover:bg-slate-50', 'hover:text-[#FFAF00]', 'transition-colors', 'duration-200');
    });
  }

  // --- OUVERTURE ET FERMETURE DE LA SIDEBAR ---
  const openMenu = () => {
    if (!mobileNavigation || !overlay) return;
    
    mobileNavigation.classList.remove('translate-x-full');
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    if (navToggle && navIcon) {
      navToggle.setAttribute('aria-expanded', 'true');
      navIcon.classList.remove('ph-list');
      navIcon.classList.add('ph-x');
    }
  };

  const closeMenu = () => {
    if (!mobileNavigation || !overlay) return;
    
    mobileNavigation.classList.add('translate-x-full');
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
    
    if (navToggle && navIcon) {
      navToggle.setAttribute('aria-expanded', 'false');
      navIcon.classList.remove('ph-x');
      navIcon.classList.add('ph-list');
    }
  };

  if (navToggle && mobileNavigation && overlay) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Fermer avec le bouton de fermeture
    if (closeSidebarBtn) {
      closeSidebarBtn.addEventListener('click', closeMenu);
    }

    // Fermer avec l'overlay
    overlay.addEventListener('click', closeMenu);

    // Fermer en cliquant sur un lien
    mobileNavigation.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    // Fermer au resize si fenêtre devient grande
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1280) {
        closeMenu();
      }
    });
  }

  // --- EFFET SCROLL DE L'ENTÊTE ---
  if (container && topBar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        topBar.classList.add('hidden');
        container.classList.remove('bg-white/10', 'backdrop-blur-md', 'border-b', 'border-white/20');
        container.classList.add('bg-white', 'shadow-md');
      } else {
        topBar.classList.remove('hidden');
        container.classList.remove('bg-white', 'shadow-md');
        container.classList.add('bg-white/10', 'backdrop-blur-md', 'border-b', 'border-white/20');
      }
    });
  }
});