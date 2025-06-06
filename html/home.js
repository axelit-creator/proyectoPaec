document.addEventListener('DOMContentLoaded', function() {
  const preguntas = {
    1: "¿Cual es el promedio de altura de los arboles?",
    2: "¿Cual es la cantidad de arboles por metodo de riego?",
    3: "¿Cual es la moda de los tipos de arboles?",
    4: "¿Cual es la moda de la altura?",
    5: "¿Cual es la cantidad de arboles por tipo?",
    6: "¿Cual es el promedio de arboles plantados al mes?",
    7: "¿Cual es la cantidad de riego por arbol?",
    8: "¿Cual es el promedio de diametro por tipo de arbol?",
    9: "¿Cual es la cantidad de monitoreos con plagas detectadas?",
    10: "¿Cual es la cantidad de alumnos asignados a cada tipo de arbol?",
  };

  let popoverFijo = null;
  let popoverFijoContainer = null;

  function crearPopoverPregunta(num, container, isLeft) {
    if (container.querySelector('.popover-pregunta')) return;
    const popover = document.createElement('div');
    popover.className = 'popover-pregunta';
    popover.innerHTML = `<h2>${preguntas[num]}</h2>`;
    if (isLeft) {
      popover.style.right = '110%';
    } else {
      popover.style.left = '110%';
    }
    container.appendChild(popover);
    setTimeout(() => popover.classList.add('visible'), 10);
    return popover;
  }

  function crearPopoverFijo(num, container, isLeft) {
    const prev = container.querySelector('.popover-pregunta');
    if (prev) prev.remove();
    const popover = document.createElement('div');
    popover.className = 'popover-pregunta popover-fijo';
    popover.innerHTML = `
      <button class="close-popover" type="button">×</button>
      <h2>${preguntas[num]}</h2>
      <button class="ver-grafica-btn" type="button" data-num="${num}">Ver Gráfica</button>
    `;
    if (isLeft) {
      popover.style.right = '110%';
    } else {
      popover.style.left = '110%';
    }
    container.appendChild(popover);
    setTimeout(() => popover.classList.add('visible'), 10);
    return popover;
  }

  window.cerrarPopoverFijo = function() {
    if (popoverFijo) {
      popoverFijo.remove();
      popoverFijo = null;
      popoverFijoContainer = null;
    }
  };

  function verGrafica(num) {
    if (num >= 1 && num <= 10) {
      window.location.href = `p${num}.html`;
    } else {
      alert("No hay gráfica disponible para esta pregunta.");
    }
  }

  // Elimina los onclick del HTML si existen (por si acaso)
  document.querySelectorAll('.question-btn').forEach(btn => {
    btn.removeAttribute('onclick');
  });

  // Eventos de hover y click para los botones
  document.querySelectorAll('.btn-container').forEach(container => {
    const btn = container.querySelector('.question-btn');
    const num = btn.textContent.trim();
    const isLeft = container.classList.contains('left');

    container.addEventListener('mouseenter', () => {
      if (popoverFijo) return;
      crearPopoverPregunta(num, container, isLeft);
    });

    container.addEventListener('mouseleave', () => {
      if (popoverFijo && popoverFijoContainer === container) return;
      const pop = container.querySelector('.popover-pregunta');
      if (pop && !pop.classList.contains('popover-fijo')) pop.remove();
    });

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      document.querySelectorAll('.popover-pregunta').forEach(p => {
        if (!p.classList.contains('popover-fijo')) p.remove();
      });
      if (popoverFijo) popoverFijo.remove();
      popoverFijo = crearPopoverFijo(num, container, isLeft);
      popoverFijoContainer = container;
    });
  });

  // Delegación para los botones dentro del popover
  document.body.addEventListener('click', function(e) {
    if (e.target.classList.contains('close-popover')) {
      window.cerrarPopoverFijo();
    }
    if (e.target.classList.contains('ver-grafica-btn')) {
      const num = parseInt(e.target.getAttribute('data-num'), 10);
      verGrafica(num);
    }
  });

  document.addEventListener('click', function(e) {
    if (
      popoverFijo &&
      !e.target.closest('.popover-pregunta') &&
      !e.target.classList.contains('question-btn')
    ) {
      window.cerrarPopoverFijo();
    }
  });

  // Por compatibilidad, si algún onclick queda en el HTML
  window.mostrarPregunta = function(num) {
    const btn = Array.from(document.querySelectorAll('.question-btn')).find(b => b.textContent.trim() === String(num));
    if (!btn) return;
    const container = btn.closest('.btn-container');
    const isLeft = container.classList.contains('left');
    if (popoverFijo) popoverFijo.remove();
    document.querySelectorAll('.popover-pregunta').forEach(p => {
      if (!p.classList.contains('popover-fijo')) p.remove();
    });
    popoverFijo = crearPopoverFijo(num, container, isLeft);
    popoverFijoContainer = container;
  };
});