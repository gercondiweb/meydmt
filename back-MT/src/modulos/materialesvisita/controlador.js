const db = require("../../DB/mysql");

const TABLA = "materialesvisita";

module.exports = function (dbInyectada) {

  let db = dbInyectada;

  if(!db){
    db=require('../../DB/mysql');
  }

  function consultar(consulta){
    return db.spvisitas(consulta);
  }

  function todos() {
    return db.todos(TABLA);
  }

  function uno(id) {
    return db.uno(TABLA, id);
  }

  async function agregar(body) {
    const comentario = {
      id: body.id,
      id_tiket: body.id_tiket,
      descripcion: body.descripcion, 
      cantidad: body.cantidad,
      valor_compra : body.valor_compra,
      valor_venta: body.valor_venta,
      usuariocrea: body.usuariocrea,    
      fechacrea: body.fechacrea
    }

    const respuesta = await db.agregar(TABLA, comentario);
    
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
    consultar
  };
};
