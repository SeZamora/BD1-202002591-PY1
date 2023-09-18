const express = require('express');
const router = express.Router();

const { modelo } = require('../controllers/crearmodelo');
const { borrarmodel } = require('../controllers/borrarmodelo');
const { crearTabtemp } = require('../controllers/cargatemp');
const { consult1 } = require('../controllers/consultas/consulta1');
const { consult2 } = require('../controllers/consultas/consulta2');
const { consult3 } = require('../controllers/consultas/consulta3');
const { consult4 } = require('../controllers/consultas/consulta4');
const { consult5 } = require('../controllers/consultas/consulta5');
const { consult6 } = require('../controllers/consultas/consulta6');
const { consult11 } = require('../controllers/consultas/consulta11');


router.get('/crearmodelo',modelo)
router.get('/borrarmodelo',borrarmodel)
router.get('/cargartabtemp',crearTabtemp)
router.get('/consulta1',consult1)
router.get('/consulta2',consult2)
router.get('/consulta3',consult3)
router.get('/consulta4',consult4)
router.get('/consulta5',consult5)
router.get('/consulta6',consult6)
router.get('/consulta11',consult11)



module.exports = router;
