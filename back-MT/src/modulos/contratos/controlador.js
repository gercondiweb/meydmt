const db = require("../../DB/mysql");

const TABLA = "contratos";

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
    const contrato = {
      id: body.id,
      id_cliente: body.id_cliente,
      fechainicio: body.fechainicio,
      fechafin: body.fechafin,
      responsable: body.responsable,
      telefono: body.telefono,
      clausulas: body.clausulas,
      observaciones: body.observaciones,
      activo: body.activo,
      usuariocrea: body.usuariocrea,
      fechacrea: body.fechacrea,
      fechaactualiza: body.fechaactualiza,
      usuarioactualiza: body.usuarioactualiza,
      tope: body.tope,
      valtope: body.valtope
   
    }

    const respuesta = await db.agregar(TABLA, contrato);
    
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
