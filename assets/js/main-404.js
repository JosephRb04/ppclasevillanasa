(function() {
  "use strict";

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    if (typeof AOS === 'undefined') return;

    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

  // Inicializar AOS cuando cargue la página
  window.addEventListener('load', aosInit);

})();