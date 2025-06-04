// --- INICIO JQUERY + AJAX ---
$(document).ready(function() {
  $.ajax({
    url: 'http://localhost:3000/api/promedioAltura',
    method: 'GET',
    dataType: 'json',
    success: function(datos) {
      const labels = datos.map(item => item.label);
      const valores = datos.map(item => item.valor);

      new Chart(document.getElementById('graficoP1'), {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Altura promedio (m)',
            data: valores,
            backgroundColor: '#81c784',
            borderRadius: 6,
            barPercentage: 0.5,
            categoryPercentage: 0.5
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            title: { display: false },
            tooltip: {
              callbacks: {
                label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y} m`
              }
            }
          },
          scales: {
            y: {
              ticks: {
                font: { size: 12 },
                color: '#4caf50'
              },
              grid: {
                color: '#e0e0e0'
              }
            },
            x: {
              ticks: {
                font: { size: 12 },
                color: '#4caf50'
              },
              grid: {
                display: false
              }
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