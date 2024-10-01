import { DataSharingService } from '@/app/dashboard/services';
import { Component, OnInit, input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdrestserviceService } from '../../services/prodrestservice.service';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin, lastValueFrom, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import  moment from 'moment'
import Swal from 'sweetalert2';

export interface Campo {
  id: string;
  id_seccion: string;
  nombre: string;
  tipo: string;
}

export interface Seccion {
  id: string;
  secciones: string;
  campos: Campo[]; // Relacionar los campos de cada sección
}

export interface datosOrden {
  idCampoFormato : number,
  idPropiedad : number,
  valor : any
}

@Component({
  selector: 'app-adm-produccion',
  templateUrl: './adm-produccion.component.html',
  styleUrls: ['./adm-produccion.component.css']
})
export class AdmProduccionComponent implements OnInit {

  frmCabeceraOrden: FormGroup;
  frmDetalleOrden: FormGroup;

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

  consultaSrv={
    opc:'ESTPROD'
  }

  consultaFormato={
    opc:'',
    vID:0
  }

  listPrioridad : any;
  prioridad : any[];

  listFormatos : any;
  formatos : any[];

  listSecciones : any;
  secciones : any[];

  listClientes : any;
  lClientes : any[];

  listCampos : any;
  campos : any[];

  lCamposC : any;
  camposC : any[];

  listValCampos : any;
  valCampos : any[];

  listPropieCampo:any;
  propieCampo:any[];

  listEstados: any; lEstado:any;

  //este arreglo se alimentara de los cambios que realice el usuario en las propiedades de los campos
  listDatosModificados : any[] = [];

  constructor(
    private dataSharingService: DataSharingService,
    private router: Router,
    private route: ActivatedRoute,
    private restService : ProdrestserviceService,
    private fb: FormBuilder,
    public dialog: MatDialog) { }

