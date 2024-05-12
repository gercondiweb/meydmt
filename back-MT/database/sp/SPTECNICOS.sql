DROP PROCEDURE IF EXISTS SPTECNICOS; 

DELIMITER //

CREATE PROCEDURE SPTECNICOS (
    OPC VARCHAR(7),
    vID INT,
    vIDTECNICO int,
    vActivo int
)
BEGIN
    IF OPC = 'UPD-EST' THEN

        UPDATE tecnicosespecialidad SET
        ACTIVO = vActivo
        WHERE ID = vID;

    ELSEIF OPC = 'SLC-TCN' THEN

        SELECT TE.*, 
	     E.Nombre, 
	     E.Descripcion 
        FROM TECNICOSESPECIALIDAD TE
        INNER JOIN ESPECIALIDADES E ON TE.ID_ESPECIALIDAD = E.ID 
        WHERE TE.ID_TECNICO = vIDTECNICO AND 
              TE.ACTIVO = 1

    ELSEIF OPC = 'SLC-DOC' THEN
        SELECT TE.*, 
	     D.Nombre, 
	     D.Descripcion 
        FROM DOCUMENTOSTECNICO DT
        INNER JOIN DOCUMENTOS D ON DT.ID_DOCUMENTO = D.ID 
        WHERE TE.ID_TECNICO = vIDTECNICO AND 
              TE.ACTIVO = 1
    ELSE
        SELECT 'Opción no válida-SPTECNICOS';
    END IF;
END//
 
 DELIMITER ;