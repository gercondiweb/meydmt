import { Ordenes } from './../produccion/produccion.component';
import { SelectionModel } from '@angular/cdk/collections';
import { Campo, Seccion } from './../adm-produccion/adm-produccion.component';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSharingService } from '@/app/dashboard/services';
import { ProdrestserviceService } from './../../services/prodrestservice.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { lastValueFrom, catchError } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { LoadingService } from '@/app/shared/services/loading.service';
import { AdmSeccionComponent } from '../adm-seccion/adm-seccion.component';
import { AdmCamposComponent } from '../adm-campos/adm-campos.component';

@Component({
  selector: 'app-adm-configformato',
  templateUrl: './adm-configformato.component.html',
  styleUrl: './adm-configformato.component.css'
})
export class AdmConfigformatoComponent implements OnInit {

  private readonly loadingServer = inject(LoadingService);
  public formSeccionesCampos!: FormGroup;
  accion : any;
  param1!: string;
  param2!: string;

  objetoData: any;

  public idFormato:any;

  vFormato: any;
  listFormatos: any[]=[];

  vSeccion: any;
  listSecciones: any[]=[];

  vCampo: any;
  listCampos: any[]=[];

  vPropiedad: any;
  listPropiedades: any[]=[];

  consultaformato={
    opc:'ALL',
    vID:0
    
  }

  gDatosFormato={
    opc:'SVCAMPOFORMATO',
    vSeccion :'',
    vCampo :'',
    vOrden :'',
    vPropiedades :'',
    vIDFormato: 0,
    vIDCampo: 0
  }

  

  public formFormato !: FormGroup;
  public listDatos: any []=[];
  public formatoSeleccionado : number = 0;

  constructor(
    private dataSharingService: DataSharingService,
    private router: Router,
    private route: ActivatedRoute,
    private  ProdrestserviceService : ProdrestserviceService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog) { }

  ngOnInit(): void {

    this.formSeccionesCampos = this.formBuilder.group({
      secciones: this.formBuilder.array([], Validators.required),
      campos: this.formBuilder.array([], Validators.required) ,
      ordenes: this.formBuilder.array([], Validators.required) 
       });

    this.accion = this.route.snapshot.paramMap.get('accion') || '';

    this.formFormato = this.formBuilder.group({
      id: [0],
      formato : ['',[Validators.required]],
      descripcionformato : ['',[Validators.required]],
      activo : [1,[Validators.required]]
    });

    //console.log(this.accion)

    if(this.accion === "Editar"){

      this.cargarDatosFormato();
      this.formFormato.controls['formato'];
      this.formFormato.get('id')?.setValue(this.objetoData.data.id);
      this.formatoSeleccionado = this.objetoData.data.id;
      this.cargarSeccionFormato();
      this.cargarCampoFormato();
      this.cargarPropiedadFormato();

    }else{
      this.formFormato.get('id')?.setValue(0);
      this.formatoSeleccionado = 0;
      this.cargarSeccionFormato();
      this.cargarCampoFormato();
      this.cargarPropiedadFormato();
    }

  }

  agregarOrden( event : Event ,index: number) {
    const input = event.target as HTMLInputElement;
    const { value } = input;
    this.filas[index].orden = value;
  }

  cargarDatosFormato(){
    this.param1 = this.dataSharingService.getParam1();
    this.param2 = this.dataSharingService.getParam2();
    this.objetoData = this.dataSharingService.getData();
    this.idFormato = this.objetoData.data.Id;

    console.log(this.objetoData);
  
    this.formFormato.patchValue({
      formato: this.objetoData.data.formato,
      descripcionformato: this.objetoData.data.descripcionformato,
      activo: this.objetoData.data.Activo
    });
    console.log(this.formFormato.value);

     this.consultaformato.opc='CAMPO-FORMATO';
     this.consultaformato.vID=this.objetoData.data.id;
     console.log(this.consultaformato)
    this.ProdrestserviceService.getFormatos(this.consultaformato).subscribe(respuesta => {
      this.filas = respuesta.body[0];
      console.log('VER',this.filas);
    }); 
  }



