const db = require("../../DB/mysql");
const bcrypt = require('bcrypt');
const auth = require('../../autenticacion');

const respuesta = require('../../red/respuestas');
const jwt = require('jsonwebtoken');
config = require('../../config');

const secret = config.jwt.secret;

const TABLA = "auth";

module.exports = function (dbInyectada) {

  let db = dbInyectada;

  if(!db){
    db=require('../../DB/mysql');
  }
  
  async function login(username, password){
    //console.log('ANTES DE EJECUTAR')
    const data = await db.query(TABLA, {usuario:username});

    //console.log('AQUI ESTA LA DATA: '+ data.password)
    return bcrypt.compare(password, data.password)
        .then(resultado =>{
          if(resultado === true){
            //generar token
           //return auth.asignarToken({...data})
           // Clonar el objeto data y eliminar el campo password antes de generar el token
           const {id } = data;

           // Generar el token usando los datos sin el campo password
           return auth.asignarToken({ id });
            
          }else{
            //generar error
            throw new Error('Informacion Invalida');
          }
        })
  }
 
  async function agregar(data) {
    
    const authData = {
      id: data.id,
    }

    if(data.usuario){
      authData.usuario = data.usuario
    }

    if(data.password){
      authData.password = await bcrypt.hash(data.password.toString(),5);
    }

    return db.agregar(TABLA, authData);
  }

  async function checkToken({headers}){
    try {
      const [,token] = headers.authorization.split(' ');
      const decodedToken = jwt.decode(token, secret);
      if(!decodedToken) throw new Error('Invalid token');

      const {id} = decodedToken;
      const data = await db.query('auth_user', {id});
    
      return respuesta.toClient('',data);
    } catch (error) {
        return respuesta.toClient('Token inválido');
    }
  }

  return {

    agregar,
    login,
    checkToken
  };
};
