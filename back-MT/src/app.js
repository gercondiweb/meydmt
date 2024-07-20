const express = require('express');

const multer = require('multer');
const path = require('path');

const cors = require('cors');
const morgan = require('morgan');   //visualiza las peticiones
const config = require('./config');

const usuarios=require('./modulos/usuarios/rutas');
const clientes = require('./modulos/clientes/rutas');

const sucursales = require('./modulos/sucursales/rutas');
const areas = require('./modulos/areas/rutas');

const comentarios = require('./modulos/comentarios/rutas'); 
const visitas = require('./modulos/visitas/rutas');

const auth = require('./modulos/auth/rutas');

const tecnicos = require('./modulos/tecnicos/rutas');
const sptecnicos = require('./modulos/tecnicos/rutas');
const especialidadestecnico= require('./modulos/especialidadestecnico/rutas');
const documentostecnico=require('./modulos/documentostecnico/rutas');

const tiposervicio = require('./modulos/tiposervicio/rutas');
const usuarioscliente = require('./modulos/usuarioscliente/rutas');
const consultaservicio = require('./modulos/consultaservicio/rutas');

const tikets = require('./modulos/tikets/rutas');
const contratos = require('./modulos/contratos/rutas');
const servicioscontrato = require('./modulos/servicioscontrato/rutas');
const getCountTikets =require('./modulos/consultastikets/rutas');
const consultasTikets =require('./modulos/consultastikets/rutas');
const getserv = require('./modulos/consultaservicio/rutas');
const crearticket = require('./modulos/operacionestikets/rutas');

const materialesvisita = require('./modulos/materialesvisita/rutas');

const comentsticket = require('./modulos/operacionestikets/rutas');

const consultaClientes = require('./modulos/consultaclientes/rutas');

const consultasContrato = require('./modulos/consultacontratos/rutas');

const operacionescontrato = require('./modulos/operacionecontratos/rutas');

const ticketvisits = require('./modulos/consultastikets/rutas');

const servicios = require('./modulos/servicios/rutas');

const consultadb = require('./modulos/consultasdb/rutas')

const error = require('./red/errors');

const app = express();

//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

//Configuracion
app.set('port', config.app.port);

//multer consig de subir archivo
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });

  const upload = multer({ storage });

  app.post('/api/upload', upload.array('files'), (req, res) => {
  const files = req.files.map(file => ({
    url: `http://localhost:${app.get('port')}/uploads/${file.filename}`,
    name: file.originalname,
    type: file.mimetype
  }));

  res.json({body:files});
});

//rutas

app.use('/uploads', express.static('uploads')); //multer
//--------------------------------------------------------------------
app.use('/api/usuarios', usuarios);

app.use('/api/consultadb', consultadb);

app.use('/api/clientes', clientes);
app.use('/api/sucursales', sucursales);
app.use('/api/areas', areas);

app.use('/api/comentarios', comentarios);
app.use('/api/visitas', visitas);

app.use('/api/auth', auth);
app.use('/api/servicios', getserv);
app.use('/api/tiposervicio', tiposervicio);
app.use('/api/usuarioscliente', usuarioscliente);
app.use('/api/consultaservicio', consultaservicio);

app.use('/api/tikets', tikets);
app.use('/api/contratos', contratos);

app.use('/api/cantktest', getCountTikets);
app.use('/api/consultatkt', consultasTikets);

app.use('/api/operacionestikets', crearticket);
app.use('/api/ticketcoments', comentsticket);
app.use('/api/materialesvisita', materialesvisita);

app.use('/api/consultacontratos', consultasContrato);
app.use('/api/operacionescontrato', operacionescontrato);
app.use('/api/servicioscontrato', servicioscontrato); 

app.use('/api/consultaclientes', consultaClientes);

app.use('/api/consultastikets', ticketvisits);

app.use('/api/servicios', servicios);

app.use('/api/tecnicos', tecnicos);
app.use('/api/sptecnicos', sptecnicos);
app.use('/api/especialidadestecnico', especialidadestecnico);
app.use('/api/documentostecnico', documentostecnico);

app.use(error);
module.exports = app;
