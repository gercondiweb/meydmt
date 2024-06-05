create table params(
    id int primary key AUTO_INCREMENT,
    parametro varchar(20) not null,
    valor varchar(100) not null,
    descripcion varchar(100),
    usuariocrea varchar(20),
    fechacrea varchar(10),
    usuarioActualiza varchar(20) default CURRENT_USER,
    fechaActualiza timestamp default CURRENT_TIMESTAMP
);

INSERT INTO params(parametro,valor,descripcion,usuariocrea) VALUES()


create table users(
    id int primary key AUTO_INCREMENT,
    name varchar(250),
    contact varchar(50),
    email varchar(100),
    usuario varchar(20),
    password varchar(250),
    status varchar(20),
    role varchar(20),
    UNIQUE (email)
);

create table auth(
    id int primary key,
    usuario varchar(20),
    password varchar(200)
);

insert into users(name, contact,email,usuario,password,status,role)
value('MEYD SOLUTIONS', '901730351','meydsolutions@gmail.com','admin','123456', 'true', 'admin');



create table tiposervicio(
    id int primary key AUTO_INCREMENT,
    tiposervicio varchar(20),
    descripcion varchar(100),
    activo int,
    UNIQUE (tiposervicio)
);

insert into tiposervicio(tiposervicio,descripcion,activo)value('PROGRAMADO','Servicio que se realiza periodicamente y no requiere solicitud', 1);
insert into tiposervicio(tiposervicio,descripcion,activo)value('SOLICITADO','Servicios Solicitado por un cliente', 1);
insert into tiposervicio(tiposervicio,descripcion,activo)value('SUGERIDO','Servicio sugerido por un tecnico en las visitas realizadas', 1);

create table servicios(
    id int primary key AUTO_INCREMENT,
    descripcion varchar(200) not null,
    observaciones text,
    activo bit,
    usuariocrea varchar(20),
    fechacrea date,
    usuarioactualiza varchar(20) default CURRENT_USER,
    fechaactualiza timestamp default CURRENT_TIMESTAMP,
    
    
);

INSERT INTO `servicios` (`id`, `observaciones`, `activo`, `usuariocrea`, `fechacrea`, `usuarioactualiza`, `fechaactualiza`, `descripcion`) VALUES (NULL, 'Esto es una prueba', b'1', 'admin', '2024-04-09', 'current_user()', current_timestamp(), 'Mantenimiento de Baño');

create table clientes(
    id int primary key AUTO_INCREMENT,
    nit varchar(20) not null,
    cliente varchar(100) not null,
    ciudad varchar(100) not null,
    pais varchar(100) not null,
    direccion varchar(250),
    email varchar(100) not null,
    telefono varchar(20) not null,
    activo int,
    usuariocrea varchar(20),
    fechacrea datetime ,
    fechamodifica datetime DEFAULT CURRENT_DATE(),
    usuariomodifica varchar(20) DEFAULT CURRENT_USER()
);

insert into clientes(cliente,direccion,email,telefono,activo,usuariocrea,fechacrea)
value('MEYD SOLUTIONS','Mamonal km 5','meydsolutions@gmail.com', '3174025507', 1, CURRENT_USER(),CURRENT_DATE());


-- Cabecera de contratos
create table contratos(
    id int primary key AUTO_INCREMENT,
    id_cliente int,
    fechainicio date,
    fechafin date,
    responsable varchar(50),
    telefono varchar(20),
    clausulas text,
    observaciones text,
    usuariocrea varchar(20),
    fechacrea varchar(10),
    activo int,
    usuarioactualiza varchar(20) default CURRENT_USER,
    fechaactualiza timestamp default CURRENT_TIMESTAMP,

    foreign key(id_cliente) references clientes(id) on delete cascade on update cascade
);

INSERT INTO `contratos` (`id`, `id_cliente`, `fechainicio`, `fechafin`, `responsable`, `telefono`, 
`clausulas`, `observaciones`, `usuariocrea`, `fechacrea`, `usuarioactualiza`, `fechaactualiza`) 
VALUES (NULL, '1', '2024-04-09', '2025-04-30', 'German Consuegra', '3174025507', 
'Estas son algunas clausulas del contrato: bla bla bla', 'Esto es un contrato de Prueba', 'admin', 
'2024-04-09', 'current_user()', current_timestamp());


