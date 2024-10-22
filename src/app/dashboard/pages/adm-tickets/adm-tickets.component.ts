import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RestService } from '../../services/services/rest.service';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSharingService } from '../../services/services/data-sharing.service';

import { identity, lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { AdmComentsComponent } from '../adm-coments/adm-coments.component';

interface Prioridad {
  value: string;
  viewValue: string;
}

export interface ElementoTicket {
  nombre: string;

}

@Component({
  selector: 'app-adm-tickets',
  standalone: false,
  templateUrl: './adm-tickets.component.html',
  styleUrl: './adm-tickets.component.css'
})
export class AdmTicketsComponent implements OnInit{


  accion!: string;

  prioridad: Prioridad[] = [
    {value: 'ALTA', viewValue:'ALTA'},
    {value:'NORMAL', viewValue:'NORMAL'},
    {value: 'BAJA', viewValue:'BAJA'},
  ];

  datosBusquedaMaestro={
    opc:''
  }

  datosCli={
    opc:'',
    vIDCLIENTE: ''
  }

  datosConsutaServicios={
    opc:'',
    id_tiposervicio:''
  }

  datosBusquedaTicket={

      opc :'',
    	vIDTICKET : 0,
    	vFecha : '',
    	vHora :'',
    	vUsuario : '',
    	vComentario :'',
    	vVisible : true,
    	vIdComentario: 0

  }

  datosgrabar={
    opc:'NEW',
    id_tkt:0,
    fecha:'',
    hora:'',
    id_servicio:0,
    id_cliente: 0,
    descripcion:'',
    estado:'SOL',
    prioridad:'',
    id_tiposervicio: 0,
    id_tecnico: 0
  }

  listTiposServ: any;
  tipoServ:any[]=[];

  listTipoTiket: any;
  tipoTiket:any[]=[];

  listServ: any;
  servicios:any[]=[];

  listTecnicos: any;
  tecnicos:any[]=[];

  listClientes: any;
  clientes:any[]=[];

  listSucursales: any;
  cSucursales:any[]=[];

  listAreas: any;
  cArea:any[]=[];

  listComentarios: any;
  comentarios:any[]=[];

  listVisitas: any;
  visitas:any[]=[];

  ticketSeleccionado : any;

  public formTicket !: FormGroup;
  public formVisita !: FormGroup;
  public formComentario !: FormGroup;

  public ticketID: any;

  param1!: string;
  param2!: string;
  objetoData: any;

  response:any;

  constructor(
    private formBuilder: FormBuilder,
    private restService: RestService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private dataSharingService: DataSharingService,
    private datePipe : DatePipe
  ){}

  ngOnInit(): void {
    this.accion = this.route.snapshot.paramMap.get('accion') || '';

    this.formTicket = this.formBuilder.group({
      opc:[''],
       id : [{value:'', disabled:this.accion==='Crear'},Validators.required],
       fecha : ['',[Validators.required]],
       hora: ['',[Validators.required]],
       id_tiposervicio: ['',[Validators.required]],
       id_servicio: ['',[Validators.required]],
       descripcion: ['',[Validators.required]],
       id_tecnico: ['',[Validators.required]],
       estado: ['SOL',[Validators.required]],
       prioridad: ['',[Validators.required]],
       id_sucursal:[''],
       id_area:[''],
       id_cliente:[''],
       tipo_tiket:[0]
    });

    this.cargarMaestros();

    if ( this.accion === 'editar'){
      //llenar datos del ticket y buscar comentarios
      this.cargarDatosTicket();
    }

  }

  onSelectChange(event: any, selectName: string) {
    const selectedValue = event.target.value;

    //console.log(`Select ${selectName} cambió a: `, event.target.value);

    if (selectName==='selectCliente') {
      this.selSucursales(selectedValue);
    }else if (selectName==='selectServicio'){
      this.selServicios(selectedValue);
    }
  }

  selSucursales(value: string){

    this.datosCli.opc='SUCUR';
    this.datosCli.vIDCLIENTE = value;

    this.restService.getClientes(this.datosCli).subscribe(res=>{
      this.listSucursales = res;
      this.cSucursales = this.listSucursales.body[0];
    });

    this.datosCli.opc='AREAS';
    this.restService.getClientes(this.datosCli).subscribe(res2=>{
      this.listAreas = res2;
      this.cArea = this.listAreas.body[0];
    });

    //console.log(this.cSucursales)
    //console.log(this.cArea)
  }

  selServicios(value: string){
    console.log(value)
    this.datosConsutaServicios.opc='SRVxTPO';
    this.datosConsutaServicios.id_tiposervicio = value;

    this.restService.consultaOpeTick(this.datosConsutaServicios).subscribe(res3=>{
      this.listServ = res3;
      this.servicios = this.listServ.body[0];
    });


  }

  regresar(){
    this.router.navigateByUrl('/dashboard/tickets');
  }

  cargarMaestros(){

    this.objetoData = this.dataSharingService.getData();

    //console.log(this.objetoData)

      this.datosBusquedaMaestro.opc = 'CLI';
      this.restService.getMaestros(this.datosBusquedaMaestro).subscribe(respuesta=>{
        this.listClientes=respuesta;
        this.clientes=this.listClientes.body[0];
      })

      this.datosBusquedaMaestro.opc = 'TPOTKT';
      this.restService.getMaestros(this.datosBusquedaMaestro).subscribe(respuesta2=>{
        this.listTipoTiket=respuesta2;
        this.tipoTiket=this.listTipoTiket.body[0];
      })

      this.datosBusquedaMaestro.opc = 'TSRV';
      this.restService.getMaestros(this.datosBusquedaMaestro).subscribe(respuesta=>{
        this.listTiposServ=respuesta;
        this.tipoServ=this.listTiposServ.body[0];
      })

      this.datosBusquedaMaestro.opc = 'SERV';
      this.restService.getMaestros(this.datosBusquedaMaestro).subscribe(respuesta=>{
        this.listServ=respuesta;
        this.servicios=this.listServ.body[0];
      })

      this.selSucursales(this.objetoData.data.id_cliente);

  }

  cargarDatosTicket(){


      this.datosBusquedaTicket.opc='SEL';
      this.datosBusquedaTicket.vIDTICKET = this.objetoData.data.Id;
      this.ticketSeleccionado = this.objetoData.data.Id;

        this.restService.getTicketComents(this.datosBusquedaTicket).subscribe(respuesta=>{
        this.listComentarios=respuesta;
        this.comentarios=this.listComentarios.body[0];

        //console.log(this.comentarios)

        this.visitas=this.listComentarios.body[1];

        //console.log(this.visitas)
        //console.log(this.objetoData.data)

        this.formTicket.patchValue({
          id: this.objetoData.data.Id,
          fecha: this.objetoData.data.Fecha.split('T')[0],
          hora: this.objetoData.data.Hora,
          id_tiposervicio: this.objetoData.data.id_tiposervicio,
          id_servicio: this.objetoData.data.id_servicio,
          descripcion: this.objetoData.data.DetalleTKT,
          id_tecnico: this.objetoData.data.id_tecnico,
          estado: this.objetoData.data.Estado,
          prioridad: this.objetoData.data.Prioridad,
          id_sucursal: this.objetoData.data.id_sucursal,
          id_area: this.objetoData.data.id_area,
          id_cliente: this.objetoData.data.id_cliente,
          tipo_tiket: this.objetoData.data.tipo_tiket
        });
      })

  }

  async guardarTicket(){
    // TODO: hacer el procedimiento para capturar el la empresa del usuario conectado
    if (this.accion=== 'crear')
    {
      this.formTicket.get('opc')?.setValue('NEW');
      this.formTicket.get('id')?.setValue('0');
      this.formTicket.get('id_cliente')?.setValue('1');
    }
      console.log(this.formTicket.value)

      try{
        const res = await lastValueFrom(this.restService.saveTickets(this.formTicket.value));
        this.response = res;

        console.log(res)

        this.ticketID = '';
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
      //this.regresar();

  }

  agregarComentario(elemento: ElementoTicket) {
    // Lógica para editar el elemento
    console.log(this.objetoData.data)
    const dialogRef = this.dialog.open(AdmComentsComponent, {
      disableClose: true,
      autoFocus: true,
      closeOnNavigation : false,
      width : '900px',
      data: {
        tipo: 'Crear',
        data: this.objetoData.data,
      }
    });

    dialogRef.afterClosed().subscribe((data) => {
      console.log(data);
      this.comentarios.push(data);
    });
  }

  agregarVisita(){

  }

}
