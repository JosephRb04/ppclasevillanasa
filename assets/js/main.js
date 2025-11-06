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
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

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
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

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
   * Re-inicializa Swiper y refresca AOS una vez cargado el DOM
   */
  document.addEventListener("DOMContentLoaded", function() {
    if (typeof Swiper !== 'undefined') {
      document.querySelectorAll('.init-swiper').forEach(function(swiperEl) {
        const configEl = swiperEl.querySelector('.swiper-config');
        if (configEl) {
          const config = JSON.parse(configEl.textContent);
          new Swiper(swiperEl, config);
        }
      });
    }

    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
  });
  
document.addEventListener('DOMContentLoaded', function () {
  // Maneja tanto Papelería como Accesorios
  const filterLinks = {
    '#filter-papeleria': '.filter-web',
    '#filter-accesorios': '.filter-mobile',
    '#filter-muebleria': '.filter-branding',
    '#filter-equipos': '.filter-ui'
  };

  // Agrega listeners a ambos enlaces
  Object.keys(filterLinks).forEach(filterId => {
    const link = document.querySelector(`a[href="${filterId}"]`);
    if (!link) return;
    
    link.addEventListener('click', function (e) {
      e.preventDefault();
      // Mantiene el scroll hacia Products como tenías
      const target = document.querySelector('#Products');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        
        // Después del scroll, activa el filtro correspondiente
        setTimeout(() => {
          const filterElement = document.querySelector(filterId);
          if (filterElement) {
            filterElement.click();
          }
        }, 700); // Pequeño delay para que termine el scroll
      }
    });
  });
});

/**
 * Horario de atención dinámico
*/

function actualizarEstadoHorario() {
  const hoy = new Date();
  const diaSemana = hoy.getDay(); // 0 Dom - 6 Sáb
  const hora = hoy.getHours();
  const minutos = hoy.getMinutes();
  
  // Horarios en formato 24h
  const horarios = {
    1: { apertura: 9, cierre: 19 }, // Lunes
    2: { apertura: 9, cierre: 19 }, // Martes
    3: { apertura: 9, cierre: 19 }, // Miércoles
    4: { apertura: 9, cierre: 19 }, // Jueves
    5: { apertura: 9, cierre: 19 }, // Viernes
    6: { apertura: 9, cierre: 16 }, // Sábado
    0: null // Domingo cerrado
  };

  const hoyHorario = horarios[diaSemana];
  const estado = document.getElementById("estadoHorario");
  const horarioTexto = document.getElementById("horarioHoy");

  // Domingo o sin horario
  if (!hoyHorario) {
    estado.textContent = "Cerrado (Hoy no hay servicio)";
    horarioTexto.textContent = "Horario: —";
    return;
  }

  const ahoraEnMin = hora * 60 + minutos;
  const apertura = hoyHorario.apertura * 60;
  const cierre = hoyHorario.cierre * 60;

  // Mostrar horario del día
  horarioTexto.textContent = `Horario de hoy: ${hoyHorario.apertura}:00 a ${hoyHorario.cierre}:00 hrs`;

  // Por abrir (faltan menos de 5 min)
  if (ahoraEnMin >= apertura - 5 && ahoraEnMin < apertura) {
    estado.textContent = "Por abrir (en menos de 5 minutos)";
    return;
  }

  // Por cerrar (faltan menos de 5 min)
  if (ahoraEnMin >= cierre - 5 && ahoraEnMin < cierre) {
    estado.textContent = "Por cerrar (quedan ~5 minutos)";
    return;
  }

  // Abierto
  if (ahoraEnMin >= apertura && ahoraEnMin < cierre) {
    estado.textContent = "Abierto";
    return;
  }

  // Cerrado
  estado.textContent = "Cerrado";
}


  document.addEventListener("DOMContentLoaded", actualizarEstadoHorario);


 


/*
document.addEventListener('DOMContentLoaded', () => {
  const dias = document.querySelectorAll('.list-hours .hour');
  
  const hoy = new Date().getDay();
  if (dias[hoy]) {
    dias[hoy].classList.add('today');
  } else {
    console.warn('No se encontró el elemento correspondiente al día actual.');
  }
});
*/

window.addEventListener('DOMContentLoaded', event => {
    const listHoursArray = document.body.querySelectorAll('.list-hours li');
    listHoursArray[new Date().getDay()].classList.add(('today'));
})



})();