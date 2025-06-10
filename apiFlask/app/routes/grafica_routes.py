from flask import Blueprint
from app.controllers.grafica_controller import (
    alumnos_por_arbol,
    cantidad_plagas,
    arboles_por_riego,
    cantidad_arboles_tipo,
    moda_altura,
    moda_tipo_arbol,
    promedio_altura,
    promedio_diametro,
    promedio_arboles_mes,
    riego_por_arbol
)

grafica_bp = Blueprint('grafica', __name__)

grafica_bp.route('/alumnosPorArbol')(alumnos_por_arbol)
grafica_bp.route('/cantidadPlagas')(cantidad_plagas)
grafica_bp.route('/arbolesPorRiego')(arboles_por_riego)
grafica_bp.route('/cantidadArbolesTipo')(cantidad_arboles_tipo)
grafica_bp.route('/modaAltura')(moda_altura)
grafica_bp.route('/modaTipoArbol')(moda_tipo_arbol)
grafica_bp.route('/promedioAltura')(promedio_altura)
grafica_bp.route('/promedioDiametro')(promedio_diametro)
grafica_bp.route('/promedioArbolesMes')(promedio_arboles_mes)
grafica_bp.route('/riegoPorArbol')(riego_por_arbol)
