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
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Function to ensure critical sections are visible
   */
  function ensureCriticalSectionsVisible() {
    const criticalSections = ['#clients', '#contact'];
    criticalSections.forEach(sectionId => {
      const section = document.querySelector(sectionId);
      if (section) {
        // Remover atributos de AOS que puedan interferir
        section.removeAttribute('data-aos');
        section.removeAttribute('data-aos-delay');
        section.classList.remove('aos-animate', 'aos-init');
        
        // Forzar visibilidad
        section.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; transform: none !important;';
      }
    });
  }

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    if (typeof AOS === 'undefined') return;

    // Primero asegurar secciones críticas
    ensureCriticalSectionsVisible();

    // Luego inicializar AOS
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      disable: 'mobile'
    });

    // Volver a asegurar secciones críticas después de AOS
    setTimeout(ensureCriticalSectionsVisible, 100);
  }

  // Inicializar AOS y asegurar secciones críticas en varios puntos
  document.addEventListener('DOMContentLoaded', () => {
    ensureCriticalSectionsVisible();
  });

  window.addEventListener('load', () => {
    aosInit();
    ensureCriticalSectionsVisible();
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
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
        // Después de filtrar, asegurar que las secciones críticas permanezcan visibles
        setTimeout(ensureCriticalSectionsVisible, 100);
      }, false);
    });

  });

  /**
   * Init swiper for clients section
   */
  function initClientsSwiper() {
    const clientsSection = document.querySelector("#clients");
    const clientsSwiper = clientsSection?.querySelector(".init-swiper");
    
    if (clientsSwiper) {
      try {
        // Asegurar que la sección esté visible antes de inicializar Swiper
        clientsSection.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important;';
        
        const configEl = clientsSwiper.querySelector(".swiper-config");
        if (configEl) {
          const config = JSON.parse(configEl.innerHTML.trim());
          
          // Si ya existe una instancia de Swiper, destruirla
          if (clientsSwiper.swiper) {
            clientsSwiper.swiper.destroy(true, true);
          }
          
          // Crear nueva instancia de Swiper
          const swiper = new Swiper(clientsSwiper, config);
          
          // Asegurar que la sección permanezca visible después de la inicialización
          setTimeout(() => {
            ensureCriticalSectionsVisible();
          }, 100);
        }
      } catch (e) {
        console.warn('Error initializing clients swiper:', e);
      }
    }
  }

  // Inicializar Swiper en múltiples puntos para mayor seguridad
  document.addEventListener("DOMContentLoaded", initClientsSwiper);
  window.addEventListener("load", initClientsSwiper);
  // También reinicializar cuando se cambia el tamaño de la ventana
  window.addEventListener("resize", () => {
    setTimeout(initClientsSwiper, 100);
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
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
  });

  /**
   * Navmenu Scrollspy
   */
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
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Prevent page reload on logo clicks and handle smooth scroll
   */
  document.addEventListener('click', function(e) {
    const target = e.target.closest('.logo');
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      // Re-ensure critical sections are visible after logo click
      setTimeout(ensureCriticalSectionsVisible, 100);
      // Also ensure swiper is working
      setTimeout(initClientsSwiper, 200);
    }
  });

})();


  /**
   * Manejo de filtros y scroll para catálogos
   */

document.addEventListener('DOMContentLoaded', function () {

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

});

/**
 * Resaltar el día actual en bloques de horarios
 */

window.addEventListener('DOMContentLoaded', event => {
    // Seleccionar todos los bloques de horarios
    const hoursBlocks = document.body.querySelectorAll('.list-hours');
    
    // Para cada bloque de horarios
    hoursBlocks.forEach(block => {
        const listHoursArray = block.querySelectorAll('li');
        const todayIndex = new Date().getDay(); // 0=Domingo, 1=Lunes, etc.
        
        // Aplicar la clase 'today' al día actual en este bloque
        if (listHoursArray[todayIndex]) {
            listHoursArray[todayIndex].classList.add('today');
        }
    });
});


/**
 * Horario de apertura dinámico
 */



function crearEstadoHorario(elementId, horarios) {
  const elemento = document.getElementById(elementId);

  function actualizar() {
    const ahora = new Date();
    const dia = ahora.getDay(); // 0=Dom ... 6=Sáb
    const horaActual = ahora.getHours() + ahora.getMinutes() / 60;
    const hoy = horarios[dia];

    let estado, clase;

    if (!hoy || hoy.length === 0) {
      estado = "Cerrado ahora";
      clase = "estado-cerrado";
    } else {
      const margen = 5 / 60; // 5 minutos antes
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
  setInterval(actualizar, 30000); // actualiza cada 30 segundos
}

/* --- Horarios en formato [inicio, fin] usando 24h --- */
const horarioTienda = {
  0: [], // Domingo
  1: [[9, 19]],
  2: [[9, 19]],
  3: [[9, 19]],
  4: [[9, 19]],
  5: [[9, 19]],
  6: [[9, 16]]
};

const horarioServicio = {
  0: [], // Domingo
  1: [[10, 14.5], [16, 18.5]],
  2: [[10, 14.5], [16, 18.5]],
  3: [[10, 14.5], [16, 18.5]],
  4: [[10, 14.5], [16, 18.5]],
  5: [[10, 14.5], [16, 18.5]],
  6: [] // Sábado cerrado
};

/* --- Inicializar ambos --- */
crearEstadoHorario("estado-tienda", horarioTienda);
crearEstadoHorario("estado-servicio", horarioServicio);
