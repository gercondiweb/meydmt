const express=require('express');
const seguridad = require('./seguridad');
const respuesta = require('../../red/respuestas');

const controlador = require('./index');

const router = express.Router();

//router.post('/',seguridad(), todos);
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
        const camposRequired = [ 'id_tiket','comentario'];
        let camposFalatantes = [];
        const { body } = req;
        camposRequired.forEach( v => {
          if ( !body[v] ) camposFalatantes.push(v);
        } );

        if( camposFalatantes.length ) respuesta.error(req, res, {} , 402, `Faltan los campos ${ camposFalatantes.join(',') }`);
        const comentario = await controlador.agregar(req.body);
        const accion = (body.id == 0)? 'guardado' : 'actualizado';
        let message = `Item ${accion} con exito`;
        respuesta.success(req, res, comentario , 201, message);
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