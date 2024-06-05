DROP PROCEDURE IF EXISTS SPMAESTROS; 

DELIMITER //

CREATE PROCEDURE SPMAESTROS(
	OPC VARCHAR(6)
)
BEGIN
	
	IF OPC='SERV' THEN
		SELECT ID as id_servicio, Descripcion
		FROM SERVICIOS S
		WHERE ACTIVO = 1;
	
	ELSEIF OPC='TSRV' THEN
		SELECT ID, TIPOSERVICIO, DESCRIPCION
		FROM TIPOSERVICIO S
		WHERE ACTIVO = 1;

   ELSEIF OPC = 'TCN' THEN
        select t.id,
	t.numerodocumento,
	concat(nombre,' ', apellidos) as 'nombre',
	t.email,
	t.telefono, 
	t.foto   
	from tecnicos t
	where activo = 1
        order by nombre;

   ELSEIF OPC='CLI' THEN
	SELECT Id, Nit, Cliente, Direccion, Email, Telefono,Activo
	FROM CLIENTES
	WHERE ACTIVO = 1
	ORDER BY CLIENTE;
	ELSE
		SELECT 'Opción no válida- SPMAESTROS';
    	END IF;
END //
 
 DELIMITER ;