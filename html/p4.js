// --- INICIO JQUERY + AJAX ---
$(document).ready(function() {
  $.ajax({
    url: 'http://localhost:3000/api/grafica/modaTipoArbol',
    method: 'GET',
    dataType: 'json',
    success: function(datos) {
      const labels = datos.map(item => item.label);
      const valores = datos.map(item => item.valor);

      const ctx = document.getElementById('graficoModa').getContext('2d');
      new Chart(ctx, {
        type: 'polarArea',
        data: {
          labels: labels,
          datasets: [{
            label: 'Frecuencia',
            data: valores,
            backgroundColor: [
              '#388e3c', '#66bb6a', '#a5d6a7', '#c8e6c9', '#81c784'
            ]
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'right' },
            title: {
              display: true,
              text: 'Moda de Tipos de Árboles'
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