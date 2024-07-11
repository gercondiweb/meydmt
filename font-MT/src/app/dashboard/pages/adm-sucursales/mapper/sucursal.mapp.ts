import { ISucursal } from "../types/interfaces/sucursal";
import { ISucursalEntity } from "../types/models/sucursal.entity";

export const toSocursal = ( _model: ISucursalEntity ):ISucursal => ({
  id:          _model.id,
  nombre:      _model.nombre,
  direccion:   _model.direccion,
  email:       _model.email,
  telefono:    _model.telefono,
  activo:      _model.activo,
  id_cliente:  _model.id_cliente,
  usuariocrea: _model.usuariocrea,
  fechacrea:   _model.fechacrea,
  id_pais:     _model.id_pais,
  id_ciudad:   _model.id_ciudad,
  zip:         _model.zip,
});


export const toSocursalEntity = ( _model: ISucursal ):ISucursalEntity => ({
  id:          _model.id,
  nombre:      _model.nombre,
  direccion:   _model.direccion,
  email:       _model.email,
  telefono:    _model.telefono,
  activo:      _model.activo,
  id_cliente:  _model.id_cliente,
  usuariocrea: _model.usuariocrea,
  fechacrea:   _model.fechacrea,
  id_pais:     _model.id_pais,
  id_ciudad:   _model.id_ciudad,
  zip:         _model.zip,
});
