const db = require("../../DB/mysql");

const TABLA = "tecnicos";

module.exports = function (dbInyectada) {

  let db = dbInyectada;

  if(!db){
    db=require('../../DB/mysql');
  }

  function consultaEsp(consulta){
    return db.spTecnicos(consulta);

  }

  function consultaDocs(consulta){
    return db.spTecnicos(consulta);
  }

  function todos() {
    return db.todos(TABLA);
  }

  function uno(id) {
    return db.uno(TABLA, id);
  }

  async function agregar(body) {
    const tecnico = {
      id: body.id,
      numerodocumento: body.numerodocumento,
      nombre: body.nombre,
      apellidos: body.apellidos,
      numid: body.numid,
      direccion: body.direccion,
      email: body.email,
      telefono: body.telefono,
      tiposangre: body.tiposangre,
      foto:body.foto,
      activo: body.activo
   
    }

    const respuesta = await db.agregar(TABLA, tecnico);
    
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
  return {
    todos,
    uno,
    agregar,
    eliminar,
    consultaEsp
  };
};
