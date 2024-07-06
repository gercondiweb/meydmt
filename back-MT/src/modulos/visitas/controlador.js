const db = require("../../DB/mysql");

const TABLA = "visitastikets";

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
    const cliente = {
      id: body.id,
      nit: body.nit,
      cliente: body.cliente,
      direccion: body.direccion,
      email: body.email,
      telefono: body.telefono,
      activo: body.activo,
      usuariocrea: body.usuariocrea,
      fechacrea: body.fechacrea
   
    }

    const respuesta = await db.agregar(TABLA, cliente);
    
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
