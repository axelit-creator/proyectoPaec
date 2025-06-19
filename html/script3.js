$(document).ready(function () {
  $.ajax({
    url: 'https://equipo-7-servicios.onrender.com/api/grafica/modaTipoArbol',
    method: 'GET',
    dataType: 'json',
    success: function (datos) {
      const labels = datos.map(item => item.nombreTipo);
      const valores = datos.map(item => item.cantidad);

      // Calcular la moda
      const maxFrecuencia = Math.max(...valores);
      const modas = labels.filter((label, idx) => valores[idx] === maxFrecuencia);

      $('#respuestaModa').html(
        `✨ La moda es: <strong>${modas.join(', ')}</strong> con ${maxFrecuencia} apariciones. 🌟`
      );

      const colores = [
        '#388e3c', '#66bb6a', '#81c784', '#a5d6a7', '#b2dfdb', '#aed581',
        '#fbc02d', '#ffb300', '#ff7043', '#8d6e63', '#789262', '#4dd0e1',
        '#9575cd', '#f06292', '#ba68c8', '#e57373', '#ffd54f', '#dce775'
      ];

      new Chart(document.getElementById('graficoP3'), {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            data: valores,
            backgroundColor: colores.slice(0, labels.length)
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'bottom' },
            title: { display: false }
          }
        }
      });
    },
    error: function () {
      $('#respuestaModa').html('❌ Error al cargar los datos de la moda.');
    }
  });
});
