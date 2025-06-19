// --- INICIO JQUERY + AJAX ---
$(document).ready(function() {
  $.ajax({
    url: 'https://equipo-7-servicios.onrender.com/api/grafica/cantidadArbolesTipo',
    method: 'GET',
    dataType: 'json',
    success: function(datos) {
      // Usar nombreTipo como etiquetas y cantidad como valores
      const labels = datos.map(item => item.nombreTipo);
      const valores = datos.map(item => item.cantidad);

      // Calcular la moda (especie más frecuente)
      const max = Math.max(...valores);
      const modas = labels.filter((label, i) => valores[i] === max);

      // Mostrar la moda debajo de la gráfica
      if ($('#moda-tipo').length === 0) {
        $('#graficoP8').after(
          `<div id="moda-tipo" style="color:#388e3c; font-weight:bold; margin-top:10px; text-align:right;">
            Moda: ${modas.join(', ')} (${max} ejemplares)
          </div>`
        );
      } else {
        $('#moda-tipo').html(`Moda: ${modas.join(', ')} (${max} ejemplares)`);
      }

      const colores = [
        '#388e3c', '#66bb6a', '#81c784', '#a5d6a7', '#b2dfdb', '#aed581',
        '#fbc02d', '#ffb300', '#ff7043', '#8d6e63', '#789262', '#4dd0e1',
        '#9575cd', '#f06292', '#ba68c8', '#e57373', '#ffd54f', '#dce775'
      ];

      new Chart(document.getElementById('graficoP8'), {
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
// --- FIN JQUERY + AJAX ---