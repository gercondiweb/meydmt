import { Component, OnInit } from '@angular/core';
  import { RestService } from '../../services';

@Component({
  selector: 'app-verservicios',
  templateUrl: './verservicios.component.html',
  styleUrl: './verservicios.component.css'
})
export class VerserviciosComponent implements OnInit {

  public listDatos: any;
  public datos: any[] = [];
  columnas = ['id','fecha','hora','origen', 'destino','estado'];

  public fInicial : any = '';
  public fFinal : any = '';

  datosBusqueda = {
    opc:'',
    id_cliente:0,
    fechainicial: new Date(),
    fechafinal:new Date(),
    id_propietario:0,
    id_conductor:0,
    id_placa:0,
    id_zona:0,
    estado:''
  }

  constructor(private _restService:RestService){}

  ngOnInit(): void {
    this.datosBusqueda.opc = 'RF';
    this.cargarData();
  }


  vEstados= [
    { "idE": 1, "estado": 'Solicitado'},
    { "idE": 2, "estado": 'Asignado'},
    { "idE": 3, "estado": 'Ejecutando'},
    { "idE": 4, "estado": 'Finalizado'},
    { "idE": 5, "estado": 'Cancelado'},
    { "idE": 6, "estado": 'Pendiente'},

  ];

  modificarFechaInicial() {
    // Modificar la fecha inicial
    const fechaIni = this.datosBusqueda.fechainicial.toISOString().slice(0, 10);
    const fechaFin = this.datosBusqueda.fechafinal.toISOString().slice(0, 10);
    this.datosBusqueda.fechainicial = new Date(fechaIni); // Cambia la fecha a la deseada
    this.datosBusqueda.fechainicial = new Date(fechaFin);
    return true;
  }

  public cargarData(){
    
  }

  public cargarServiciosMes(){
    this._restService.getFiltroServicios(this.datosBusqueda)
    .subscribe(respuesta=>{
      this.listDatos = respuesta;
      this.datos = this.listDatos.body;

      //console.log(respuesta);
    })
  }

  buscar(){
    this.modificarFechaInicial;
    console.log(this.datosBusqueda)
    return true;
  }
}
