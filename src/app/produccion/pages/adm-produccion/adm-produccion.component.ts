import { DataSharingService } from '@/app/dashboard/services';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdrestserviceService } from '../../services/prodrestservice.service';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin, lastValueFrom, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export interface Campo {
  id: string;
  id_seccion: string;
  nombre: string;
}

export interface Seccion {
  id: string;
  secciones: string;
  campos: Campo[]; // Relacionar los campos de cada sección
}

@Component({
  selector: 'app-adm-produccion',
  templateUrl: './adm-produccion.component.html',
  styleUrls: ['./adm-produccion.component.css']
})
export class AdmProduccionComponent implements OnInit {

  frmCabeceraOrden: FormGroup;

  accion : any;
  activarSecciones: any = true;
  response : any;

  idOrden :any;

  param1!: string;
  param2!: string;
  objetoData: any;

  datosCMaestro={
    opc : ''
  }

  listPrioridad : any;
  prioridad : any[];

  listFormatos : any;
  formatos : any[];

  listSecciones : any;
  secciones : any[];

  listCampos : any;
  campos : any[];


  constructor(
    private dataSharingService: DataSharingService,
    private router: Router,
    private route: ActivatedRoute,
    private restService : ProdrestserviceService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog) { }

  ngOnInit() {

    this.frmCabeceraOrden = this.formBuilder.group({
      id : [0,[Validators.required]],
      OIT: ['',[Validators.required]],
      equipo:[],
      estado:[],
      fechaautorizacion:[],
      fechaentregacotizacion:[],
      fechaentrada:[],
      horaentrada:[],
      fechaentregapactada:[],
      fechasalida:[],
      id_cliente:[0,[Validators.required]],
      cliente:[],
      nit:[],
      direccion:[],
      correo:[],
      telefono:[],
      autoriza:[],
      id_formato:[],
      id_prioridad:[],
      solicitud:[],
      tag:[],
      ubicacion:[],
      usuarioentregacampo:[],
      usuarioentregataller:[],
      usuariorecibecampo:[],
      usuariorecibetaller:[]
    });




    this.accion = this.route.snapshot.paramMap.get('accion') || '';

    this.cargarMaestros();

    if(this.accion === "Editar"){
      this.activarSecciones = true;

      this.cargarOrden();
      this.cargarDetalleOrden();

    }else{
      this.frmCabeceraOrden.get('id')?.setValue(0);
    }


  }

  cargarMaestros(){
    this.datosCMaestro.opc = 'PRIOR';
      this.restService.getMaestros(this.datosCMaestro).subscribe(respuesta=>{
        this.listPrioridad=respuesta;
        this.prioridad=this.listPrioridad.body[0];
      })

      this.datosCMaestro.opc = 'FORMATOS';
      this.restService.getMaestros(this.datosCMaestro).subscribe(respuesta=>{
        this.listFormatos=respuesta;
        this.formatos=this.listFormatos.body[0];
      })
  }

  cargarOrden(){
    this.param1 = this.dataSharingService.getParam1();
    this.param2 = this.dataSharingService.getParam2();
    this.objetoData = this.dataSharingService.getData();


    this.frmCabeceraOrden.patchValue({
      id : this.objetoData.data.id,
      OIT: this.objetoData.data.OIT,
      equipo:this.objetoData.data.equipo,
      estado:this.objetoData.data.estado,
      fechaautorizacion:this.objetoData.data.fechaautorizacion,
      fechaentrada:this.objetoData.data.fechaentrada,
      horaentrada:this.objetoData.data.horaentrada,
      fechaentregacotizacion:this.objetoData.data.fechaentregacotizacion,
      fechaentregapactada:this.objetoData.data.fechaentregapactada,
      fechasalida:this.objetoData.data.fechasalida,
      id_cliente:this.objetoData.data.id_cliente,
      cliente:this.objetoData.data.cliente,
      nit:this.objetoData.data.nit,
      direccion:this.objetoData.data.direccion,
      correo:this.objetoData.data.correo,
      telefono:this.objetoData.data.telefono,
      autoriza:this.objetoData.data.autoriza,
      id_formato:this.objetoData.data.id_formato,
      prioridad:this.objetoData.data.id_prioridad,
      solicitud:this.objetoData.data.solicitud,
      tag:this.objetoData.data.tag,
      ubicacion:this.objetoData.data.ubicacion,
      usuarioentregacampo:this.objetoData.data.usuarioentregacampo,
      usuarioentregataller:this.objetoData.data.usuarioentregataller,
      usuariorecibecampo:this.objetoData.data.usuariorecibecampo,
      usuariorecibetaller:this.objetoData.data.usuariorecibetaller
    });

    this.cargarsecciones(this.objetoData.data.id_formato);
  }

  datosFormato={
    opc:'',
    vID:0,
    vIDSECCION:0,
    vIDFORMATO:0
  }

  cargarsecciones(idFormato : any){
    this.datosFormato.opc='SEC-FORMATO';
    this.datosFormato.vIDFORMATO=idFormato;

    this.restService.getOrdenes(this.datosFormato).subscribe(respuesta=>{
      this.listSecciones=respuesta;
      this.secciones=this.listSecciones.body[0];
    })

    this.datosFormato.opc='CAMPOS-FORMATO';
    this.datosFormato.vIDFORMATO=idFormato;

    this.restService.getOrdenes(this.datosFormato).subscribe(respuesta=>{
      this.listCampos=respuesta;
      this.campos=this.listCampos.body[0];

      console.log('CAMPOS',this.campos);
    })

  }

  getSeccionesConCampos(): Observable<Seccion[]> {
    return forkJoin({
      secciones: this.secciones,
      campos: this.campos
    }).pipe(
      map(({ secciones, campos }) => {
        return secciones.map(seccion => ({
          ...seccion,
          campos: campos.filter(campo => campo.id_seccion === seccion.id)
        }));
      })
    );
  }

  secci:any;

  cargarDetalleOrden(){

  }

  async guardarOrden(){


  }

  regresar(){
    this.router.navigateByUrl('/produccion/produccion');
  }

}
