DROP PROCEDURE IF EXISTS SPCONTRATOS; 

DELIMITER //

CREATE PROCEDURE SPCONTRATOS (
    OPC VARCHAR(7),
    vID INT,
    vIDCLIENTE int,
    vActivo int
)
BEGIN
    IF OPC = 'UPD-EST' THEN

        UPDATE CONTRATOS SET
        ACTIVO = vActivo
        WHERE ID = vID;

    ELSEIF OPC = 'ALL-CON' THEN
	SELECT C.ID AS CONTRATO, 
		C.FECHAINICIO,
		CL.CLIENTE,
		CL.NIT,
		C.FECHAFIN,
		C.RESPONSABLE,
		C.CLAUSULAS,
		C.OBSERVACIONES
	
	FROM CONTRATOS C
        	INNER JOIN CLIENTES CL ON C.id_cliente = CL.id
	WHERE C.ACTIVO=1
	ORDER BY C.ID;
	
    ELSEIF OPC = 'SLC-SRV' THEN

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
    ELSE
        SELECT 'Opción no válida-SPCONTRATOS';
    END IF;
END//
 
 DELIMITER ;