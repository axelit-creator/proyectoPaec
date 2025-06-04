const pool = require('../config/db.js');

module.exports = {
  alumnosPorArbol: (req, res) => {
    pool.query('CALL cantidadAlumnosPorTipoArbol()')
      .then(([rows]) => res.json(rows[0]))
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener alumnos por árbol' });
      });
  },

  cantidadPlagas: (req, res) => {
    pool.query('CALL cantidadMonitoreosConPlagasDetectadas()')
      .then(([rows]) => res.json(rows[0]))
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener cantidad de plagas' });
      });
  },

  arbolesPorRiego: (req, res) => {
    pool.query('CALL cantidadArbolesPorMetodoRiego()')
      .then(([rows]) => res.json(rows[0]))
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener árboles por riego' });
      });
  },

  cantidadArbolesTipo: (req, res) => {
    pool.query('CALL cantidadArbolesPorTipo()')
      .then(([rows]) => res.json(rows[0]))
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener árboles por tipo' });
      });
  },

  modaAltura: (req, res) => {
    pool.query('CALL modaAltura()')
      .then(([rows]) => res.json(rows[0]))
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener moda de altura' });
      });
  },

  modaTipoArbol: (req, res) => {
    pool.query('CALL modaTipoArboles()')
      .then(([rows]) => res.json(rows[0]))
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener moda de tipo de árboles' });
      });
  },

  promedioAltura: (req, res) => {
    pool.query('CALL promedioAltura()')
      .then(([rows]) => res.json(rows[0]))
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener promedio de altura' });
      });
  },

  promedioDiametro: (req, res) => {
    pool.query('CALL promedioDiametroPorTipo()')
      .then(([rows]) => res.json(rows[0]))
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener promedio de diámetro' });
      });
  },

  promedioArbolesMes: (req, res) => {
    pool.query('CALL promedioPlantadosPorMes()')
      .then(([rows]) => res.json(rows[0]))
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener promedio de árboles por mes' });
      });
  },

  riegoPorArbol: (req, res) => {
    pool.query('CALL cantidadRiegosPorArbol()')
      .then(([rows]) => res.json(rows[0]))
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener riegos por árbol' });
      });
  },
};
