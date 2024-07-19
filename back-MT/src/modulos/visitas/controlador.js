const db = require("../../DB/mysql");

const TABLA = "visitastiket";

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
    const visita = {
      id: body.id,
      id_tiket: body.id_tiket,
      id_tipovisita: body.id_tipovisita,
      fechainicio: body.fechainicio,
      horainicio: body.horainicio,
      fechafin: body.fechafin,
      horafin: body.horafin,
      imagen1 : body.imagen1,
      imagen2 : body.imagen2,
      imagen3 : body.imagen3,
      observaciones : body.observaciones,
      firma:body.firma,
      usuariocrea: body.usuariocrea,
      fechacrea: body.fechacrea
   
    }

    const respuesta = await db.agregar(TABLA, visita);
    
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
