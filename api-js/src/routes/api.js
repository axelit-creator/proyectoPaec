const express = require('express');
const router = express.Router();
const graficaController = require('../controllers/graficaController');


router.get('/alumnosPorArbol', graficaController.alumnosPorArbol);
router.get('/cantidadPlagas', graficaController.cantidadPlagas);
router.get('/arbolesPorRiego', graficaController.arbolesPorRiego);
router.get('/cantidadArbolesTipo', graficaController.cantidadArbolesTipo);
router.get('/modaAltura', graficaController.modaAltura);
router.get('/modaTipoArbol', graficaController.modaTipoArbol);
router.get('/promedioAltura', graficaController.promedioAltura);
router.get('/promedioDiametro', graficaController.promedioDiametro);
router.get('/promedioArbolesMes', graficaController.promedioArbolesMes);
router.get('/riegoPorArbol', graficaController.riegoPorArbol);

module.exports = router;
