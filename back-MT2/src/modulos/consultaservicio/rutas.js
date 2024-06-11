const express=require('express');
const seguridad = require('./seguridad');
const respuesta = require('../../red/respuestas');

const controlador = require('./index');

const router = express.Router();

//router.post('/',seguridad(), consultaServicios);
router.post('/tikest/',seguridad(), tktxest);
router.post('/tikfech/',seguridad(), tktxfech);
router.post('/tikupd/',seguridad(), actesttiket);

router.post('/contraupd/',seguridad(), actcontraupd);
router.post('/servcont/',seguridad(), servscontra);
router.post('/contracli/',seguridad(), contracli);

router.post('/serv/', seguridad(), serv);
router.post('/tiposerv/', seguridad(), tiposerv);


async function tktxest (req, res, next){
    try{
    const items = await controlador.sptikets(req.body);
        respuesta.success(req, res, items, 200); 
    }catch(err){
        next(err);
    }
};
async function tktxfech (req, res, next){
    try{
    const items = await controlador.sptikets(req.body);
        respuesta.success(req, res, items, 200); 
    }catch(err){
        next(err);
    }
};

async function actesttiket (req, res, next){
    try{
    const items = await controlador.sptikets(req.body);
        respuesta.success(req, res, items, 200); 
    }catch(err){
        next(err);
    }
};

async function servscontra (req, res, next){
    try{
    const items = await controlador.spcontratos(req.body);
        respuesta.success(req, res, items, 200); 
    }catch(err){
        next(err);
    }
};

async function contracli (req, res, next){
    try{
    const items = await controlador.spcontratos(req.body);
        respuesta.success(req, res, items, 200); 
    }catch(err){
        next(err);
    }
};

async function actcontraupd (req, res, next){
    try{
    const items = await controlador.spcontratos(req.body);
        respuesta.success(req, res, items, 200); 
    }catch(err){
        next(err);
    }
};

async function serv (req, res, next){
    try{
    const items = await controlador.spmaestros(req.body);
        respuesta.success(req, res, items, 200); 
    }catch(err){
        next(err);
    }
};


async function tiposerv (req, res, next){
    try{
    const items = await controlador.spmaestros(req.body);
        respuesta.success(req, res, items, 200); 
    }catch(err){
        next(err);
    }
};

module.exports = router;