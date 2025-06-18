$(document).ready(function () {
  $.ajax({
    url: 'https://equipo-7-servicios.onrender.com/api/grafica/modaTipoArbol',
    method: 'GET',
    dataType: 'json',
    success: function (datos) {
      const labels = datos.map(item => item.label);
      const data = datos.map(item => item.valor);

      // Calcular la moda
      const maxFrecuencia = Math.max(...data);
      const modas = labels.filter((label, idx) => data[idx] === maxFrecuencia);

      $('#respuestaModa').html(
        `✨ La moda es: <strong>${modas.join(', ')}</strong> con ${maxFrecuencia} apariciones. 🌟`
      );

      // Colores verdes personalizados
      const colores = [
        '#A5D6A7', '#81C784', '#66BB6A', '#4CAF50', '#388E3C', '#2E7D32'
      ];
      const backgroundColors = labels.map((_, i) => colores[i % colores.length]);

      const ctx = document.getElementById('graficoArboles').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: '📊 Frecuencia',
            data: data,
            backgroundColor: backgroundColors,
            borderColor: '#2E7D32',
            borderWidth: 1,
            borderRadius: 8
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: '📈 Moda de los tipos de árboles',
              color: '#ffffff',
              font: { size: 20 }
            },
            legend: { display: false }
          },
          scales: {
            x: {
              ticks: {
                color: '#ffffff'
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              }
            },
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
                color: '#ffffff'
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              }
            }
          }
        }
      });
    },
    error: function () {
      $('#respuestaModa').html('❌ Error al cargar los datos de la moda.');
    }
  });
});
