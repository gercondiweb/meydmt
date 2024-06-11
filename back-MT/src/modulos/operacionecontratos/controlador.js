const db = require("../../DB/mysql");
const auth = require('../auth');



module.exports = function (dbInyectada) {

  let db = dbInyectada;

  if(!db){
    db=require('../../DB/mysql');
  }

  function operacionTecCon(consulta) {
    return db.sptecnicocontrato(consulta);
  }


  return {
    operacionTecCon
  };
};
