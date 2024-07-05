const db = require("../../DB/mysql");

module.exports = function (dbInyectada) {

  let db = dbInyectada;

  if(!db){
    db=require('../../DB/mysql');
  }

  function consulta(consulta) {
    return db.spClientes(consulta);
  }

  function operacion(consulta){
    return db.spOperacionesclientes(consulta);
  }

  return {
    consulta,
    operacion
  };
};
