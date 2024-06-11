const db = require("../../DB/mysql");
const auth = require('../auth');
const clientes = require("../clientes");


const TABLA = "servicios";

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
    const servicio = {
      id: body.id,
      fecha: body.fecha,
      hora: body.hora,
      id_tiposervicio: body.id_tiposervicio,
      id_placa: body.id_placa,
      id_conductor: body.id_conductor,
      id_cliente:body.id_cliente,
      origen: body.origen,
      destino: body.destino,
      usuarios:body.usuarios,
      id_zona:body.id_zona,
      estado:body.estado,
      valor:body.valor,
      costo:body.costo,
      distancia:body.distancia,
      duracion:body.duracion,
      pesoinicial:body.pesoinicial,
      pesofinal:body.pesofinal,
      observaciones:body.observaciones
    }
    
    const respuesta = await db.agregar(TABLA, servicio);
    
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

  /*TODO: Hacer las consultas Query para consultar:
          servicios x fecha
          servicios x placas
          servicios x clientes
          servicios x Propietario
          servicios x conductor
          servicios x zona
          servicios x jornada
          etc
  */

  return {
    todos,
    uno,
    agregar,
    eliminar,
  };
};
