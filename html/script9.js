// --- INICIO JQUERY + AJAX ---
$(document).ready(function() {
    $.ajax({
        url: 'https://equipo-7-servicios.onrender.com/api/grafica/cantidadPlagas',
        method: 'GET',
        dataType: 'json',
        success: function(datos) {
            // Adaptación para la respuesta esperada
            const labels = ['Monitoreos con plagas'];
            const valores = [datos[0].CantidadMonitoreosConPlagas];

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
                            text: 'Cantidad de monitoreos con plagas detectadas',
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
        },
        error: function(xhr, status, error) {
            alert('Error al cargar los datos: ' + error);
        }
    });
});
// --- FIN JQUERY + AJAX ---