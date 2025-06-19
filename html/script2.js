// --- INICIO JQUERY + AJAX ---
$(document).ready(function () {
  $.ajax({
    url: 'https://equipo-7-servicios.onrender.com/api/grafica/arbolesPorRiego',
    method: 'GET',
    dataType: 'json',
    success: function (datos) {
      // Contar frecuencia de cada método de riego
      const conteoRiegos = {};
      datos.forEach(item => {
        const metodo = item.metodoRiego;
        conteoRiegos[metodo] = (conteoRiegos[metodo] || 0) + 1;
      });

      const labels = Object.keys(conteoRiegos);
      const valores = Object.values(conteoRiegos);

      // Calcular la moda (el método más frecuente)
      let moda = '';
      let maxFrecuencia = 0;
      for (const metodo in conteoRiegos) {
        if (conteoRiegos[metodo] > maxFrecuencia) {
          maxFrecuencia = conteoRiegos[metodo];
          moda = metodo;
        }
      }

      // Mostrar la moda en el div con id="info-riego"
      $('#info-riego').html(`🌟 La moda es: <strong>${moda}</strong> con <strong>${maxFrecuencia}</strong> apariciones.`);

      const colores = [
        '#388e3c', '#66bb6a', '#81c784', '#a5d6a7',
        '#b2dfdb', '#aed581', '#ffcc80', '#ffab91',
        '#ce93d8', '#f48fb1', '#90caf9', '#4fc3f7',
        '#9575cd', '#e57373', '#f06292', '#ba68c8',
        '#b39ddb', '#80cbc4', '#ff8a65', '#a1887f'
      ];

      // Crear gráfica tipo Pie
      new Chart(document.getElementById('graficoP2'), {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            data: valores,
            backgroundColor: colores.slice(0, labels.length),
            borderColor: 'rgba(255,255,255,0.5)',
            borderWidth: 2,
            hoverOffset: 10
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
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
    error: function (xhr, status, error) {
      $('#info-riego').html('❌ Error al cargar los datos.');
    }
  });
});
// --- FIN JQUERY + AJAX ---
