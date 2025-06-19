$(document).ready(function() {
  $.ajax({
    url: 'https://equipo-7-servicios.onrender.com/api/grafica/cantidadPlagas',
    method: 'GET',
    dataType: 'json',
    success: function(datos) {
      // Agrupar y contar por plaga detectada
      const conteo = {};
      datos.forEach(item => {
        conteo[item.plagasDetectadas] = (conteo[item.plagasDetectadas] || 0) + 1;
      });
      const labels = Object.keys(conteo);
      const valores = Object.values(conteo);

      // Calcular la moda (plaga más frecuente)
      const max = Math.max(...valores);
      const modas = labels.filter((label, i) => valores[i] === max);

      // Mostrar la moda debajo de la gráfica
      if ($('#moda-plaga').length === 0) {
        $('#graficoP9').after(
          `<div id="moda-plaga" style="color:#388e3c; font-weight:bold; margin-top:10px; text-align:right;">
            Moda: ${modas.join(', ')} (${max} registros)
          </div>`
        );
      } else {
        $('#moda-plaga').html(`Moda: ${modas.join(', ')} (${max} registros)`);
      }

      const colores = [
        '#388e3c', '#66bb6a', '#81c784', '#a5d6a7', '#b2dfdb', '#aed581',
        '#fbc02d', '#ffb300', '#ff7043', '#8d6e63', '#789262', '#4dd0e1'
      ];

      new Chart(document.getElementById('graficoP9'), {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Cantidad',
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
