$(document).ready(function() {
  // Primer endpoint
  $.ajax({
    url: 'https://equipo-7-servicios.onrender.com/api/grafica/promedioAltura',
    method: 'GET',
    dataType: 'json',
    success: function(datos) {
      // Generar etiquetas automáticas (por ejemplo, "Dato 1", "Dato 2", ...)
      const labels = datos.map((item, idx) => `Dato ${idx + 1}`);
      // Convertir los valores de alturaCM a número
      const valores = datos.map(item => Number(item.alturaCM));

      // Calcular el promedio
      const suma = valores.reduce((acc, val) => acc + val, 0);
      const promedio = (suma / valores.length).toFixed(2);

      // Mostrar el promedio en un div (asegúrate de tener <div id="promedio-altura"></div> en tu HTML)
      $('#promedio-altura').text(`El promedio de altura es: ${promedio} cm`);

      new Chart(document.getElementById('graficoP1'), {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Altura (cm)',
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
      alert('Error al cargar promedioAltura: ' + error);
    }
  });
});