const db = require("../../DB/mysql");
const auth = require('../auth');



module.exports = function (dbInyectada) {

  let db = dbInyectada;

  if(!db){
    db=require('../../DB/mysql');
  }

  function operaciontkt(consulta) {
    return db.spOperacionestickets(consulta);
  }

  function comentariostkt(consulta) {
    return db.spComentarios(consulta);
  }

  return {
    operaciontkt,
    comentariostkt
  };
};
