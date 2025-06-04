// --- INICIO JQUERY + AJAX ---
$(document).ready(function() {
  $.ajax({
    url: 'http://localhost:3000/api/modaAltura',
    method: 'GET',
    dataType: 'json',
    success: function(datos) {
      // Supón que datos = [{label: "150", valor: 2}, ...]
      const labels = datos.map(item => item.label);
      const valores = datos.map(item => item.valor);

      const ctx = document.getElementById('graficoAltura').getContext('2d');
      new Chart(ctx, {
        type: 'polarArea',
        data: {
          labels: labels,
          datasets: [{
            label: 'Frecuencia de Altura (cm)',
            data: valores,
            backgroundColor: [
              '#d5e8d4',
              '#b7ddb0',
              '#a8d5ba',
              '#98c99f',
              '#a8d5ba',
              '#b7ddb0',
              '#d5e8d4'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'right',
              labels: {
                color: '#4b785c',
                font: { size: 14 }
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `Altura: ${context.label} cm - Frecuencia: ${context.formattedValue}`;
                }
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