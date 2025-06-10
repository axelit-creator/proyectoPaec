from flask import Blueprint, jsonify

from app.config.db import get_db_connection

grafica_bp = Blueprint('grafica_bp', __name__)

def ejecutar_procedimiento(nombre):
    conn = get_db_connection()
    if not conn:
        return jsonify({'error': 'No se pudo conectar a la base de datos'}), 500
    try:
        cursor = conn.cursor(dictionary=True)
        cursor.callproc(nombre)
        resultados = []
        for result in cursor.stored_results():
            resultados = result.fetchall()
        cursor.close()
        conn.close()
        return jsonify(resultados)
    except Exception as e:
        print("Error en la consulta:", e)
        return jsonify({'error': 'Error en la consulta'}), 500

def alumnos_por_arbol():
    return ejecutar_procedimiento('cantidadAlumnosPorTipoArbol')

def cantidad_plagas():
    return ejecutar_procedimiento('cantidadMonitoreosConPlagasDetectadas')

def arboles_por_riego():
    return ejecutar_procedimiento('cantidadArbolesPorMetodoRiego')

def cantidad_arboles_tipo():
    return ejecutar_procedimiento('cantidadArbolesPorTipo')

def moda_altura():
    return ejecutar_procedimiento('modaAltura')

def moda_tipo_arbol():
    return ejecutar_procedimiento('modaTipoArboles')

def promedio_altura():
    return ejecutar_procedimiento('promedioAltura')

def promedio_diametro():
    return ejecutar_procedimiento('promedioDiametroPorTipo')

def promedio_arboles_mes():
    return ejecutar_procedimiento('promedioPlantadosPorMes')

def riego_por_arbol():
    return ejecutar_procedimiento('cantidadRiegosPorArbol')
