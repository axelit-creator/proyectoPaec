$(document).ready(function() {
  $.ajax({
    url: 'https://equipo-7-servicios.onrender.com/api/grafica/cantidadPlagas',
    method: 'GET',
    dataType: 'json',
    success: function(datos) {
      const labels = ['Monitoreos con plagas'];
      const valores = [datos[0].CantidadMonitoreosConPlagas];

      const ctx = document.getElementById('grafico').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Plagas detectadas',
            data: valores,
            backgroundColor: '#81c784',
            borderRadius: 8,
            barPercentage: 0.5,
            categoryPercentage: 0.5
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: '#3a5a40',
                font: { size: 14 }
              }
            },
            title: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y}`
              }
            }
          },
          scales: {
            x: {
              ticks: { color: '#3a5a40' },
              grid: { display: false }
            },
            y: {
              ticks: { color: '#3a5a40' },
              grid: { color: '#e0e0e0' }
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
