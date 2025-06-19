$(document).ready(function () {
  $.ajax({
    url: 'https://equipo-7-servicios.onrender.com/api/grafica/modaAltura', // Cambia la URL si aplica
    method: 'GET',
    dataType: 'json',
    success: function (datos) {
      // Obtener solo los valores de altura
      const alturas = datos.map(item => Number(item.alturaCM));

      // Calcular la frecuencia de cada altura
      const frecuencia = {};
      alturas.forEach(altura => {
        frecuencia[altura] = (frecuencia[altura] || 0) + 1;
      });

      // Encontrar la(s) moda(s)
      const maxFrecuencia = Math.max(...Object.values(frecuencia));
      const modas = Object.keys(frecuencia).filter(altura => frecuencia[altura] === maxFrecuencia);

      // Preparar datos para la gráfica
      const labels = Object.keys(frecuencia);
      const valores = Object.values(frecuencia);

      const colores = [
        '#A5D6A7', '#81C784', '#66BB6A', '#4CAF50', '#388E3C', '#2E7D32'
      ];
      const backgroundColors = labels.map((_, i) => colores[i % colores.length]);

      const ctx = document.getElementById('graficoModa').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
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
          indexAxis: 'y',
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: `🌿 Moda de la Altura: ${modas.join(', ')} cm (${maxFrecuencia} repeticiones)`,
              color: '#ffffff',
              font: {
                size: 20,
                weight: 'bold'
              }
            },
            legend: {
              display: false
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
      alert('Error al cargar los datos de la moda de altura.');
    }
  });
});
