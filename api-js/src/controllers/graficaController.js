const pool = require('../config/db.js');

const procedimientosPermitidos = [
  'cantidadAlumnosPorTipoArbol',
  'cantidadMonitoreosConPlagasDetectadas',
  'cantidadArbolesPorMetodoRiego',
  'cantidadArbolesPorTipo',
  'modaAltura',
  'modaTipoArboles',
  'promedioAltura',
  'promedioDiametroPorTipo',
  'promedioPlantadosPorMes',
  'cantidadRiegosPorArbol'
];

const obtenerDatos = (procedure, res) => {
  if (!procedimientosPermitidos.includes(procedure)) {
    return res.status(400).json({ error: 'Procedimiento no permitido' });
  }
  pool.query(`CALL ${procedure}()`)
    .then(([rows]) => {
      res.json(rows[0] || rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error en la consulta' });
    });
};

module.exports = {
  alumnosPorArbol: (req, res) => obtenerDatos('cantidadAlumnosPorTipoArbol', res),
  cantidadPlagas: (req, res) => obtenerDatos('cantidadMonitoreosConPlagasDetectadas', res),
  arbolesPorRiego: (req, res) => obtenerDatos('cantidadArbolesPorMetodoRiego', res),
  cantidadArbolesTipo: (req, res) => obtenerDatos('cantidadArbolesPorTipo', res),
  modaAltura: (req, res) => obtenerDatos('modaAltura', res),
  modaTipoArbol: (req, res) => obtenerDatos('modaTipoArboles', res),
  promedioAltura: (req, res) => obtenerDatos('promedioAltura', res),
  promedioDiametro: (req, res) => obtenerDatos('promedioDiametroPorTipo', res),
  promedioArbolesMes: (req, res) => obtenerDatos('promedioPlantadosPorMes', res),
  riegoPorArbol: (req, res) => obtenerDatos('cantidadRiegosPorArbol', res)
};
