// --- INICIO JQUERY + AJAX ---
$(document).ready(function() {
  $.ajax({
    url: 'https://equipo-7-servicios.onrender.com/api/grafica/arbolesPorRiego',
    method: 'GET',
    dataType: 'json',
    success: function(datos) {
      const labels = datos.map(item => item.label);
      const valores = datos.map(item => item.valor);

      const colores = [
        '#388e3c', '#66bb6a', '#81c784', '#a5d6a7', '#b2dfdb', '#aed581'
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
            legend: {
              position: 'bottom',
              labels: {
                color: '#ffffff',
                font: {
                  size: 14,
                  family: 'Poppins'
                },
                padding: 15,
                boxWidth: 20
              }
            },
            title: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: ctx => `${ctx.label}: ${ctx.parsed} árboles`
              }
            }
          }
        }
      });

      // Generar leyenda personalizada debajo del gráfico
      let leyendaHtml = '';
      labels.forEach((label, i) => {
        leyendaHtml += `
          <span style="
            display: inline-flex;
            align-items: center;
            margin-right: 15px;
            margin-top: 10px;
            font-family: 'Poppins', sans-serif;
            font-size: 14px;
            color: #ffffff;
          ">
            <span style="
              display: inline-block;
              width: 14px;
              height: 14px;
              margin-right: 8px;
              border-radius: 3px;
              background: ${colores[i % colores.length]};
              box-shadow: 0 0 4px rgba(0,0,0,0.2);
            "></span>
            ${label}
          </span>
        `;
      });

      $('#leyendaRiego').html(leyendaHtml);
    },
    error: function(xhr, status, error) {
      $('#leyendaRiego').html('❌ Error al cargar los datos.');
    }
  });
});
// --- FIN JQUERY + AJAX ---
