// --- INICIO JQUERY + AJAX ---
$(document).ready(function() {
  $.ajax({
    url: 'http://localhost:3000/api/grafica/cantidadArbolesTipo',
    method: 'GET',
    dataType: 'json',
    success: function(datos) {
      // datos = [{ label: "Roble 🌳", valor: 120 }, ...]
      const labels = datos.map(item => item.label);
      const valores = datos.map(item => item.valor);

      const ctx5 = document.getElementById('grafico5').getContext('2d');
      new Chart(ctx5, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Cantidad de árboles',
            data: valores,
            backgroundColor: ['#66bb6a', '#81c784', '#a5d6a7', '#c8e6c9'],
            borderColor: '#2e7d32',
            borderWidth: 1,
            borderRadius: 8,
            hoverBackgroundColor: '#43a047'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              labels: {
                color: '#2e7d32',
                font: { size: 14 }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { color: '#2e7d32' },
              grid: { color: '#e0f2f1' }
            },
            x: {
              ticks: { color: '#2e7d32' },
              grid: { color: '#f1f8e9' }
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