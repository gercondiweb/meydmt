const db = require("../../DB/mysql");
const auth = require('../auth');
const clientes = require("../clientes");


module.exports = function (dbInyectada) {

  let db = dbInyectada;

  if(!db){
    db=require('../../DB/mysql');
  }

  function consulta(consulta) {
    return db.spContratos(consulta);
  }

  function operacion(consulta){
    return db.spOperacionescontratos(consulta);
  }

  return {
    consulta,
    operacion
  };
};
