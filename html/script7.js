// --- INICIO JQUERY + AJAX ---
$(document).ready(function() {
  $.ajax({
    url: 'https://equipo-7-servicios.onrender.com/api/grafica/riegoPorArbol',
    method: 'GET',
    dataType: 'json',
    success: function(datos) {
      // Agrupar y contar por método de riego
      const conteo = {};
      datos.forEach(item => {
        conteo[item.metodoRiego] = (conteo[item.metodoRiego] || 0) + 1;
      });
      const labels = Object.keys(conteo);
      const valores = Object.values(conteo);

      const colores = [
        '#388e3c', '#66bb6a', '#81c784', '#a5d6a7', '#b2dfdb', '#aed581',
        '#fbc02d', '#ffb300', '#ff7043', '#8d6e63', '#789262', '#4dd0e1',
        '#9575cd', '#f06292', '#ba68c8', '#e57373', '#ffd54f', '#dce775'
      ];

      new Chart(document.getElementById('graficoP7'), {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Cantidad de riegos',
            data: valores,
            backgroundColor: colores.slice(0, labels.length)
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            title: { display: true, text: 'Cantidad de riegos por Método' }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Método de Riego',
                color: '#2e3d2f',
                font: { size: 16, weight: 'bold' }
              },
              ticks: {
                color: '#2e3d2f',
                font: { size: 14 }
              }
            },
            y: {
              title: {
                display: true,
                text: 'Cantidad',
                color: '#2e3d2f',
                font: { size: 16, weight: 'bold' }
              },
              ticks: {
                color: '#2e3d2f',
                font: { size: 14 }
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