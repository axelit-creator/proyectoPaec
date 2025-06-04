// --- INICIO JQUERY + AJAX ---
$(document).ready(function() {
  $.ajax({
    url: 'http://localhost:3000/api/alumnosPorArbol',
    method: 'GET',
    dataType: 'json',
    success: function(datos) {
      console.log(datos); // <-- Agrega esto para ver los datos recibidos
      const labels = datos.map(item => item.label);
      const valores = datos.map(item => item.valor);

      const ctx = document.getElementById('treeChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Cantidad de alumnos',
            data: valores,
            backgroundColor: [
              '#a8d5ba',
              '#cce5cc',
              '#9fd6a3',
              '#d1eacb',
              '#b5deb0'
            ],
            borderRadius: 10,
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: '#fff9c4',
              titleColor: '#2e5939',
              bodyColor: '#2e5939'
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: '#2e5939'
              },
              grid: {
                color: '#eaeaea'
              }
            },
            x: {
              ticks: {
                color: '#2e5939'
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