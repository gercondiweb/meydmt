const db = require("../../DB/mysql");

const TABLA = "tecnicosespecialidad";

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
    const espcTecnico = {
      id: body.id,
      id_tecnico: body.id_tecnico,
      id_especialidad: body.id_especialidad,
      fechaemision: body.fechaemision,
      fechavencimiento: body.fechavencimiento,
      observaciones: body.observaciones,
      activo: body.activo,
    }

    const respuesta = await db.agregar(TABLA, espcTecnico);
    
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
