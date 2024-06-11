const db = require("../../DB/mysql");
const auth = require('../auth');
const clientes = require("../clientes");


module.exports = function (dbInyectada) {

  let db = dbInyectada;

  if(!db){
    db=require('../../DB/mysql');
  }

  function sptikets(consulta) {
    return db.sptikets(consulta);
  }

  function spcontratos(consulta){
    return db.spcontratos(consulta);
  }  

  function spmaestros(consulta){
    return db.spmaestros(consulta);
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
    sptikets,
    spcontratos,
    spmaestros
  };
};
