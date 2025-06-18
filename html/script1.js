$(document).ready(function () {
  $.ajax({
    url: 'https://equipo-7-servicios.onrender.com/api/grafica/promedioAltura',
    method: 'GET',
    dataType: 'json',
    success: function (datos) {
      const labels = datos.map(item => item.label);
      const valores = datos.map(item => item.valor);

      new Chart(document.getElementById('graficoP1'), {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Altura promedio (cm)',
            data: valores,
            backgroundColor: [
              'rgba(129,199,132,0.6)',
              'rgba(102,187,106,0.6)',
              'rgba(76,175,80,0.6)',
              'rgba(56,142,60,0.6)',
              'rgba(27,94,32,0.6)'
            ],
            borderRadius: 10,
            barPercentage: 0.6,
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
              backgroundColor: 'rgba(255,255,255,0.9)',
              titleColor: '#2e7d32',
              bodyColor: '#2e7d32',
              borderColor: '#4CAF50',
              borderWidth: 1,
              callbacks: {
                label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y} cm`
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                font: {
                  family: 'Poppins',
                  size: 14
                },
                color: '#ffffff'
              },
              grid: {
                color: 'rgba(255,255,255,0.1)'
              }
            },
            x: {
              ticks: {
                font: {
                  family: 'Poppins',
                  size: 14
                },
                color: '#ffffff'
              },
              grid: {
                display: false
              }
            }
          }
        }
      });
    },
    error: function (xhr, status, error) {
      alert('Error al cargar promedioAltura: ' + error);
    }
  });
});
