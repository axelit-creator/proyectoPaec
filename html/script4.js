$(document).ready(function () {
  $.ajax({
    url: 'https://equipo-7-servicios.onrender.com/api/grafica/modaAltura', // <-- Cambia esta URL si aplica
    method: 'GET',
    dataType: 'json',
    success: function (datos) {
      const labels = datos.map(item => item.label);
      const valores = datos.map(item => item.valor);

      const colores = [
        '#A5D6A7', '#81C784', '#66BB6A', '#4CAF50', '#388E3C', '#2E7D32'
      ];
      const backgroundColors = labels.map((_, i) => colores[i % colores.length]);

      const ctx = document.getElementById('graficoModa').getContext('2d');
      new Chart(ctx, {
        type: 'polarArea',
        data: {
          labels: labels,
          datasets: [{
            label: 'Frecuencia',
            data: valores,
            backgroundColor: backgroundColors,
            borderColor: '#ffffff33',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: '🌿 Moda de la Altura',
              color: '#ffffff',
              font: {
                size: 20,
                weight: 'bold'
              }
            },
            legend: {
              position: 'right',
              labels: {
                color: '#ffffff'
              }
            },
            tooltip: {
              backgroundColor: '#ffffff',
              titleColor: '#2E7D32',
              bodyColor: '#2E7D32',
              borderColor: '#4CAF50',
              borderWidth: 1
            }
          },
          animation: {
            animateScale: true
          }
        }
      });
    },
    error: function () {
      $('body').append('<p style="color:white;text-align:center;">❌ Error al cargar la moda de la altura.</p>');
    }
  });
});
