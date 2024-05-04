const db = require("../../DB/mysql");
const bcrypt = require('bcrypt');
const auth = require('../../autenticacion');
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
            return auth.asignarToken({...data})
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


  return {

    agregar,
    login
  };
};
