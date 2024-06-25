const express=require('express');

const respuesta = require('../../red/respuestas');
const controlador = require('./index');

const router = express.Router();

//router.get('/login', login);
router.post('/login', login);
router.get('/check', checkToken);

async function login (req, res, next){
    try{
        const token = await controlador.login(req.body.usuario, req.body.password);
        respuesta.success(req, res, token, 200);
    }catch(err){
        next(err);
    }   
};


async function checkToken (req,res, next) {
    try {
       const response = await controlador.checkToken(req,res,next);
       console.log({response})
        respuesta.success(req, res,response,200)
        next();
    } catch (error) {
        const response = new Response(error);
        console.log({error})
      respuesta.error(req, res,response,401)
    }
}

module.exports = router;