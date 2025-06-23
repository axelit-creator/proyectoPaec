function mostrarSeccion(id) {
  const activa = document.getElementById(id);
  const secciones = document.querySelectorAll('.seccion');

  secciones.forEach(seccion => {
    if (seccion.classList.contains('visible')) {
      seccion.classList.add('fade-out');
      seccion.classList.remove('fade-in');
      setTimeout(() => {
        seccion.classList.remove('visible');
        seccion.classList.add('oculto');
        seccion.classList.remove('fade-out');
      }, 500);
    }
  });

  setTimeout(() => {
    activa.classList.remove('oculto');
    activa.classList.add('visible');

    // 🚀 Animación GSAP cuando cambia de sección
    gsap.from(activa, {
      duration: 0.7,
      opacity: 0,
      y: 30,
      ease: "power2.out"
    });
  }, 550);
}

function verGraficas() {
  mostrarSeccion('graficas');
}