  cargarSeccionFormato(){
    const   consultaservicio={
      opc:'SECCIONES',
    }
    this.ProdrestserviceService.getMaestros(consultaservicio).subscribe(respuesta=>{
      this.vSeccion = respuesta.body[0];
      this.listSecciones  = this.vSeccion;
      console.log('SECCION-CargarData');

      console.log(respuesta);
    })

  }
  cargarPropiedadFormato(){
    const   consultaservicio={
      opc:'PROPIEDAD',
    }
    this.ProdrestserviceService.getPropiedades(consultaservicio).subscribe(respuesta=>{
      this.vPropiedad = respuesta.body[0];
      this.listPropiedades  = this.vPropiedad;
      console.log('PROPIEDADES-CargarData');

      console.log(respuesta);
    })

  }
  cargarCampoFormato(){
    const  consultacampo={
      opc:'CAMPOPROP',
    }

    this. ProdrestserviceService.getMaestros(consultacampo).subscribe(respuesta=>{
      this.vCampo = respuesta.body[0];
      this.listCampos = this.vCampo;

      console.log('CAMPOS-CargarData');

      console.log(respuesta);
    })

  }
 

  regresar(){
    this.router.navigateByUrl('/produccion/formatos');
  }


  agregarSeccion(){
    const data = this.dataSharingService.getData();

    const dialogRef = this.dialog.open(AdmSeccionComponent, {
      disableClose: true,
      autoFocus: true,
      closeOnNavigation : false,
      width : '900px',
      data: {
        tipo: 'Crear',
        data: data
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        console.log(`Dialog result: ${result}`);
        this.listSecciones.push(result);
      }
    });
  }

agregarCampos(){
  const data = this.dataSharingService.getData();

  const dialogRef = this.dialog.open(AdmCamposComponent, {
    disableClose: true,
    autoFocus: true,
    closeOnNavigation : false,
    width : '900px',
    data: {
      tipo: 'Crear',
      data: data
    }

  });

  dialogRef.afterClosed().subscribe(result => {
    if(result !== undefined){
      console.log(`Dialog result: ${result}`);
      this.listCampos.push(result);
    }
  });
}

async guardarFormato(){

  try{

    this.loadingServer.show();
    const formato = await lastValueFrom(this.ProdrestserviceService.crearFormato(this.formFormato.value));

      this.formatoSeleccionado = formato.id;
      this.formFormato.get('id')?.setValue( this.formatoSeleccionado );
      this.formFormato.patchValue({
        formato: formato.formato,
        descripcionformato: formato.descripcionformato,
        id: formato.id,
        ...this.formFormato.value
      });

    this.dataSharingService.setParams(formato.id,formato.formato, formato);

    console.log( { formato });
    console.log( this.formFormato.value );
  }catch(e){
    console.log(e);
  }finally{
    this.loadingServer.hidden();
  }
}

//CAMPO FORMATO
seccionSeleccionada: string | null = null;
camposSeleccionados: string[] = [];
filas: { seccion: string; nombrecampo: string; orden: string }[] = [];
seleccionarSeccion(seccion: string) {
  this.seccionSeleccionada = seccion;
}

seleccionarCampo(nombrecampo: string, event: Event) {
  const checkbox = event.target as HTMLInputElement;
  if (checkbox.checked) {
    this.camposSeleccionados.push(nombrecampo);
  } else {
    this.camposSeleccionados = this.camposSeleccionados.filter(c => c !== nombrecampo);
  }
}

async guardarCampoFormato() {
  if (this.seccionSeleccionada && this.camposSeleccionados.length > 0) {
    const orden = this.formSeccionesCampos.get('orden')?.value || '';

    this.camposSeleccionados.forEach( (campo, i) => {
      this.filas.push({
        seccion: this.seccionSeleccionada,
        nombrecampo: campo,
        orden: orden
      });
    })


    this.seccionSeleccionada = null;
    this.camposSeleccionados = [];
  } else {
    console.error('Error al procesar la información');
  }
}


async guardarCamposFormato(): Promise<void> {
  if (this.formatoSeleccionado && this.filas.length > 0) {
    try {
      for (const fila of this.filas) {
        const datosFormato = {
          ...fila,
          idFormato: this.formatoSeleccionado,
        };
        console.log('Guardando datos:', datosFormato);

        //this.gDatosFormato.vCampo = datosFormato.campo;
        this.gDatosFormato.vOrden = datosFormato.orden;
        this.gDatosFormato.vSeccion = datosFormato.seccion;
        this.gDatosFormato.vIDFormato= datosFormato.idFormato;

        await lastValueFrom(this.ProdrestserviceService.CrearcampoFormato(this.gDatosFormato));
      }

      console.log('Campos guardados exitosamente');
    } catch (error) {
      console.error('Error al guardar los campos:', error);
    }
  } else {
    console.error('Error al gruardar los datos');
  }
}






}