-- Detalle de servicios del contrato
create table servicioscontrato(
    id int primary key AUTO_INCREMENT,
    id_contrato int,
    id_servicio int,
    fechainicio date,
    fechafin date,
    activo int,
    ans int,
    vhh decimal(10,2),
    usuariocrea varchar(20),
    fechacrea varchar(10),
    usuarioactualiza varchar(20) default CURRENT_USER,
    fechaactualiza timestamp default CURRENT_TIMESTAMP 

    foreign key(id_contrato) references contratos(id) on delete cascade on update cascade,
    foreign key(id_servicio) references servicios(id) on delete cascade on update cascade
);

INSERT INTO `servicioscontrato` (`id`, `id_contrato`, `id_servicio`, `fechainicio`, `fechafin`, 
`activo`, `ans`, `vhh`, `usuariocrea`, `fechacrea`, `usuarioactualiza`, `fechaactualiza`) 
VALUES (NULL, '1', '5', '2024-04-01', '2025-04-30', '1', '4', '200', 'admin', '2024-04-09', 
'current_user()', current_timestamp());

create table sucursales(
    id int primary key AUTO_INCREMENT,
    nombre varchar(100) not null,
    direccion varchar(250),
    email varchar(100) not null,
    telefono varchar(20) not null,
    activo int,
    id_cliente int,
    usuariocrea varchar(20),
    fechacrea datetime ,

    foreign key(id_cliente) references clientes(id) on delete cascade on update cascade
);

INSERT INTO `sucursales` (`id`, `nombre`, `direccion`, `email`, `telefono`, `activo`, `id_cliente`, `usuariocrea`, `fechacrea`) VALUES (NULL, 'Principal', 'Alto Bosque tv 52', 'meydsolutions@gmail.com', '3174025507', '1', '1', 'admin', '2024-04-08 19:03:46');

create table areas(
    id int primary key AUTO_INCREMENT,
    nombre varchar(100) not null,
    descripcion varchar(100),
    activo int,
    id_sucursal int,
    autorizador varchar(50),
    emailautorizador varchar(100),
    telefonoautorizador varchar(20),
    usuariocrea varchar(20),
    fechacrea datetime, 
    
    foreign key(id_sucursal) references sucursales(id) on delete cascade on update cascade
);

INSERT INTO `areas` (`id`, `nombre`, `descripcion`, `activo`, `id_sucursal`, `autorizador`, `emailautorizador`, `telefonoautorizador`, `usuariocrea`, `fechacrea`) VALUES (NULL, 'Gerencia', 'Area de Gerencia de la Sucursal Principal', '1', '1', 'German Consuegra', 'gcdonline2@gmail.com', '3174025507', 'admin', '2024-04-08 19:03:46');

--para la version 2 agregaremos el manejo de activos, inventario y cotizaciones

create table usuarioscliente(
    id int primary key AUTO_INCREMENT,
    id_usuario int not null,
    id_cliente int not null,
    foreign key(id_usuario) references users(id) on delete cascade on update cascade,
    foreign key(id_cliente) references clientes(id) on delete cascade on update cascade
);


create table tikets(
    id int primary key AUTO_INCREMENT,
    id_cliente int not null,
    id_tecnico int,
    fecha date not null,
    hora time,
    id_servicio int,
    imagen varchar(100),
    descripcion text not null,
    estado varchar(10),
    prioridad varchar(10),
    usuariocrea varchar(20),
    fechacrea date,
    usuarioactualiza varchar(20) default CURRENT_USER,
    fechaactualiza timestamp default CURRENT_TIMESTAMP,
    id_tiposervicio int,
    foreign key(id_tiposervicio) references tiposervicio(id) on delete cascade on update cascade,

    foreign key(id_cliente) references clientes(id) on delete cascade on update cascade,
    foreign key(id_servicio) references servicios(id) on delete cascade on update cascade,
    foreign key(id_tecnico) references tecnicos(id) on delete cascade on update cascade
);

INSERT INTO `tikets` (`id`, `id_cliente`, `id_tecnico`, `fecha`, `hora`, `id_servicio`, `imagen`, 
            `descripcion`, `estado`, `usuariocrea`, `fechacrea`, `usuarioactualiza`, `fechaactualiza`,
            `prioridad`, `id_tiposervicio`) 
