// --- INICIO JQUERY + AJAX ---
$(document).ready(function() {
  $.ajax({
    url: 'http://localhost:3000/api/grafica/arbolesPorRiego',
    method: 'GET',
    dataType: 'json',
    success: function(datos) {
      const labels = datos.map(item => item.label);
      const valores = datos.map(item => item.valor);

      const colores = [
        '#388e3c', '#66bb6a', '#81c784', '#a5d6a7', '#b2dfdb', '#aed581'
      ];

      new Chart(document.getElementById('graficoP2'), {
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

      let leyendaHtml = '';
      labels.forEach((label, i) => {
        leyendaHtml += `<span><span class="color-box" style="background:${colores[i % colores.length]}"></span>${label}</span>`;
      });
      $('#leyendaRiego').html(leyendaHtml);
    },
    error: function(xhr, status, error) {
      $('#leyendaRiego').html('❌ Error al cargar los datos.');
    }
  });
});
// --- FIN JQUERY + AJAX ---