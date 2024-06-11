const express=require('express');
const seguridad = require('./seguridad');
const respuesta = require('../../red/respuestas');

const controlador = require('./index');

const router = express.Router();

router.post('/',seguridad(), consultaTiketes);
router.post('/conductor/',seguridad(), consultaServConductor);
router.post('/tktxest/',seguridad(), tktagrupadosxestado);
router.post('/crear/',seguridad(), crearticket);
/*router.get('/propieta/',seguridad(), consultaServProieta);
router.get('/placa/',seguridad(), consultaServPlaca);*/

async function consultaTiketes (req, res, next){
    try{
    const items = await controlador.consulta(req.body);
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
async function consultaServConductor (req, res, next){
    try{
    const items = await controlador.consultaServConductor(req.body);
        respuesta.success(req, res, items, 200); 
    }catch(err){
        next(err);
    }
};

async function crearticket (req, res, next){
    try{
    const items = await controlador.consulta(req.body);
        respuesta.success(req, res, items, 200); 
    }catch(err){
        next(err);
    }
};


module.exports = router;