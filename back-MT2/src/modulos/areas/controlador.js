const db = require("../../DB/mysql");

const TABLA = "areas";

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
    const area = {
      id: body.id,
      id_sucursal: body.id_sucursal,
      nombre: body.nombre,
      descripcion: body.descripcion,
      autorizador: body.autorizador,
      emailautorizador: body.emailautorizador,
      telefonoautorizador: body.telefonoautorizador,
      activo: body.activo,
      usuariocrea: body.usuariocrea,
      fechacrea: body.fechacrea
   
    }

    const respuesta = await db.agregar(TABLA, area);
    
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
