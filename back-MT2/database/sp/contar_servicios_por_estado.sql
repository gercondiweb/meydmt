DROP PROCEDURE IF EXISTS contar_servicios_por_estado;
DELIMITER //
CREATE PROCEDURE contar_servicios_por_estado(
    IN OPC VARCHAR(2), 
    IN IDCLIENTE INT, 
    IN FECHAINI DATE, 
    IN FECHAFIN DATE
    )
BEGIN
    IF OPC = 'SC' THEN
        SELECT
            SUM(CASE WHEN estado = 'solicitado' THEN 1 ELSE 0 END) AS servicios_solicitado,
            SUM(CASE WHEN estado = 'cancelado' THEN 1 ELSE 0 END) AS servicios_cancelados,
            SUM(CASE WHEN estado = 'ejecutado' THEN 1 ELSE 0 END) AS servicios_ejecutados
        FROM
            servicios
        WHERE ID_CLIENTE = IDCLIENTE AND
                FECHA BETWEEN FECHAINI AND FECHAFIN;
    ELSE
        SELECT ('OPCION NO VALIDA - Contar servivios por estado');
    END IF;
END//
 
 DELIMITER ;
