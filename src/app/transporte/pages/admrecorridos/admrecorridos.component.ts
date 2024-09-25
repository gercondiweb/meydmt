import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../../services/rest.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admrecorridos',

  templateUrl: './admrecorridos.component.html',
  styleUrl: './admrecorridos.component.css'
})
export class AdmrecorridosComponent implements OnInit{

  datosConsulta={
    opc:''
  }

  datosRutas={
    opc:'',
    vID:0
  }

  formServicioVehiculo : FormGroup;

  constructor(
    private router: Router,
    private restService: RestService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.formServicioVehiculo = this.fb.group({
      idservicio: [0],
      fecha:[''],
      hora:[''],
      estado:[''],
      origen:[],
      destino:[],
      usuarios:[''],
      id_vehiculo: [0],
      id_conductor: [],
      id_cliente:[],
      id_tiposervicio:[0],
      id_zona:[0],
      cdec:[],
      cuenta:[],
      comentario:['']
    });
    
    this.cargarmaestros();
    
  }

  listClientes:any;
  listRutas:any;
  listConductores:any;
  listVehiculos:any;
  listTipoServicio:any;
  listZona:any;

  rutaSeleccionada: string | null = null;

  seleccionarRuta(codigo: string): void {
    this.rutaSeleccionada = codigo;
    console.log('Código de ruta seleccionada:', codigo);
  }

  cargarmaestros(){
    this.datosConsulta.opc ='CLI';
    this.restService.getMaestros(this.datosConsulta).subscribe(respuesta=>{
      console.log(respuesta);
      this.listClientes = respuesta.body[0];
    });

    //cargar rutas
    this.datosRutas.opc='RUTASCLI';
    this.datosRutas.vID = 1; //id del cliente al que se le quiere registrar el recorrido

    this.restService.consultatransporte(this.datosRutas)
    .subscribe(respuesta=>{
      this.listRutas = respuesta.body[0];
    });

    //tipos de servicio y demas datos maestros del servicio a registrar
    this.datosConsulta.opc ='TIPSERV';
    this.restService.getMaestros(this.datosConsulta).subscribe(respuesta=>{
      console.log(respuesta);
      this.listTipoServicio = respuesta.body[0];
    });

    this.datosConsulta.opc ='ZONA';
    this.restService.getMaestros(this.datosConsulta).subscribe(respuesta=>{
      console.log(respuesta);
      this.listZona = respuesta.body[0];
    });

    //conductor y vehiculo
    this.datosConsulta.opc ='CONDUCTOR';
    this.restService.getMaestros('TCN').subscribe(respuesta=>{
      console.log(respuesta);
      this.listConductores = respuesta.body[0];
    });


    this.datosConsulta.opc ='VEHICULO';
    this.restService.getMaestros(this.datosConsulta).subscribe(respuesta=>{
      console.log(respuesta);
      this.listVehiculos = respuesta.body[0];
    });
  }

  digitar(){

  }

  regresar(){
    this.router.navigateByUrl('/transporte/recorridos');
  }

}
