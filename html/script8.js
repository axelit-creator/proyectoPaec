// --- INICIO JQUERY + AJAX ---
$(document).ready(function() {
  $.ajax({
    url: 'http://localhost:3000/api/grafica/cantidadArbolesTipo',
    method: 'GET',
    dataType: 'json',
    success: function(datos) {
      const labels = datos.map(item => item.label);
      const valores = datos.map(item => item.valor);

      const ctx = document.getElementById('graficaBarras').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Cantidad de árboles',
            data: valores,
            backgroundColor: [
              '#388E3C',
              '#66BB6A',
              '#A5D6A7',
              '#C8E6C9'
            ],
            borderColor: '#ffffff',
            borderWidth: 1
          }]
        },
        options: {
          indexAxis: 'y', // barras horizontales
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return ${context.parsed.x} árboles;
                }
              }
            }
          },
          scales: {
            x: {
              beginAtZero: true,
              ticks: { color: '#2e3d2f' },
              grid: { color: '#e0e0e0' }
            },
            y: {
              ticks: { color: '#2e3d2f' },
              grid: { color: '#f5f5f5' }
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