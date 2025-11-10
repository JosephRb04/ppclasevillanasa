/**
* Template Name: Clarity
* Template URL: https://bootstrapmade.com/clarity-bootstrap-agency-template/
* Updated: Sep 13 2025 with Bootstrap v5.3.8
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/


(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    window.addEventListener('load', toggleScrollTop);
    document.addEventListener('scroll', toggleScrollTop);
  }

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate Pure Counter
   */
  if (typeof PureCounter !== 'undefined') {
    new PureCounter();
  }

  /**
   * Initiate glightbox
   */
  if (typeof GLightbox !== 'undefined') {
    const glightbox = GLightbox({
      selector: '.glightbox'
    });
  }

  /**
   * Init isotope layout and filters
   */
  function initIsotopeLayout() {
    document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
      let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
      let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
      let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

      let initIsotope;
      if (typeof imagesLoaded !== 'undefined' && typeof Isotope !== 'undefined') {
        imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
          initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
            itemSelector: '.isotope-item',
            layoutMode: layout,
            filter: filter,
            sortBy: sort
          });
        });

        isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
          filters.addEventListener('click', function() {
            isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
            this.classList.add('filter-active');
            initIsotope.arrange({
              filter: this.getAttribute('data-filter')
            });
            if (typeof aosInit === 'function') {
              aosInit();
            }
          }, false);
        });
      }
    });
  }

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    if (typeof Swiper !== 'undefined') {
      document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
        let configElement = swiperElement.querySelector(".swiper-config");
        if (configElement) {
          let config = JSON.parse(configElement.innerHTML.trim());
          new Swiper(swiperElement, config);
        }
      });
    }
  }

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  function handleHashLinks() {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }

  /**
   * Navmenu Scrollspy
   */
  function initNavmenuScrollspy() {
    let navmenulinks = document.querySelectorAll('.navmenu a');

    function navmenuScrollspy() {
      navmenulinks.forEach(navmenulink => {
        if (!navmenulink.hash) return;
        let section = document.querySelector(navmenulink.hash);
        if (!section) return;
        let position = window.scrollY + 200;
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
          navmenulink.classList.add('active');
        } else {
          navmenulink.classList.remove('active');
        }
      })
    }
    
    if (navmenulinks.length > 0) {
      window.addEventListener('load', navmenuScrollspy);
      document.addEventListener('scroll', navmenuScrollspy);
    }
  }

  /**
   * Manejo de filtros y scroll para catálogos
   */
  function initFilterNavigation() {
    const filterTargets = {
      '#filter-papeleria': '#filter-papeleria',
      '#filter-accesorios': '#filter-accesorios',
      '#filter-muebleria': '#filter-muebleria',
      '#filter-equipos': '#filter-equipos'
    };

    Object.keys(filterTargets).forEach(linkHref => {
      const link = document.querySelector(`a[href="${linkHref}"]`);
      if (!link) return;

      link.addEventListener('click', function (e) {
        e.preventDefault();

        // Scroll hacia el área de productos
        const productsSection = document.querySelector('#portfolio');
        if (!productsSection) return;

        productsSection.scrollIntoView({ behavior: 'smooth' });

        // Activa el filtro después de terminar scroll
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
    const hoursBlocks = document.body.querySelectorAll('.list-hours');
    
    hoursBlocks.forEach(block => {
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
  function initDynamicSchedule() {
    function crearEstadoHorario(elementId, horarios) {
      const elemento = document.getElementById(elementId);
      if (!elemento) return;

      function actualizar() {
        const ahora = new Date();
        const dia = ahora.getDay();
        const horaActual = ahora.getHours() + ahora.getMinutes() / 60;
        const hoy = horarios[dia];

        let estado, clase;

        if (!hoy || hoy.length === 0) {
          estado = "Cerrado ahora";
          clase = "estado-cerrado";
        } else {
          const margen = 5 / 60;
          let abierto = false, porAbrir = false, porCerrar = false;

          for (const rango of hoy) {
            const [inicio, fin] = rango;
            if (horaActual >= inicio && horaActual <= fin) abierto = true;
            if (horaActual >= inicio - margen && horaActual < inicio) porAbrir = true;
            if (horaActual > fin - margen && horaActual <= fin) porCerrar = true;
          }

          if (abierto) { estado = "Abierto ahora"; clase = "estado-abierto"; }
          else if (porAbrir) { estado = "Por abrir"; clase = "estado-por-abrir"; }
          else if (porCerrar) { estado = "Por cerrar"; clase = "estado-por-cerrar"; }
          else { estado = "Cerrado ahora"; clase = "estado-cerrado"; }
        }

        elemento.textContent = estado;
        elemento.className = "estado-horario " + clase;
      }

      actualizar();
      setInterval(actualizar, 30000);
    }

    const horarioTienda = {
      0: [],
      1: [[9, 19]],
      2: [[9, 19]],
      3: [[9, 19]],
      4: [[9, 19]],
      5: [[9, 19]],
      6: [[9, 16]]
    };

    const horarioServicio = {
      0: [],
      1: [[10, 14.5], [16, 18.5]],
      2: [[10, 14.5], [16, 18.5]],
      3: [[10, 14.5], [16, 18.5]],
      4: [[10, 14.5], [16, 18.5]],
      5: [[10, 14.5], [16, 18.5]],
      6: []
    };

    crearEstadoHorario("estado-tienda", horarioTienda);
    crearEstadoHorario("estado-servicio", horarioServicio);
  }

  /**
   * Initialize all components when DOM is ready
   */
  function initAll() {
    // Initialize components in sequence
    initIsotopeLayout();
    initSwiper();
    handleHashLinks();
    initNavmenuScrollspy();
    initFilterNavigation();
    highlightCurrentDay();
    initDynamicSchedule();
    
    // Re-init AOS after all content is loaded
    setTimeout(aosInit, 100);
  }

  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

})();