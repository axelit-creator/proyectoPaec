// --- INICIO AJAX ---
async function cargarDatosYGraficar() {
  try {
    // Usa el endpoint correcto según tu backend
    const respuesta = await fetch('https://equipo-7-servicios.onrender.com/api/grafica/promedioArbolesMes');
    const datos = await respuesta.json();
    // Ejemplo esperado: [{ label: "Enero", valor: 80 }, ...]

    const labels = datos.map(item => item.label);
    const valores = datos.map(item => item.valor);

    const ctx6 = document.getElementById('grafico6').getContext('2d');
    new Chart(ctx6, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Promedio mensual 🌿',
          data: valores,
          backgroundColor: ['#388e3c', '#66bb6a', '#81c784', '#a5d6a7'],
          borderColor: '#ffffff',
          borderWidth: 1,
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: '#388e3c',
              font: { size: 14 }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: '#388e3c' },
            grid: { color: '#e0e0e0' }
          },
          x: {
            ticks: { color: '#388e3c' },
            grid: { color: '#f0f0f0' }
          }
        }
      }
    });
  } catch (error) {
    console.error("Error al cargar los datos:", error);
  }
}

document.addEventListener('DOMContentLoaded', cargarDatosYGraficar);
// --- FIN AJAX ---