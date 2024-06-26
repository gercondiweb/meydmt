const db = require("../../DB/mysql");

const TABLA = "servicioscontrato";

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
    const servcont = {
      id: body.id,
      id_contrato: body.id_contrato,
      id_servicio: body.id_servicio,
      fechainicio: body.fechainicio,
      fechafin: body.fechafin,
      ans: body.ans,
      vhh: body.vhh,
      activo: body.activo,
      usuariocrea: body.usuariocrea,
      fechacrea: body.fechacrea
   
    }

    const respuesta = await db.agregar(TABLA, servcont);
    
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
