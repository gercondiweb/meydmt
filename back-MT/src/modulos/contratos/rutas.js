const express=require('express');
const seguridad = require('./seguridad');
const respuesta = require('../../red/respuestas');

const controlador = require('./index');

const router = express.Router();

router.post('/',seguridad(), todos);
router.get('/:id', uno);
router.put('/', eliminar);
router.post('/savecontract',seguridad(), agregar);

async function todos (req, res, next){
    try{
    const items = await controlador.todos();
        respuesta.success(req, res, items, 200); 
    }catch(err){
        next(err);
    }
};

async function uno (req, res, next){
    try{
        const items = await controlador.uno(req.params.id);
        respuesta.success(req, res, items, 200);
    }catch(err){
        next(err);
    }   
};

async function agregar (req, res, next){
    try{
        const items = await controlador.agregar(req.body);
        if(req.body.id == 0){ //si el id=0 va a crear un nuevo item
            mensaje = 'Contrato guardado con exito';
        }else{
            mensaje = 'Contrato actualizado con exito'
        }
        respuesta.success(req, res, mensaje, 201);
    }catch(err){
        next(err);
    }   
};

async function eliminar (req, res, next){
    try{
        const items = await controlador.eliminar(req.body);
        respuesta.success(req, res, 'Item eliminado satisfactoriamente', 200);
    }catch(err){
        next(err);
    }   
};
module.exports = router;