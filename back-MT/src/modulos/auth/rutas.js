const express=require('express');

const respuesta = require('../../red/respuestas');
const controlador = require('./index');

const router = express.Router();

//router.get('/login', login);
router.post('/login', login);
router.get('/check', checkToken);

async function login (req, res, next){
    console.log(req.body)
        const response = await controlador.login(req.body.usuario, req.body.password);
        const status = response.message ? 401 : 200;
        respuesta.success(req, res,response,status)
        next();
};


async function checkToken (req,res, next) {
    try {
       const response = await controlador.checkToken(req,res,next);
       if(response.message) respuesta.error(req, res,{body: response},401)
       else respuesta.success(req, res,response,200)
        
        next();
    } catch (error) {
      respuesta.error(req, res,{ message: error },401)
    }
}

module.exports = router;