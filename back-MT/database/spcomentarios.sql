DROP PROCEDURE IF EXISTS SPCOMENTARIOS; 

DELIMITER //

CREATE PROCEDURE SPCOMENTARIOS(
	OPC VARCHAR(6),
	vIDTIKET int,
	vFecha date, 
	vHora time, 
	vUsuario varchar(20), 
	vComentario text, 
	vVisible boolean,
	vIdComentario int
)
BEGIN
	
	IF OPC='SEL' THEN
		select id_tiket, visible, comentario, fecha
		from comentariostikets c 
		where c.id_tiket = vIDTIKET
		order by c.fecha desc;
	
	ELSEIF OPC='INS' then
	
		insert into comentariostikets (id_tiket, fecha, hora, usuario, comentario, visible) 
			   values( vIDTIKET, vFecha, vHora, vUsuario, vComentario, vVisible);
			  
		SELECT LAST_INSERT_ID() AS insertId;
	
	ELSEIF OPC='UPD' then
	
		update comentariostikets set comentario = vComentario
		where id = vIdComentario;
			  
	ELSE
		SELECT 'Opción no válida- SPCOMENTARIOS';
    END IF;
END //
 
 DELIMITER ;