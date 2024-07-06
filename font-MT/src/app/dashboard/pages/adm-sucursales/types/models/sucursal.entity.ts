export interface ISucursalEntity {
  id:          number;
  nombre:      string;
  direccion:   string;
  email:       string;
  telefono:    string;
  activo:      number;
  id_cliente:  number;
  usuariocrea: string;
  fechacrea:   string;
  id_pais:     number;
  id_ciudad:   number;
  zip:         string;
}
