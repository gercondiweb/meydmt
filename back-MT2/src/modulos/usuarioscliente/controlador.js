const db = require("../../DB/mysql");
const auth = require('../auth');

const TABLA = "usuarioscliente";

module.exports = function (dbInyectada) {

  let db = dbInyectada;

  if(!db){
    db=require('../../DB/mysql');
  }

  function todos() {
    return db.todos(TABLA);
  }

  function uno(id) {
    return db.uno(TABLA, id);
  }
  
  async function agregar(body) {
    const usuariocliente = {
      id: body.id,
      id_usuario: body.id_usuario,
      id_cliente: body.id_cliente
    }

    const respuesta = await db.agregar(TABLA, usuariocliente);
    
    var insertId = 0;
    
    if(body.id == 0){
      insertId = respuesta.insertId;
    }else{
      insertId = body.id;
    }
    
    return respuesta;
  }
  
  function eliminar(body) {
    return db.eliminar(TABLA, body);
  }
  return {
    todos,
    uno,
    agregar,
    eliminar,
  };
};
