const express=require('express');
const seguridad = require('./seguridad');
const respuesta = require('../../red/respuestas');

const controlador = require('./index');

const router = express.Router();

router.post('/addTecCont/',seguridad(), addTecnicoContrato);
router.post('/updateTecCont/',seguridad(), addTecnicoContrato);

async function addTecnicoContrato (req, res, next){
    try{
    const items = await controlador.operacionTecCon(req.body);
        respuesta.success(req, res, items, 200); 
    }catch(err){
        next(err);
    }
};

module.exports = router;  