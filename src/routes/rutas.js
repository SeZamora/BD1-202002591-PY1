const express = require('express');
const router = express.Router();

const { modelo } = require('../controllers/crearmodelo');
const { borrarmodel } = require('../controllers/borrarmodelo');
const { crearTabtemp } = require('../controllers/cargatemp');


router.get('/crearmodelo',modelo)
router.get('/borrarmodelo',borrarmodel)
router.get('/cargartabtemp',crearTabtemp)


module.exports = router;
