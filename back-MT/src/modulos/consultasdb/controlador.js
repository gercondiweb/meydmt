const db = require("../../DB/mysql");
const auth = require('../auth');
const clientes = require("../clientes");


module.exports = function (dbInyectada) {

  let db = dbInyectada;

  if(!db){
    db=require('../../DB/mysql');
  }

  async function consultadb(tabla, id) {
 
    const data = await db.query(tabla, {id:id});
    if(!data) return {message : 'La consulta no devuelve resultados'};
  }

  return {
    consultadb
  };
};
