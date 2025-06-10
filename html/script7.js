// --- INICIO JQUERY + AJAX ---
$(document).ready(function() {
  $.ajax({
    url: 'http://localhost:3000/api/grafica/riegoPorArbol',
    method: 'GET',
    dataType: 'json',
    success: function(datos) {
      // datos = [{label: "Roble", valor: 120}, ...]
      const labels = datos.map(item => item.label);
      const valores = datos.map(item => item.valor);

      const ctx = document.getElementById('graficaRiego').getContext('2d');
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            label: 'Cantidad de riego (litros)',
            data: valores,
            backgroundColor: [
              '#388E3C',
              '#66BB6A',
              '#A5D6A7',
              '#C8E6C9'
            ],
            borderColor: '#ffffff',
            borderWidth: 3
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: '#2e3d2f',
                font: { size: 14 }
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return context.label + ': ' + context.raw + ' litros';
                }
              }
            }
          },
          cutout: '60%'
        }
      });
    },
    error: function(xhr, status, error) {
      alert('Error al cargar los datos: ' + error);
    }
  });
});
// --- FIN JQUERY + AJAX ---