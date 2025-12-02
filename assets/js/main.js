/**
* Template Name: Clarity
* Template URL: https://bootstrapmade.com/clarity-bootstrap-agency-template/
* Updated: Sep 13 2025 with Bootstrap v5.3.8
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  // Cache de elementos DOM frecuentemente usados
  const domCache = {
    body: null,
    header: null,
    scrollTop: null,
    navMenuLinks: null,
    preloader: null,
    mobileNavToggleBtn: null
  };

  /**
   * Inicializar cache de elementos DOM
   */
  function initDomCache() {
    domCache.body = document.querySelector('body');
    domCache.header = document.querySelector('#header');
    domCache.scrollTop = document.querySelector('.scroll-top');
    domCache.navMenuLinks = document.querySelectorAll('.navmenu a');
    domCache.preloader = document.querySelector('#preloader');
    domCache.mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  }

  /**
   * Debounce function para optimizar eventos de scroll/resize
   */
  function debounce(func, wait = 100) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Throttle function para eventos que se disparan frecuentemente
   */
  function throttle(func, limit = 100) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  const toggleScrolled = throttle(() => {
    if (!domCache.header || !domCache.body) return;
    
    const headerClasses = domCache.header.classList;
    if (!headerClasses.contains('scroll-up-sticky') && 
        !headerClasses.contains('sticky-top') && 
        !headerClasses.contains('fixed-top')) return;
        
    window.scrollY > 100 ? 
      domCache.body.classList.add('scrolled') : 
      domCache.body.classList.remove('scrolled');
  }, 50);

  /**
   * Mobile nav toggle
   */
  function mobileNavToogle() {
    if (!domCache.body || !domCache.mobileNavToggleBtn) return;
    
    domCache.body.classList.toggle('mobile-nav-active');
    domCache.mobileNavToggleBtn.classList.toggle('bi-list');
    domCache.mobileNavToggleBtn.classList.toggle('bi-x');
  }

  function setupMobileNav() {
    if (domCache.mobileNavToggleBtn) {
      domCache.mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
    }

    // Hide mobile nav on same-page/hash links
    if (domCache.navMenuLinks) {
      domCache.navMenuLinks.forEach(navmenu => {
        navmenu.addEventListener('click', () => {
          if (domCache.body && domCache.body.classList.contains('mobile-nav-active')) {
            mobileNavToogle();
          }
        });
      });
    }

    // Toggle mobile nav dropdowns
    document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
      navmenu.addEventListener('click', function(e) {
        e.preventDefault();
        this.parentNode.classList.toggle('active');
        this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
        e.stopImmediatePropagation();
      });
    });
  }

  /**
   * Preloader
   */
  function handlePreloader() {
    if (domCache.preloader) {
      domCache.preloader.remove();
    }
  }

  /**
   * Scroll top button
   */
  const toggleScrollTop = throttle(() => {
    if (domCache.scrollTop) {
      window.scrollY > 100 ? 
        domCache.scrollTop.classList.add('active') : 
        domCache.scrollTop.classList.remove('active');
    }
  }, 50);

  function setupScrollTop() {
    if (domCache.scrollTop) {
      domCache.scrollTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }

  /**
   * Function to ensure critical sections are visible
   */
  const criticalSectionsCache = {
    sections: null,
    initialized: false
  };

  function getCriticalSections() {
    if (!criticalSectionsCache.sections) {
      criticalSectionsCache.sections = ['#clients', '#contact']
        .map(id => document.querySelector(id))
        .filter(section => section !== null);
    }
    return criticalSectionsCache.sections;
  }

  function ensureCriticalSectionsVisible() {
    if (!criticalSectionsCache.initialized) {
      getCriticalSections().forEach(section => {
        section.removeAttribute('data-aos');
        section.removeAttribute('data-aos-delay');
        section.classList.remove('aos-animate', 'aos-init');
        section.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; transform: none !important;';
      });
      criticalSectionsCache.initialized = true;
    }
  }

  /**
   * Animation on scroll function and init
   */
  let aosInitialized = false;

  function aosInit() {
    if (aosInitialized || typeof AOS === 'undefined') return;

    ensureCriticalSectionsVisible();

    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      disable: 'mobile'
    });

    aosInitialized = true;
  }

  /**
   * Initiate glightbox
   */
  let glightboxInstance = null;

  function initGlightbox() {
    if (typeof GLightbox !== 'undefined' && !glightboxInstance) {
      glightboxInstance = GLightbox({
        selector: '.glightbox'
      });
    }
  }

  /**
   * Init isotope layout and filters
   */
  let isotopeInstances = [];

  function initIsotopeLayouts() {
    document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
      const layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
      const filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
      const sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

      const container = isotopeItem.querySelector('.isotope-container');
      if (!container) return;

      imagesLoaded(container, function() {
        const isotope = new Isotope(container, {
          itemSelector: '.isotope-item',
          layoutMode: layout,
          filter: filter,
          sortBy: sort
        });

        isotopeInstances.push(isotope);

        isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
          filters.addEventListener('click', function() {
            isotopeItem.querySelector('.isotope-filters .filter-active')?.classList.remove('filter-active');
            this.classList.add('filter-active');
            isotope.arrange({
              filter: this.getAttribute('data-filter')
            });
          }, false);
        });
      });
    });
  }

  /**
   * Init swiper for clients section
   */
  let clientsSwiper = null;

  function initClientsSwiper() {
    const clientsSection = document.querySelector("#clients");
    const clientsSwiperEl = clientsSection?.querySelector(".init-swiper");
    
    if (!clientsSwiperEl) return;

    try {
      if (clientsSwiper) {
        clientsSwiper.destroy(true, true);
        clientsSwiper = null;
      }

      const configEl = clientsSwiperEl.querySelector(".swiper-config");
      if (configEl && typeof Swiper !== 'undefined') {
        const config = JSON.parse(configEl.innerHTML.trim());
        clientsSwiper = new Swiper(clientsSwiperEl, config);
      }
    } catch (e) {
      console.warn('Error initializing clients swiper:', e);
    }
  }

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  function handleHashScroll() {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        requestAnimationFrame(() => {
          const scrollMarginTop = getComputedStyle(target).scrollMarginTop;
          window.scrollTo({
            top: target.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        });
      }
    }
  }

  /**
   * Navmenu Scrollspy
   */
  const navmenuScrollspy = throttle(() => {
    if (!domCache.navMenuLinks) return;

    const scrollPosition = window.scrollY + 200;

    domCache.navMenuLinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      
      const section = document.querySelector(navmenulink.hash);
      if (!section) return;
      
      const isActive = scrollPosition >= section.offsetTop && 
                       scrollPosition <= (section.offsetTop + section.offsetHeight);
      
      if (isActive && !navmenulink.classList.contains('active')) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else if (!isActive && navmenulink.classList.contains('active')) {
        navmenulink.classList.remove('active');
      }
    });
  }, 100);

  /**
   * Prevent page reload on logo clicks and handle smooth scroll
   */
  function setupLogoClick() {
    document.addEventListener('click', function(e) {
      const target = e.target.closest('.logo');
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
  }

  /**
   * Manejo de filtros y scroll para catálogos
   */
  function setupCatalogFilters() {
    const filterTargets = {
      '#filter-papeleria': '#filter-papeleria',
      '#filter-accesorios': '#filter-accesorios',
      '#filter-muebleria': '#filter-muebleria',
      '#filter-equipos': '#filter-equipos'
    };

    Object.keys(filterTargets).forEach(linkHref => {
      const link = document.querySelector(`a[href="${linkHref}"]`);
      if (!link) return;

      link.addEventListener('click', function(e) {
        e.preventDefault();

        const productsSection = document.querySelector('#productos');
        if (!productsSection) return;

        productsSection.scrollIntoView({ behavior: 'smooth' });

        setTimeout(() => {
          const liFilter = document.querySelector(filterTargets[linkHref]);
          if (liFilter) liFilter.click();
        }, 600);
      });
    });
  }

  /**
   * Resaltar el día actual en bloques de horarios
   */
  function highlightCurrentDay() {
    document.querySelectorAll('.list-hours').forEach(block => {
      const listHoursArray = block.querySelectorAll('li');
      const todayIndex = new Date().getDay();
      
      if (listHoursArray[todayIndex]) {
        listHoursArray[todayIndex].classList.add('today');
      }
    });
  }

  /**
   * Horario de apertura dinámico
   */
  const horarioCache = {
    tienda: null,
    servicio: null
  };

  const horarioTienda = {
    0: [], // Domingo cerrado
    1: [[9, 19]], 
    2: [[9, 19]], 
    3: [[9, 19]], 
    4: [[9, 19]], 
    5: [[9, 19]], 
    6: [[9, 16]]  
  };

  const horarioServicio = {
    0: [], // Domingo cerrado
    1: [[10, 15], [16, 19]], 
    2: [[10, 15], [16, 19]], 
    3: [[10, 15], [16, 19]], 
    4: [[10, 15], [16, 19]], 
    5: [[10, 15], [16, 19]], 
    6: [] // Sábado cerrado
  };

  function crearEstadoHorario(elementId, horarios) {
    const elemento = document.getElementById(elementId);
    if (!elemento) return;

    let timeoutId = null;

    function formatearHoraDesdeMinutos(minutosTotales) {
      const horas24 = Math.floor(minutosTotales / 60);
      const minutos = minutosTotales % 60;
      const horas12 = horas24 % 12 || 12;
      const periodo = horas24 >= 12 ? 'PM' : 'AM';
      
      return `${horas12}:${minutos.toString().padStart(2, '0')} ${periodo}`;
    }

    function obtenerInfoHorario(dia, minutosActuales) {
      const hoy = horarios[dia] || [];
      const margen = 5;
      
      let estaAbierto = false;
      let porAbrir = false;
      let porCerrar = false;
      let siguienteApertura = null;
      let siguienteCierre = null;

      for (const rango of hoy) {
        const inicioMinutos = rango[0] * 60;
        const finMinutos = rango[1] * 60;

        if (minutosActuales >= inicioMinutos && minutosActuales < finMinutos) {
          estaAbierto = true;
          siguienteCierre = finMinutos;
          porCerrar = (minutosActuales >= finMinutos - margen);
        }

        if (!estaAbierto && minutosActuales >= inicioMinutos - margen && minutosActuales < inicioMinutos) {
          porAbrir = true;
          siguienteApertura = inicioMinutos;
        }

        if (!estaAbierto && minutosActuales < inicioMinutos && 
            (siguienteApertura === null || inicioMinutos < siguienteApertura)) {
          siguienteApertura = inicioMinutos;
        }
      }

      return { estaAbierto, porAbrir, porCerrar, siguienteApertura, siguienteCierre };
    }

    function actualizarEstado() {
      const ahora = new Date();
      const dia = ahora.getDay();
      const minutosActuales = ahora.getHours() * 60 + ahora.getMinutes();
      
      const info = obtenerInfoHorario(dia, minutosActuales);
      let estado = "Cerrado ahora";
      let clase = "estado-cerrado";

      if (info.estaAbierto) {
        estado = info.porCerrar ? "Por cerrar pronto" : "Abierto ahora";
        clase = info.porCerrar ? "estado-por-cerrar" : "estado-abierto";
      } else if (info.porAbrir) {
        estado = "Por abrir pronto";
        clase = "estado-por-abrir";
      } else if (info.siguienteApertura !== null) {
        const horaApertura = formatearHoraDesdeMinutos(info.siguienteApertura);
        if (elementId === "estado-servicio" && 
            minutosActuales >= 15 * 60 && 
            minutosActuales < 16 * 60 && 
            info.siguienteApertura === 16 * 60) {
          estado = `Volvemos a las ${horaApertura}`;
        } else {
          estado = `Abre hoy a las ${horaApertura}`;
        }
      }

      elemento.textContent = estado;
      elemento.className = "estado-horario " + clase;

      // Programar próxima actualización
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(actualizarEstado, 60000); // Actualizar cada minuto
    }

    actualizarEstado();
  }

  /**
   * Año del footer
   */
  function updateFooterYear() {
    const anioSpan = document.getElementById("anio-actual");
    if (anioSpan) {
      anioSpan.textContent = new Date().getFullYear();
    }
  }

  /**
   * Smooth scroll - MANTENIDO EXACTAMENTE COMO SOLICITADO
   */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);

      if (!target) return;

      e.preventDefault(); 

      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      document.querySelectorAll('.navmenu a.active')
        .forEach(a => a.classList.remove('active'));
      this.classList.add('active');

      history.pushState(null, null, window.location.pathname);
    });
  });

  /**
   * Inicialización optimizada
   */
  function init() {
    initDomCache();
    
    // Configurar eventos de scroll con throttle
    window.addEventListener('scroll', toggleScrolled, { passive: true });
    window.addEventListener('scroll', toggleScrollTop, { passive: true });
    window.addEventListener('scroll', navmenuScrollspy, { passive: true });
    
    // Configurar eventos de resize con debounce
    window.addEventListener('resize', debounce(initClientsSwiper, 150));
    
    // Inicializaciones inmediatas
    setupMobileNav();
    setupScrollTop();
    setupLogoClick();
    highlightCurrentDay();
    updateFooterYear();
    
    // Inicializaciones diferidas (después de carga)
    requestAnimationFrame(() => {
      if (domCache.preloader) {
        handlePreloader();
      }
      
      ensureCriticalSectionsVisible();
      aosInit();
      
      if (typeof PureCounter !== 'undefined') {
        new PureCounter();
      }
      
      initGlightbox();
      initIsotopeLayouts();
      initClientsSwiper();
      setupCatalogFilters();
      
      crearEstadoHorario("estado-tienda", horarioTienda);
      crearEstadoHorario("estado-servicio", horarioServicio);
      
      handleHashScroll();
    });
  }

  // Iniciar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  

})();