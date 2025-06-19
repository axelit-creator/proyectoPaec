// --- INICIO JQUERY + AJAX ---
$(document).ready(function() {
  $.ajax({
    url: 'https://equipo-7-servicios.onrender.com/api/grafica/alumnosPorArbol',
    method: 'GET',
    dataType: 'json',
    success: function(datos) {
      // Usar nombreTipo como etiquetas y cantidadAlumnos como valores
      const labels = datos.map(item => item.nombreTipo);
      const valores = datos.map(item => item.cantidadAlumnos);

      // Calcular la moda (tipo con más alumnos)
      const max = Math.max(...valores);
      const modas = labels.filter((label, i) => valores[i] === max);

      // Mostrar la moda debajo de la gráfica
      if ($('#moda-alumnos').length === 0) {
        $('#graficoP10').after(
          `<div id="moda-alumnos" style="color:#388e3c; font-weight:bold; margin-top:10px; text-align:right;">
            Moda: ${modas.join(', ')} (${max} alumnos)
          </div>`
        );
      } else {
        $('#moda-alumnos').html(`Moda: ${modas.join(', ')} (${max} alumnos)`);
      }

      const colores = [
        '#388e3c', '#66bb6a', '#81c784', '#a5d6a7', '#b2dfdb', '#aed581',
        '#fbc02d', '#ffb300', '#ff7043', '#8d6e63', '#789262', '#4dd0e1',
        '#9575cd', '#f06292', '#ba68c8', '#e57373', '#ffd54f', '#dce775'
      ];

      new Chart(document.getElementById('graficoP10'), {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Cantidad de alumnos',
            data: valores,
            backgroundColor: colores.slice(0, labels.length)
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            title: { display: false }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    },
    error: function(xhr, status, error) {
      alert('Error al cargar los datos: ' + error);
    }
  });
});
// --- FIN JQUERY + AJAX ---