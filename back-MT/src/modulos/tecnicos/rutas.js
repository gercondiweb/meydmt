const express=require('express');
const seguridad = require('./seguridad');
const respuesta = require('../../red/respuestas');

const controlador = require('./index');

const router = express.Router();

router.post('/allTecnicos/',seguridad(), todos);
router.post('/consultaEsp/', seguridad(),consultaEspecialidad);
router.post('/consultaDocs/', seguridad(),consultaDocumentos);
router.get('/:id', uno);
router.put('/',seguridad(), eliminar);
router.post('/',seguridad(), agregar);

async function todos (req, res, next){
    try{
    const items = await controlador.todos();
        respuesta.success(req, res, items, 200); 
    }catch(err){
        next(err);
    }
};

async function consultaEspecialidad(req, res, next){
    try{
        const items = await controlador.consultaEsp(req.body);
            respuesta.success(req, res, items, 200); 
        }catch(err){
            next(err);
        }
}

async function consultaDocumentos(req, res, next){
    try{
        const items = await controlador.consultaDocs(req.body);
            respuesta.success(req, res, items, 200); 
        }catch(err){
            next(err);
        }
}

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
            mensaje = 'Item guardado con exito';
        }else{
            mensaje = 'Item actualizado con exito'
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