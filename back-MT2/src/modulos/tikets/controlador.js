const db = require("../../DB/mysql");

const TABLA = "tikets";

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
    const tiket = {
      id: body.id,
      id_cliente: body.id_cliente,
      id_tecnico: body.id_tecnico,
      fecha: body.fecha,
      hora: body.hora,
      prioridad: body.prioridad,
      id_servicio: body.id_servicio,
      id_tiposervicio: body.id_tiposervicio,
      imagen: body.imagen,
      descripcion: body.descipcion,
      estado: body.estado,
      usuariocrea: body.usuariocrea,
      fechacrea: body.fechacrea
   
    }

    const respuesta = await db.agregar(TABLA, tiket);
    
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
