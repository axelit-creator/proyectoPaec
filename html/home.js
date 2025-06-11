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
    if (container.querySelector('.popover-pregunta')) container.querySelector('.popover-pregunta').remove();
    const popover = document.createElement('div');
    popover.className = 'popover-pregunta popover-fijo';
    popover.innerHTML = `
      <button class="close-popover" onclick="cerrarPopoverFijo()">×</button>
      <h2>${preguntas[num]}</h2>
      <button onclick="verGrafica(${num})">Ver Gráfica</button>
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

  window.verGrafica = function(num) {
    if (num == 1) {
      window.location.href = 'pg1.html';
    }
    else if (num == 2) {
      window.location.href = 'pg2.html';
    }
    else if (num == 3) {
      window.location.href = 'pg3.html';
    }
    else if (num == 4) {
      window.location.href = 'pg4.html';
    }
    else if (num == 5) {
      window.location.href = 'pg5.html';
    }
    else if (num == 6) {
      window.location.href = 'pg6.html';
    }
    else if (num == 7) {
      window.location.href = 'pg7.html';
    }
    else if (num == 8) {
      window.location.href = 'pg8.html';
    }
    else if (num == 9) {
      window.location.href = 'pg9.html';
    }
    else if (num == 10) {
      window.location.href = 'pg10.html';
    }
    else {
      alert("No hay gráfica disponible para esta pregunta.");
    }
  };

  document.querySelectorAll('.btn-container').forEach(container => {
    const btn = container.querySelector('.question-btn');
    const num = btn.getAttribute('onclick').match(/\d+/)[0];
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
      // Elimina cualquier popover previo
      document.querySelectorAll('.popover-pregunta').forEach(p => {
        if (!p.classList.contains('popover-fijo')) p.remove();
      });
      if (popoverFijo) popoverFijo.remove();
      popoverFijo = crearPopoverFijo(num, container, isLeft);
      popoverFijoContainer = container;
    });
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
});