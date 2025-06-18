function mostrarSeccion(id) {
  const activa = document.getElementById(id);
  const secciones = document.querySelectorAll('.seccion');

  // Oculta todas con animación de salida
  secciones.forEach(seccion => {
    if (seccion.classList.contains('visible')) {
      seccion.classList.add('fade-out');
      seccion.classList.remove('fade-in');
      
      // Espera a que termine la animación antes de ocultar
      setTimeout(() => {
        seccion.classList.remove('visible');
        seccion.classList.add('oculto');
        seccion.classList.remove('fade-out');
      }, 500);
    }
  });

  // Después de un momento, muestra la nueva sección
  setTimeout(() => {
    activa.classList.remove('oculto');
    activa.classList.add('visible');
    activa.classList.add('fade-in');
  }, 550);
}

function verGraficas() {
  mostrarSeccion('graficas');
}
