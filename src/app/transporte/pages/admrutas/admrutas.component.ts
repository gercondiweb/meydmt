import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RestService } from '../../services/rest.service';
import { DataSharingService } from '@/app/dashboard/services';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-admrutas',
  templateUrl: './admrutas.component.html',
  styleUrl: './admrutas.component.css',
  providers: [CurrencyPipe]
})
export class AdmrutasComponent {

  activarBotones:boolean = false;
  activarGuardar:boolean = true;

  formRuta: FormGroup;
  accion: any;
  objetoData: any;
  idCliente:any;

  listTipoServ:any;
  listZonas:any;
  listCli:any;
  listVehiculos: any;

  listUsu:any;
  columnUsu=['nombre', 'direccion', 'telefono', 'referencia']

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dataSharingService: DataSharingService,  // Servicio para compartir datos entre componentes
    private restService: RestService,
    private router: Router,
    private currencyPipe: CurrencyPipe
  ){}

  ngOnInit(): void {
    this.accion = this.route.snapshot.paramMap.get('accion') || '';

    this.formRuta = this.fb.group({
      id:[0],
      nombre: [''],
      hora: [''],
      horafin:[''],
      origen: [''],
      destino: [''],
      id_tiposervicio: [0],
      id_zona: [0],
      id_cliente:[0],
      id_vehiculo:[0],
      valor:[0],
      costo:[0]
    });

    this.cargarMaestros();

    if(this.accion === 'Editar'){
      //cargar los datos de la ruta para editar
      this.cargarDatosRuta();
      this.activarBotones=true;
    }else{
      this.formRuta.get('id')?.setValue(0); 
    }
  }
  

  regresar(){
    this.router.navigateByUrl('/transporte/rutas');
  }

  cargarMaestros(){
    //llamar al servicio para cargar los maestros
    this.restService.getMaestros({opc:'TIPOSERV'}).subscribe(respuesta=>{
      this.listTipoServ = respuesta.body[0]
    });
    this.restService.getMaestros({opc:'ZONA'}).subscribe(respuesta=>{
      this.listZonas = respuesta.body[0];
    });
    this.restService.getMaestros({opc:'CLI'}).subscribe(respuesta=>{
      this.listCli = respuesta.body[0];
    });
    this.restService.getMaestros({opc:'VEHICULO'}).subscribe(respuesta=>{
      this.listVehiculos = respuesta.body[0];
    });
  }

  cargarDatosRuta(){
    //llamar al servicio para cargar los datos de la ruta
    this.objetoData = this.dataSharingService.getData();
    this.idCliente = this.objetoData.data.Id;

    //llenar el formulario con los datos obtenidos
    this.formRuta.patchValue({
      id:this.objetoData.data.id,
      nombre: this.objetoData.data.nombre,
      hora: this.objetoData.data.hora,
      horafin:this.objetoData.data.horafin,
      origen: this.objetoData.data.origen,
      destino: this.objetoData.data.destino,
      id_tiposervicio: this.objetoData.data.id_tiposervicio,
      id_zona: this.objetoData.data.id_zona,
      id_cliente:this.objetoData.data.id_cliente,
      id_vehiculo:this.objetoData.data.id_vehiculo,
      valor : this.objetoData.data.valor,
      costo : this.objetoData.data.costo
    });
  }

  async guardarRuta(){

    try{

      const ruta = await lastValueFrom(this.restService.rutas(this.formRuta.value));
      this.activarBotones = true;
    }catch(e){
      console.log(e);
      await Swal.fire({
        position: "center",
        icon: "error",
        title: e.message,
        showConfirmButton: false,
        timer: 1500
      });
      this.activarBotones=false;
      this.activarGuardar=false;
    }
  }

  agregarUsuario(){

  }

}
