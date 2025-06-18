// --- INICIO JQUERY + AJAX ---
$(document).ready(function() {
  $.ajax({
    url: 'https://equipo-7-servicios.onrender.com/api/grafica/modaTipoArbol',
    method: 'GET',
    dataType: 'json',
    success: function(datos) {
      // datos = [{label: "Roble", valor: 3}, ...]
      const labels = datos.map(item => item.label);
      const data = datos.map(item => item.valor);

      // Calcular la moda
      const maxFrecuencia = Math.max(...data);
      const modas = labels.filter((label, idx) => data[idx] === maxFrecuencia);

      $('#respuestaModa').html(
        `✨ La moda es: <strong>${modas.join(', ')}</strong> con ${maxFrecuencia} apariciones. 🌟`
      );

      const colores = [
        'var(--verde-claro)',
        'var(--verde-suave)',
        'var(--verde-intermedio)',
        'var(--verde-oscuro)',
        'var(--verde-profundo)'
      ];

      const ctx = document.getElementById('graficoArboles').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: '📊 Frecuencia',
            data: data,
            backgroundColor: colores.slice(70, labels.length),
            borderColor: 'var(--verde-oscuro)',
            borderWidth: 1,
            borderRadius: 8
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: '📈 Moda de los tipos de árboles',
              font: { size: 18 }
            },
            legend: { display: false }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { stepSize: 1 }
            }
          }
        }
      });
    },
    error: function(xhr, status, error) {
      $('#respuestaModa').html('❌ Error al cargar los datos de la moda.');
    }
  });
});
// --- FIN JQUERY + AJAX ---