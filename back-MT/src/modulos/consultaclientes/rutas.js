const express=require('express');
const seguridad = require('./seguridad');
const respuesta = require('../../red/respuestas');

const controlador = require('./index');
const consultacontratos = require('./index');

const router = express.Router();

router.post('/',seguridad(), consultaClientes);
router.post('/opecliente/',seguridad(), operacionContrato);


async function consultaClientes (req, res, next){
    try{
    const items = await controlador.consulta(req.body);
        respuesta.success(req, res, items, 200); 
    }catch(err){
        next(err);
    }
};

async function operacionContrato (req, res, next){
    try{
    const items = await controlador.operacion(req.body);
        respuesta.success(req, res, items, 200); 
    }catch(err){
        next(err);
    }
};



module.exports = router;