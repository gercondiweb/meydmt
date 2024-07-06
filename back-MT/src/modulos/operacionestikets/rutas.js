const express=require('express');
const seguridad = require('./seguridad');
const respuesta = require('../../red/respuestas');

const controlador = require('./index');

const router = express.Router();

router.post('/',seguridad(), consultaTiketes);

router.post('/tktxest/',seguridad(), tktagrupadosxestado);
router.post('/creartkt/',seguridad(), crearticket);
router.post('/ticketcoments/',seguridad(), comentsticket);

async function consultaTiketes (req, res, next){
    try{
    const items = await controlador.operaciontkt(req.body);
        respuesta.success(req, res, items, 200); 
    }catch(err){
        next(err);
    } 
};

async function tktagrupadosxestado (req, res, next){
    try{
    const items = await controlador.consulta(req.body);
        respuesta.success(req, res, items, 200); 
    }catch(err){
        next(err);
    }
};

//Esta funcion crea ticket y actualiza campos de los tkt
async function crearticket (req, res, next){
    try{
    const items = await controlador.operaciontkt(req.body);
        respuesta.success(req, res, items, 200); 
    }catch(err){
        next(err);
    }
};

async function comentsticket(req, res, next){
    try{
    const items = await controlador.comentariostkt(req.body);
        respuesta.success(req, res, items, 200); 
    }catch(err){
        next(err);
    }
};

module.exports = router;  