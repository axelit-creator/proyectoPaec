// --- INICIO AJAX ---
document.addEventListener('DOMContentLoaded', async () => {
    // Cambia la URL por la de tu API real
    const respuesta = await fetch('http://localhost:3000/api/cantidadPlagas');
    const datos = await respuesta.json();
    // Supón que datos = [{label: "Enero", valor: 5}, ...]
    const labels = datos.map(item => item.label);
    const valores = datos.map(item => item.valor);

    const ctx = document.getElementById('grafico').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Plagas detectadas',
                data: valores,
                backgroundColor: 'rgba(165, 214, 167, 0.7)',
                borderColor: '#3a5a40',
                borderWidth: 1,
                borderRadius: 8,
                barThickness: 40
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: '#3a5a40',
                        font: { size: 14 }
                    }
                },
                title: {
                    display: true,
                    text: 'Cantidad de monitoreos por mes',
                    color: '#3a5a40',
                    font: { size: 18 }
                }
            },
            scales: {
                x: {
                    ticks: { color: '#3a5a40' },
                    grid: { color: '#f0f0e0' }
                },
                y: {
                    ticks: { color: '#3a5a40' },
                    grid: { color: '#f0f0e0' }
                }
            }
        }
    });
});
// --- FIN AJAX ---