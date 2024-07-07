const express=require('express');
const seguridad = require('./seguridad');
const respuesta = require('../../red/respuestas');

const controlador = require('./index');

const router = express.Router();

//router.post('/',seguridad(), consultaServicios);
router.post('/consult/',seguridad(), consulta);


async function consulta (req, res, next){
    try{
    const items = await controlador.consultadb(req.body.tabla,req.body.consulta);
        respuesta.success(req, res, items, 200); 
    }catch(err){
        next(err);
    }
};

module.exports = router;