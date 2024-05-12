const mysql= require('mysql');
const config=require('../config');

const dbconfig ={
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

let conexcion;

function conexionMysql(){
    conexcion = mysql.createConnection(dbconfig);
    conexcion.connect((err)=>{
        if(err){
            console.log('[db_err]', err);
            setTimeout(conexionMysql, 200);
        }else{
            console.log('DB Conectada!!')
        }
    });

    conexcion.on('error', er =>{
        console.log('[error_db]', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST' ){
            conexionMysql();
        }else{
            throw err;
        }
    })
}

conexionMysql();


function spservicios(parametros){
    const {opc, id_cliente, fechainicial, fechafinal, id_propietario, id_conductor, id_placa, id_zona, estado} = parametros;
    return new Promise((resolve, reject)=>{
        conexcion.query(`CALL SPSERVICIOS (?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                    [opc, id_cliente, fechainicial, fechafinal, id_propietario, id_conductor, id_placa, id_zona, estado] ,
                    (error, result)=>{
            if(error) return reject(error);
            resolve(result);
        })
    });
}

function spmaestros(parametros){
    const {opc} = parametros;
    return new Promise((resolve, reject)=>{
        conexcion.query(`CALL SPMAESTROS (?)`, 
                    [opc] ,
                    (error, result)=>{
            if(error) return reject(error);
            resolve(result);
        })
    });
}

function spContratos(parametros){
    const {opc, vID, vIDCLIENTE, vActivo, vFechaini, vFechafin} = parametros;
    return new Promise((resolve, reject)=>{
        conexcion.query(`CALL SPCONTRATOS (?, ?, ?, ?,?,?)`, 
                    [opc, vID, vIDCLIENTE, vActivo, vFechaini, vFechafin] ,
                    (error, result)=>{
            if(error) return reject(error);
            resolve(result);
        })
    });
}

function spOperacionescontratos(parametros){
    const {opc, vID, vIDCLIENTE, vActivo, vFechaini, vFechafin} = parametros;
    return new Promise((resolve, reject)=>{
        conexcion.query(`CALL SPCONTRATOS (?, ?, ?, ?,?,?)`, 
                    [opc, vID, vIDCLIENTE, vActivo, vFechaini, vFechafin] ,
                    (error, result)=>{
            if(error) return reject(error);
            resolve(result);
        })
    });
}

function sptikets(parametros){
    const {opc, id_tkt, estado, activo, fechainicial, fechafinal} = parametros;
    return new Promise((resolve, reject)=>{
        conexcion.query(`CALL SPTIKETS (?, ?, ?, ?,?,?)`, 
                    [opc, id_tkt, estado, activo, fechainicial, fechafinal] ,
                    (error, result)=>{
            if(error) return reject(error);
            resolve(result);
        })
    });
}

function spTecnicos(parametros){
    const {opc, vID, vIDTECNICO, vActivo} = parametros;
    return new Promise((resolve, reject)=>{
        conexcion.query(`CALL SPTECNICOS (?, ?, ?, ?)`, 
                    [opc, vID, vIDTECNICO, vActivo] ,
                    (error, result)=>{
            if(error) return reject(error);
            resolve(result);
        })
    });
}

function spOperacionestickets(parametros){
    const {opc, id_tkt, fecha, hora, id_servicio, id_cliente, descripcion, estado, prioridad, id_tiposervicio, id_tecnico} = parametros;
    return new Promise((resolve, reject)=>{
        conexcion.query(`CALL OPERACIONES_TICKETS (?, ?, ?, ?,?,?,?,?,?,?,?)`, 
                    [opc, id_tkt, fecha, hora, id_servicio, id_cliente, descripcion, estado, prioridad, id_tiposervicio, id_tecnico] ,
                    (error, result)=>{
            if(error) return reject(error);
            resolve(result);
        })
    });
}

function query(tabla, consulta){
    return new Promise((resolve, reject)=>{
        conexcion.query(`SELECT * FROM ${tabla} where ?`, consulta ,(error, result)=>{
            return error ? reject(error):resolve(result[0]);
        })
    });
}

function agregar(tabla, data){
    return new Promise((resolve, reject)=>{
        conexcion.query(`INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?`, [data, data] ,(error, result)=>{
            return error ? reject(error): resolve(result);
        })
    });
}

module.exports = {
    spservicios,
    
    sptikets,
    spOperacionestickets,
    
    spmaestros,
    spTecnicos,
    
    spContratos,
    spOperacionescontratos,
    query,
    agregar
}