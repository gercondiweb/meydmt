DROP PROCEDURE IF EXISTS SPTIKETS; 

DELIMITER //

CREATE PROCEDURE SPTIKETS (
    OPC VARCHAR(7),
    vID INT,
    vESTADO int,
    vActivo int
)
BEGIN
    IF OPC = 'UPD-EST' THEN

        UPDATE TIKETS SET
        ESTADO = vESTADO
        WHERE ID = vID;
    ELSEIF OPC='ACT-TKT' THEN
    
        UPDATE TIKETS SET
        ACTIVO = vActivo;

    ELSEIF OPC = 'ALL-TKT' THEN

        SELECT T.id,
    id_cliente,
    c.CLIENTE,
    id_tecnico,
    TE.nombre,
    id_tiposervicio,
    TS.TIPOSERVICIO,
    fecha,
    hora,
    id_servicio,
   S.DESCRIPCION,
    imagen,
    t.descripcion as 'DetalleTKT',
    estado,
    t.usuariocrea,
    t.fechacrea,
    prioridad
FROM TIKETS T
LEFT JOIN CLIENTES C ON T.ID_CLIENTE = C.ID
LEFT JOIN TECNICOS TE ON T.ID_TECNICO = TE.ID
LEFT JOIN TIPOSERVICIO TS ON T.ID_TIPOSERVICIO = TS.ID
LEFT JOIN SERVICIOS S ON T.ID_SERVICIO = S.ID
order by t.fecha desc, t.hora desc;
    
    ELSEIF OPC = 'SLC-ID' THEN

        SELECT C.ID AS IDCONTRATO, SC.fechainicio, SC.fechafin, SC.activo, SC.ans, SC.vhh, SV.* 
        FROM CONTRATOS C
        INNER JOIN servicioscontrato SC ON C.id = SC.id_contrato
        LEFT JOIN servicios SV ON SC.id_servicio = SV.id
        WHERE C.ID = vID
        ORDER BY C.ID;

    ELSEIF OPC = 'SRV-CLI' THEN
        SELECT C.ID AS IDCONTRATO, SC.fechainicio, SC.fechafin, SC.activo, SC.ans, SC.vhh, SV.* 
        FROM CONTRATOS C
        INNER JOIN servicioscontrato SC ON C.id = SC.id_contrato
        LEFT JOIN servicios SV ON SC.id_servicio = SV.id
        WHERE C.ID_CLIENTE = vIDCLIENTE
        ORDER BY C.ID;
	
    ELSEIF OPC = 'CNT-TKT' THEN
        SELECT
            SUM(CASE WHEN estado = 'SOL' THEN 1 ELSE 0 END) AS servicios_solicitados,
            SUM(CASE WHEN estado = 'CAN' THEN 1 ELSE 0 END) AS servicios_cancelados,
            SUM(CASE WHEN estado = 'EJE' THEN 1 ELSE 0 END) AS servicios_ejecutados,
            SUM(CASE WHEN estado = 'ASG' THEN 1 ELSE 0 END) AS servicios_asignados,
            SUM(CASE WHEN estado = 'INI' THEN 1 ELSE 0 END) AS servicios_iniciados
        FROM
            tikets;
    ELSE
        SELECT 'Opción no válida-SPCONTRATOS';
    END IF;
END//
 
 DELIMITER ;