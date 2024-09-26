import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../services/rest.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataSharingService } from '@/app/dashboard/services/services/data-sharing.service';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';


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
  accion :any;
  objetoData:any;

  response:any;

  constructor(
    private router: Router,
    private restService: RestService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dataSharingService: DataSharingService
  ) { }

  ngOnInit(): void {

    this.accion = this.route.snapshot.paramMap.get('accion') || '';

    this.formServicioVehiculo = this.fb.group({
      id: [0],
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
    
    if(this.accion === 'Editar'){
      this.cargarDatos();
    }else{
      this.formServicioVehiculo.get('id')?.setValue(0);
      this.formServicioVehiculo.get('estado').setValue('PDA');
    }
  }

  listClientes:any;
  listRutas:any;
  listConductores:any;
  listVehiculos:any;
  listTipoServicio:any;
  listZona:any;

  cSelected:any;

  rutaSeleccionada: string | null = null;

  seleccionarRuta(codigo: string): void {
    this.rutaSeleccionada = codigo;
    console.log('Código de ruta seleccionada:', codigo);

    // Buscamos los Datos de la ruta seleccionada
    this.datosRutas.opc='RUTASEL';
    this.datosRutas.vID = parseInt(codigo);
    this.restService.consultatransporte(this.datosRutas).subscribe(respuesta=>{
      this.listRutas = respuesta.body[0];
      this.formServicioVehiculo.patchValue({
        hora: this.listRutas[0].hora,
        id_tiposervicio: this.listRutas[0].id_tiposervicio,
        id_zona: this.listRutas[0].id_zona,
        origen: this.listRutas[0].origen,
        destino: this.listRutas[0].destino
      });
    });
  }

  //cuenta la cantidad de rutas que tiene creadas el cliente y muestra le valor en la pestaña
  cantRutas :number =0;

  clienteselect(event: any){
    this.cSelected = event.target.value;
    console.log('Valor seleccionado:', this.cSelected);

    // Buscamos los Rutas del cliente seleccionado
    this.datosRutas.opc='RUTASCLI';
    this.datosRutas.vID = parseInt(this.cSelected);

    this.restService.consultatransporte(this.datosRutas)
   .subscribe(respuesta=>{
     this.listRutas = respuesta.body[0];
     this.cantRutas = this.listRutas.length;
     console.log(this.listRutas);
    });

    console.log(this.cantRutas);
  }

  esSeleccionada(codigo: string): boolean {
    return this.rutaSeleccionada === codigo;
  }

  cargarmaestros(){
    this.datosConsulta.opc ='CLI';
    this.restService.getMaestros(this.datosConsulta).subscribe(respuesta=>{
      console.log(respuesta);
      this.listClientes = respuesta.body[0];
    });

    //cargar rutas
    //this.datosRutas.opc='RUTASCLI';
    //this.datosRutas.vID = 1; //id del cliente al que se le quiere registrar el recorrido

    this.restService.consultatransporte(this.datosRutas)
    .subscribe(respuesta=>{
      this.listRutas = respuesta.body[0];
    });

    //tipos de servicio y demas datos maestros del servicio a registrar
    this.datosConsulta.opc ='TIPOSERV';
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
    this.restService.getMaestros(this.datosConsulta).subscribe(respuesta=>{
      console.log(respuesta);
      this.listConductores = respuesta.body[0];
    });


    this.datosConsulta.opc ='VEHICULO';
    this.restService.getMaestros(this.datosConsulta).subscribe(respuesta=>{
      console.log(respuesta);
      this.listVehiculos = respuesta.body[0];
    });
  }

  cargarDatos(){
    this.objetoData = this.dataSharingService.getData();

    console.log('data',this.objetoData.data);

    this.formServicioVehiculo.patchValue({
      id: this.objetoData.data.id,
      fecha:this.objetoData.data.fecha.split('T')[0],
      hora:this.objetoData.data.hora,
      estado:this.objetoData.data.estado,
      origen:this.objetoData.data.origen,
      destino:this.objetoData.data.destino,
      usuarios:this.objetoData.data.usuarios,
      id_vehiculo: this.objetoData.data.id_vehiculo,
      id_conductor: this.objetoData.data.idconductores,
      id_cliente:this.objetoData.data.id_cliente,
      id_tiposervicio:this.objetoData.data.id_tiposervicio,
      id_zona:this.objetoData.data.id_zona,
      cdec:this.objetoData.data.cdec,
      cuenta:this.objetoData.data.cuenta,
      comentario:this.objetoData.data.comentario
    });
  }

  async guardar(){
    if (this.formServicioVehiculo.get('id_vehiculo').value !== ''){
      this.formServicioVehiculo.get('estado').setValue('ASG');
    }

    try{
      const res = await lastValueFrom(this.restService.serviciostr(this.formServicioVehiculo.value));
      this.response = res;

      if(!this.response.error){
        await Swal.fire({
          position: "center",
          icon: "success",
          title: res.message,
          showConfirmButton: false,
          timer: 2000
        });

      }
    }catch( e:any ){
      console.log(e);
      await Swal.fire({
        position: "center",
        icon: "error",
        title: e.message,
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  regresar(){
    this.router.navigateByUrl('/transporte/recorridos');
  }

}
