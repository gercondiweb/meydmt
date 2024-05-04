const db = require("../../DB/mysql");
const auth = require('../auth');
const clientes = require("../clientes");


module.exports = function (dbInyectada) {

  let db = dbInyectada;

  if(!db){
    db=require('../../DB/mysql');
  }

  function consulta(consulta) {
    return db.sptikets(consulta);
  }

  function operacion(consulta){
    return db.spoperacionestickets(consulta);
  }

  function consultaServConductor(consulta){
    return db.spserviciosconductor(consulta);
  }
  
  function cantserviciosxestado(consulta){
    return db.sptikets(consulta);
  }
  

  /*TODO: Hacer las consultas Query para consultar:
          servicios x fecha -OK
          servicios x placas 
          servicios x clientes
          servicios x Propietario
          servicios x conductor
          servicios x zona
          servicios x jornada
          etc
  */

  return {
    consulta,
    consultaServConductor,
    cantserviciosxestado,
    operacion
  };
};
