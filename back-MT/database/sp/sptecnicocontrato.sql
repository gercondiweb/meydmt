DROP PROCEDURE IF EXISTS SPTECNICOCONTRATO; 

DELIMITER //

CREATE PROCEDURE SPTECNICOCONTRATO (
    OPC VARCHAR(3),
    vID INT,
    vIDCONTRATO int,
    vIDTECNICO int,
    vActivo int
)
BEGIN
    if OPC = 'ADD' then
        insert into tecnicoscontrato (id_contrato, id_tecnico, activo) 
        values (vIDCONTRATO, vIDTECNICO, 1);

    elseif OPC = 'UPD' then
        update tecnicoscontrato set activo = vActivo
        where id = vID;  
        
    elseif OPC = 'DEL' then
        delete from tecnicoscontrato where id = vID;
    else 
      SELECT 'Opción no válida - SPTECNICOCONTRATO';
    end if;

END//
 
 DELIMITER ;