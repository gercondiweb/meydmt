const db = require("../../DB/mysql");
const auth = require('../auth');
const clientes = require("../clientes");


module.exports = function (dbInyectada) {

  let db = dbInyectada;

  if(!db){
    db=require('../../DB/mysql');
  }

  function consulta(consulta) {
    return db.spTecnicos(consulta);
  }

  function operacion(consulta){
    return db.spTecnicos(consulta);
  }

  return {
    consulta,
    operacion
  };
};
