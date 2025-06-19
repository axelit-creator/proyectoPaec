$(document).ready(function () {
  $.ajax({
    url: 'https://equipo-7-servicios.onrender.com/api/grafica/promedioArbolesMes',
    method: 'GET',
    dataType: 'json',
    success: function (datos) {
      // Formatear el mes a "Mes Año"
      const meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ];
      const labels = datos.map(item => {
        const [anio, mes] = item.mesSiembra.split("-");
        return `${meses[parseInt(mes, 10) - 1]} ${anio}`;
      });
      const valores = datos.map(item => item.cantidadPlantados);

      // Calcular el promedio
      const suma = valores.reduce((acc, val) => acc + val, 0);
      const promedio = (suma / valores.length).toFixed(2);

      // Mostrar el promedio a un lado de la gráfica
      if ($('#promedio-plantados').length === 0) {
        $('#graficoP6').after(`<div id="promedio-plantados" style="color:#388e3c; font-weight:bold; margin-top:10px; text-align:right;">Promedio mensual: ${promedio} 🌱</div>`);
      } else {
        $('#promedio-plantados').html(`Promedio mensual: ${promedio} 🌱`);
      }

      const colores = [
        '#388e3c', '#66bb6a', '#81c784', '#a5d6a7', '#b2dfdb', '#aed581'
      ];

      new Chart(document.getElementById('graficoP6'), {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Árboles plantados',
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
    error: function () {
      alert('Error al cargar los datos.');
    }
  });
});