VALUES (NULL, '1', '1', '2024-04-10', '18:15:47', '5', NULL, 'esto es un tiket de prueba de desarrollo', 
            'SOL', 'admin', '2024-04-10', 'current_user()', current_timestamp(), 'ALTA', '1');

create table tipovisitas(
    id int primary key AUTO_INCREMENT,
    tipovisita varchar(20) not null,
    descripcion varchar(100) not null,
    activo int,
    UNIQUE (tipovisita)
);

create table visitastiket(
    id int primary key AUTO_INCREMENT,
    id_tiket int not null,
    id_tipovisita int not null,
    fechainicio date not null,
    horainicio time,
    fechafin date,
    horafin time,
    imagen1 varchar(100),
    imagen2 varchar(100),
    imagen3 varchar(100),
    observaciones text,
    firma varchar(100),
    total_materiales decimal,
    usuariocrea varchar(20),
    fechacrea date,
    usuarioactualiza varchar(20) default CURRENT_USER,
    fechaactualiza timestamp default CURRENT_TIMESTAMP,
    foreign key(id_tiket) references tikets(id) on delete cascade on update cascade,
    foreign key(id_tipovisita) references tipovisitas(id) on delete cascade on update cascade
);

create table materialesvisita(
    id int primary key AUTO_INCREMENT,
    id_visita int not null,
    descripcion varchar(100),
    cantidad int not null,
    valor_compra decimal,
    valor_venta decimal,
    usuariocrea varchar(20),
    fechacrea date,
    usuarioactualiza varchar(20) default CURRENT_USER,
    fechaactualiza timestamp default CURRENT_TIMESTAMP,
    foreign key(id_visita) references visitastiket(id) on delete cascade on
);

create table tecnicos(
    id int primary key AUTO_INCREMENT,
    nombre varchar(100) not null,
    apellidos varchar(100) not null,
    numerodocumento varchar(20),
    numid varchar(20),
    direccion varchar(250),
    email varchar(100) not null,
    telefono varchar(20) not null,
    tiposangre varchar(3),
    activo int,
    foto varchar(100),
    usuariocrea varchar(20),
    fechacrea varchar(10),
    usuarioactualiza varchar(20) default CURRENT_USER,
    fechaactualiza timestamp default CURRENT_TIMESTAMP,
    UNIQUE (numerodocumento)
);

create table documentos(
    id int primary key AUTO_INCREMENT,
    nombre varchar(100) not null,
    descripcion varchar(100),
    activo int,
    usuariocrea varchar(20),
    fechacrea varchar(10)
);

create table documentostecnico(
    id int primary key AUTO_INCREMENT,
    id_tecnico int not null,
    id_documento int not null,
    fechaemision date,
    fechavencimiento date,
    numerodocumento varchar(20),
    observaciones text,
    usuariocrea varchar(20),
    foreign key(id_tecnico) references tecnicos(id) on delete cascade on update cascade,
    foreign key(id_documento) references documentos(id) on delete cascade on update cascade
);

create table especialidades(
    id int primary key AUTO_INCREMENT,
    nombre varchar(100) not null,
    descripcion varchar(100),
    activo int,
    usuariocrea varchar(20),
    fechacrea varchar(10)
);

create table tecnicosespecialidad(
    id int primary key AUTO_INCREMENT,
    id_tecnico int not null,
    id_especialidad int not null,
    especialidad varchar(50),
    fechaemision date,
    fechavencimiento date,
    observaciones text,
    usuariocrea varchar(20),
    foreign key(id_tecnico) references tecnicos(id) on delete cascade on update cascade
    foreign key(id_especialidad) references especialidades(id) on delete cascade on update cascade
);

create table comentariostikets(
    id int primary key AUTO_INCREMENT,
    id_tiket int not null,
    tipo varchar(2),
    comentario text,
    fecha date,
    usuario varchar(20),
    imagen varchar(200)
);

CREATE VIEW CONXSERV AS
SELECT C.ID AS IDCONTRATO, SC.fechainicio, SC.fechafin, SC.activo, SC.ans, SC.vhh, SV.descripcion, SV.observaciones 
FROM CONTRATOS C
INNER JOIN servicioscontrato SC ON C.id = SC.id_contrato AND SC.activo=1
LEFT JOIN servicios SV ON SC.id_servicio = SV.id AND SV.activo=1
ORDER BY C.id;

