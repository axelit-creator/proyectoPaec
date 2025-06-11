$(document).ready(function() {
  // Primer endpoint
  $.ajax({
    url: 'https://equipo-7.onrender.com/api/grafica/promedioAltura',
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
            label: 'Altura promedio (cm)',
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
      alert('Error al cargar promedioAltura: ' + error);
    }
  });

  // Segundo endpoint
  $.ajax({
    url: 'http://localhost:3000/api/grafica/promedioDiametro',
    method: 'GET',
    dataType: 'json',
    success: function(datos) {
      const labels = datos.map(item => item.label);
      const valores = datos.map(item => item.valor);

      new Chart(document.getElementById('graficoP2'), {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Diámetro promedio (cm)',
            data: valores,
            backgroundColor: '#64b5f6',
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
                label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y} cm`
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
      alert('Error al cargar promedioDiametro: ' + error);
    }
  });

  // Puedes seguir agregando más peticiones AJAX aquí
});