  ngOnInit() {

    this.frmCabeceraOrden = this.fb.group({
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
      celular:[],
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

    this.frmDetalleOrden = this.fb.group({});

    this.accion = this.route.snapshot.paramMap.get('accion') || '';

    this.cargarMaestros();

    if(this.accion === "Editar"){
      this.activarSecciones = true;

      this.frmCabeceraOrden.get('id_formato').disable();

      this.cargarOrden();

      this.cargarDetalleOrden();


    }else{
      this.crearOIT();
      this.frmCabeceraOrden.get('id')?.setValue(0);
    }

    this.frmCabeceraOrden.get('OIT').disable();


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

      this.consultaFormato.opc='CLI'; //lee los campos del formato

      this.restService.getMaestros(this.consultaFormato).subscribe(respuesta=>{
        this.lClientes=respuesta.body[0];

      })
  }

  cargarOrden(){
    this.param1 = this.dataSharingService.getParam1();
    this.param2 = this.dataSharingService.getParam2();
    this.objetoData = this.dataSharingService.getData();

    console.log(this.objetoData)

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
      celular:'',
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

  consecutivoOit: any;

  async crearOIT(){
    this.datosFormato.opc='LAST-CONSECUT';
    const idorden = await lastValueFrom(this.restService.getOrdenes(this.datosFormato));

    console.log(idorden);

    let numero = idorden.body[0][0].id + 1;

    numero = numero.toString().padStart(4,'0');

    const mesActual= moment().format('MM');
    const anioActual=moment().format('YYYY');

    console.log(numero);

    this.consecutivoOit = `${numero}-${mesActual}-${anioActual}`;

    this.frmCabeceraOrden.get('OIT').setValue(this.consecutivoOit);

  }

  cargarsecciones(idFormato : any){
    this.datosFormato.opc='SEC-FORMATO';
    this.datosFormato.vIDFORMATO=idFormato;

    this.restService.getOrdenes(this.datosFormato).subscribe(respuesta=>{
      this.listSecciones=respuesta;
      this.secciones=this.listSecciones.body[0];
    })

    this.consultaFormato.opc='CAMPO-FORMATO'; //lee los campos del formato
    this.consultaFormato.vID=idFormato;

    this.restService.getCampos(this.consultaFormato).subscribe(respuesta=>{
      this.lCamposC=respuesta;
      this.camposC=this.lCamposC.body[0];

    })

    this.datosFormato.opc='CAMPOS-FORMATO'; //carga todos los valores de los campos del formato
    this.datosFormato.vIDFORMATO=idFormato;

    this.restService.getOrdenes(this.datosFormato).subscribe(respuesta=>{
      this.listCampos=respuesta;
      this.campos=this.listCampos.body[0];

    })

    this.datosFormato.opc='VALOR-CAMPOS'; //carga todos los valores de los campos del formato
    this.datosFormato.vIDFORMATO=idFormato;
    this.datosFormato.vID = this.objetoData.data.id;

    this.restService.getOrdenes(this.datosFormato).subscribe(respuesta=>{
      this.listValCampos=respuesta;
      this.valCampos=this.listValCampos.body[0];

    })

    this.datosFormato.opc='PROPIE-CAMPO';
    this.datosFormato.vIDFORMATO=idFormato;

    this.restService.getOrdenes(this.datosFormato).subscribe(respuesta=>{
      this.listPropieCampo=respuesta;
      this.propieCampo=this.listPropieCampo.body[1];
      //console.log('respuesta', respuesta.body[1])
    })

    this.restService.getMaestros(this.consultaSrv).subscribe((datacs: any) => {
      this.listEstados = datacs;
      this.lEstado = this.listEstados.body[0];

    });

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

  formatToJSON(formValue: any): any {
    const json = {};
    this.secciones.forEach(seccion => {
      json[seccion.secciones] = {};
      seccion.campos.forEach(campo => {
        json[seccion.secciones][campo.nombre] = formValue[seccion.secciones][campo.nombre];
      });
    });
    return json;
  }

  datoDetalle={
      opc: '',
      vIDORDEN: 0,
      vIDCAMPFORMATO: 0,
      vIDPROPIEDAD: 0,
      vVALOR: ''
  }

  async guardarOrden(){
    const id_Orden = this.objetoData.data.id;
  
    console.log('Datos MOdificados', this.listDatosModificados)
    //Guardamos la cabecera y capturamos el insertid

    //Guardaos el detalle de la orden

    // validar si el campo existe en ordendetalle si existe actualizar el valor sino 
    //insertar un nuevo campo en orden detalle
    this.listDatosModificados.forEach((campos, idexcampo)=>{
      console.log('campos ',campos)
        this.datoDetalle.vIDCAMPFORMATO = campos[1];
        this.datoDetalle.vIDORDEN = id_Orden;
        this.datoDetalle.vIDPROPIEDAD = campos[2];
        this.datoDetalle.vVALOR = campos[3];

        if(campos[0] !== null){
          // actualizar orden detalle
          this.datoDetalle.opc = 'UPD-DORDEN';
          try{
            const campo = lastValueFrom(this.restService.saveOrdenDetalle(this.datoDetalle));
          }catch(e: any){
              console.log(e)       
          }

        }else{
          // insertar nuevo campo en orden detalle
          this.datoDetalle.opc = 'INS-DORDEN';
          try{
            const campo = lastValueFrom(this.restService.saveOrdenDetalle(this.datoDetalle));
          }catch(e: any){
              console.log(e)       
          }
          console.log('Insertar: ', campos[3])
          
        }
    });
    this.listDatosModificados = [];
  }

  regresar(){
    this.router.navigateByUrl('/produccion/produccion');
  }

  selectCli(){
    console.log(this.lClientes);
    this.frmCabeceraOrden.get('nit').setValue(this.lClientes);
  }

  onChange(event: any, idordendetalle:any, campo: any, propiedad: any, escheck: boolean ){
    
    let nuevoValor : any;

    if(escheck){
      nuevoValor = event.target.checked ? 1 : 0;
    } else{
      nuevoValor = event.target.value;
    }
    let nuevoArreglo :any[] = [idordendetalle, campo, propiedad, nuevoValor];

    console.log('id_ordendetalle =',idordendetalle,  'id_campo = ', campo, ' id_propiedad= ', propiedad, ' Nuevo Valor = ', nuevoValor);
    
    // Validamos si en el arreglo existe un campo con el mismo id y propiedad
    // Si existe, actualizamos el valor
    // Si no, agregamos un nuevo objeto al arreglo con el id_campo y propiedad y el nuevo valor
    let item = this.listDatosModificados.find( d => d[0] === campo && d[1] === propiedad);
    if(item){
      item[2] = nuevoValor;
    }else{
     // this.listDatosModificados.push(campo,propiedad,nuevoValor);
      this.listDatosModificados.push(nuevoArreglo);
    }

  }

}
