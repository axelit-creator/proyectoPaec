$(document).ready(function() {
  // Espera a que termine la animación para dibujar el gráfico
  $('.grafico-container').on('animationend', function() {
    $.ajax({
      url: 'https://equipo-7-servicios.onrender.com/api/grafica/cantidadArbolesTipo',
      method: 'GET',
      dataType: 'json',
      success: function(datos) {
        const labels = datos.map(item => item.nombreTipo);
        const valores = datos.map(item => item.cantidad);

        const colores = [
          '#388e3c', '#66bb6a', '#81c784', '#a5d6a7', '#b2dfdb', '#aed581',
          '#fbc02d', '#ffb300', '#ff7043', '#8d6e63', '#789262', '#4dd0e1',
          '#9575cd', '#f06292', '#ba68c8', '#e57373', '#ffd54f', '#dce775'
        ];

        new Chart(document.getElementById('graficoP5'), {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Cantidad',
              data: valores,
              backgroundColor: colores.slice(0, labels.length)
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: { display: false },
              title: { display: false }
            },
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      },
      error: function() {
        alert('Error al cargar los datos.');
      }
    });
  });
});
