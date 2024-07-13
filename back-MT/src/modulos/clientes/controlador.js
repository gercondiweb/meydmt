const db = require("../../DB/mysql");

const TABLA = "clientes";

module.exports = function (dbInyectada) {

  let db = dbInyectada;

  if(!db) db = require('../../DB/mysql');

  function todos() {
    return db.todos(TABLA);
  }

  function uno(id) {
    return db.uno(TABLA, id);
  }

  async function agregar(body) {

    const cliente = {
      id: body.id,
      nit: body.nit,
      cliente: body.cliente,
      direccion: body.direccion,
      email: body.email,
      telefono: body.telefono,
      activo: body.activo,
      usuariocrea: body.usuariocrea,
      fechacrea: body.fechacrea
   
    }

    const clienteNew = await db.agregar(TABLA, cliente);
    return clienteNew;
  }
  
  function eliminar(body) {
    return db.eliminar(TABLA, body);
  }
  return {
    todos,
    uno,
    agregar,
    eliminar,
  };
};
