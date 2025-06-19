// --- INICIO JQUERY + AJAX ---
$(document).ready(function() {
  $.ajax({
    url: 'https://equipo-7-servicios.onrender.com/api/grafica/riegoPorArbol',
    method: 'GET',
    dataType: 'json',
    success: function(datos) {
      // Agrupar y contar por método de riego
      const conteo = {};
      datos.forEach(item => {
        conteo[item.metodoRiego] = (conteo[item.metodoRiego] || 0) + 1;
      });
      const labels = Object.keys(conteo);
      const valores = Object.values(conteo);

      // Calcular la moda
      const max = Math.max(...valores);
      const modas = labels.filter((label, i) => valores[i] === max);

      // Mostrar la moda debajo de la gráfica
      if ($('#moda-riego').length === 0) {
        $('#graficoP7').after(
          `<div id="moda-riego" style="color:#388e3c; font-weight:bold; margin-top:10px; text-align:right;">
            Moda: ${modas.join(', ')} (${max} riegos)
          </div>`
        );
      } else {
        $('#moda-riego').html(`Moda: ${modas.join(', ')} (${max} riegos)`);
      }

      const colores = [
        '#388e3c', '#66bb6a', '#81c784', '#a5d6a7', '#b2dfdb', '#aed581',
        '#fbc02d', '#ffb300', '#ff7043', '#8d6e63', '#789262', '#4dd0e1',
        '#9575cd', '#f06292', '#ba68c8', '#e57373', '#ffd54f', '#dce775'
      ];

      new Chart(document.getElementById('graficoP7'), {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Cantidad de riegos',
            data: valores,
            backgroundColor: colores.slice(0, labels.length)
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            title: { display: true, text: 'Cantidad de riegos por método' }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: { display: true, text: 'Cantidad' }
            },
            x: {
              title: { display: true, text: 'Método de riego' }
            }
          }
        }
      });
    },
    error: function() {
      alert('Error al cargar los datos.');
    }
  });
});
// --- FIN JQUERY + AJAX ---