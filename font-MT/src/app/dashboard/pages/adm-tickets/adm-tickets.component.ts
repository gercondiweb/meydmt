import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RestService } from '../../services/services/rest.service';
import { MatDialog } from '@angular/material/dialog';
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

  listServ: any;
  servicios:any[]=[];

  listTecnicos: any;
  tecnicos:any[]=[];

  listClientes: any;
  clientes:any[]=[];

  listComentarios: any;
  comentarios:any[]=[];

  listVisitas: any;
  visitas:any[]=[];

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

  ){}

  ngOnInit(): void {
    this.accion = this.route.snapshot.paramMap.get('accion') || '';

    this.cargarMaestros();

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
       sucursal:[''],
       id_cliente:['']
    });
console.log(this.accion)
    if ( this.accion === 'editar'){
      //llenar datos del ticket y buscar comentarios
      this.cargarDatosTicket();
    }

  }

  regresar(){
    this.router.navigateByUrl('/dashboard/tickets');
  }

  cargarMaestros(){

    this.datosBusquedaMaestro.opc = 'TSRV';
    this.restService.getMaestros(this.datosBusquedaMaestro).subscribe(respuesta=>{
      this.listTiposServ=respuesta;
      this.tipoServ=this.listTiposServ.body[0];
      })


    this.datosBusquedaMaestro.opc = 'SERV';
    this.restService.getServicios(this.datosBusquedaMaestro).subscribe(respuesta2=>{
      this.listServ=respuesta2;
      this.servicios=this.listServ.body[0];
      })

    this.datosBusquedaMaestro.opc = 'TECN';
    this.restService.getMaestros(this.datosBusquedaMaestro).subscribe(respuesta3=>{
      this.listTecnicos=respuesta3;
      this.tecnicos=this.listTecnicos.body[0];
      })

      this.datosBusquedaMaestro.opc = 'CLI';
      this.restService.getMaestros(this.datosBusquedaMaestro).subscribe(respuesta3=>{
        this.listClientes=respuesta3;
        this.clientes=this.listClientes.body[0];
        })

  }

  cargarDatosTicket(){

    this.param1 = this.dataSharingService.getParam1();
    this.param2 = this.dataSharingService.getParam2();
    this.objetoData = this.dataSharingService.getData();

    this.datosBusquedaTicket.opc='SEL';

    this.datosBusquedaTicket.vIDTICKET = this.objetoData.ticket.Id;

      //console.log(this.objetoData.ticket)

     this.restService.getTicketComents(this.datosBusquedaTicket).subscribe(respuesta=>{
        this.listComentarios=respuesta;
        this.comentarios=this.listComentarios.body[0];

        //console.log(this.comentarios)

        this.visitas=this.listComentarios.body[1];

        console.log(this.visitas)
      })

  }

  async guardarTicket(){
    // TODO: hacer el procedimiento para capturar el la empresa del usuario conectado
    if (this.accion=== 'crear')
    {
      this.formTicket.get('opc')?.setValue('NEW');
      this.formTicket.get('id')?.setValue('0');
      this.formTicket.get('id_cliente')?.setValue('1');

     // console.log(this.formTicket.value)

      try{
        const res = await lastValueFrom(this.restService.crearTkt(this.formTicket.value));
        this.response = res;

        console.log(this.response)

        this.ticketID = res.body[0][0].insertId;
        if(!this.response.error){
          await Swal.fire({
            position: "center",
            icon: "success",
            title: 'Tiket: ' + this.ticketID + ' creado satisfactoriamente!',
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
      this.regresar();
    }
    else{
    // actualizar valores del ticket

    }
  }

  agregarComentario(elemento: ElementoTicket) {
    // Lógica para editar el elemento
    const dialogRef = this.dialog.open(AdmComentsComponent, {
      disableClose: true,
      autoFocus: true,
      closeOnNavigation : false,
      width : '900px',
      data: {
        tipo: 'Crear',
        data: elemento,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  agregarVisita(){

  }
}
