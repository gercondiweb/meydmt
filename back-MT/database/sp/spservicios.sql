DROP PROCEDURE IF EXISTS SPSERVICIOS; 

DELIMITER //

CREATE PROCEDURE SPSERVICIOS (
    IN OPC VARCHAR(2), 
    IN ID_CLIENTE INT,
    IN FECHAINICIAL DATE ,
    IN FECHAFINAL DATE,
    IN ID_PROPIETARIO INT,
    IN ID_CONDUCTOR INT,
    IN ID_PLACA INT,
    IN ID_ZONA INT,
    IN ESTADO VARCHAR(10)
)
 BEGIN
 	-- guardamos en una variable el valor del parametro que indica el codigo de la 
    -- empresa de transporte propietaria del sistema
    DECLARE codEMP varchar(100);
    
    select valor into codEMP
    from PARAMS
    where PARAMETRO = 'CODIGOEMPPROPIETARIA';
    
 	IF OPC ='CF' THEN 
    	-- consulta servicios POR CLIENTE  en un rango de fecha
 		SELECT * 
        FROM servicios 
        WHERE 	fecha BETWEEN FECHAINICIAL and FECHAFINAL and
                ID_CLIENTE = ID_CLIENTE 
        ORDER BY FECHA DESC;
    
    ELSEIF OPC ='PF' THEN 
    	-- consulta servicios POR PROPIETARIO en un rango de fecha
 		SELECT * 
        FROM servicios 
        WHERE 	fecha BETWEEN FECHAINICIAL and FECHAFINAL and
                ID_PROPIETARIO = ID_PROPIETARIO
        ORDER BY FECHA DESC;

   ELSEIF OPC ='RF' THEN 
    	-- consulta servicios en un rango de fecha
 		SELECT * 
        FROM servicios 
        WHERE 	fecha BETWEEN FECHAINICIAL and FECHAFINAL
        ORDER BY FECHA DESC;   

    ELSEIF OPC ='PF' THEN 
    	-- consulta servicio POR PLACA en un rango de fecha
 		SELECT * 
        FROM servicios 
        WHERE 	fecha BETWEEN FECHAINICIAL and FECHAFINAL and
                ID_PLACA = ID_PLACA
        ORDER BY FECHA DESC;  

   ELSEIF OPC = 'FI' THEN 
   		-- consulta de servicio mayor a fecha inicial   
        SELECT * 
        FROM servicios 
        WHERE 	fecha >= FECHAINICIAL
        ORDER BY FECHA DESC;
        
   ELSEIF OPC='ES' THEN 
   		-- consulta de servicios por estado
        SELECT * 
        FROM servicios 
        WHERE 	estado = ESTADO
        ORDER BY FECHA DESC;

    ELSEIF OPC='SC' THEN 
   		-- consulta de servicios por CONDUCTOR
        SELECT * 
        FROM servicios 
        WHERE 	id_conductor = ID_CONDUCTOR
        ORDER BY FECHA DESC;
    ELSEIF OPC='SE' THEN
        -- servicios de un conductor agrupado por estado
        SELECT
        SUM(CASE WHEN estado = 'solicitado' THEN 1 ELSE 0 END) AS servicios_solicitado,
        SUM(CASE WHEN estado = 'cancelado' THEN 1 ELSE 0 END) AS servicios_cancelados,
        SUM(CASE WHEN estado = 'ejecutado' THEN 1 ELSE 0 END) AS servicios_ejecutados
    FROM
        servicios;
    ELSE
    	-- Opción no válida
        SELECT 'Opción no válid - SPSERVICIOS';
    END IF;
 END//
 
 DELIMITER ;

 CALL SPSERVICIOS ('EG',0,'2024-02-01','2024-02-29',0,0,0,0,'')