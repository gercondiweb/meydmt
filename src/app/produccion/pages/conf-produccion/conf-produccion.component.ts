import { ICampo, IFormato, IOrden, IPropiedad, ISeccion, ITipoPropiedad} from '@/app/shared/types/interfaces/IFormato';
import { async } from '@angular/core/testing';
import { Seccion } from './../adm-produccion/adm-produccion.component';
import { DataSharingService } from '@/app/dashboard/services';
import { Meta } from './../../../shared/types/interfaces/Ipagination';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ProdrestserviceService } from './../../services/prodrestservice.service';
import { SharedModule } from './../../../shared/modules/shared/shared.module';
import { Component, Input, OnInit, signal, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { lastValueFrom, catchError } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LoadingService } from '@/app/shared/services/loading.service';
import { CreateSeccionComponent } from './create-seccion/create-seccion.component';


@Component({
  selector: 'app-conf-produccion',
  standalone: true,
  imports: [SharedModule,CommonModule, RouterModule, FormsModule, ReactiveFormsModule, CreateSeccionComponent],
  templateUrl: './conf-produccion.component.html',
  styleUrl: './conf-produccion.component.css'
})
export class ConfProduccionComponent implements OnInit {
  private readonly loadingServer = inject(LoadingService);
  options = signal<{ value: string, name: string}[]>([{ value: '0', name: ''}]);
  seccionData = signal<ISeccion>({
    seccion: '',
    descripcion : '',
    campos: []
   });

   formatoData = signal<IFormato >({
    formato: '',
    descripcionformato: '',
    estado: 1
   });

   campoData = signal<ICampo>({
    id_formato: 0,
    id_seccion : 0,
    id_campo : 0,
    nombrecampo: '',
    orden : 0,
    propiedad:[]
   });

   propiedadData = signal<IPropiedad>({
    propiedad: '',
    id_tipopropiedad: 0,
    tipopropiedad:[]
   });

   tipopropiedadData = signal<ITipoPropiedad>({
    tipopropiedad: ''
  });

   ordenData = signal<IOrden>({
    id_formato:0,
    id_seccion: 0,
    ide_campo: 0,
    orden: 0
   });


   seleccionSeleccionada = signal<number>(-1);

  @Input() showModal = signal<boolean>(false);
  @Input() showmodal = signal<boolean>(false);
  @Input() Modal = signal<boolean>(false);
  @Input() Show = signal<boolean>(false);
  @Input() Mod = signal<boolean>(false);


  selecionarSeccion( i : number ){
    if( i === this.seleccionSeleccionada() ) i = -1;
    this.seleccionSeleccionada.update( valueold => i)
  }
  selecionarPropiedad( i : number ){
    if( i === this.seleccionSeleccionada() ) i = -1;
    this.seleccionSeleccionada.update( valueold => i)
  }
  selecionarCampo( i : number ){
    if( i === this.seleccionSeleccionada() ) i = -1;
    this.seleccionSeleccionada.update( valueold => i)
  }
  closed(){
    this.showModal.update( dataOld => false);
  }
  openModal() {
    this.showModal.update( valueOld => true);
  }
  closedModal(){
    this.showmodal.update( dataOld => false);
  }
  opendModal() {
    this.showmodal.update( valueOld => true);
  }
  close(){
    this.Modal.update( dataOld => false);
  }
  open() {
    this.Modal.update( valueOld => true);
  }
  closED(){
    this.Show.update( dataOld => false);
  }
  openshow() {
    this.Show.update( valueOld => true);
  }
  regresar(){
    this.router.navigateByUrl('/produccion/formatos');
  }

  cerrar(){
    this.Mod.update( dataOld => false);
  }
  Selec() {
    this.Mod.update( valueOld => true);
  }

  titulo = ['Propiedades del campo'];
  columnas = ['Nombre','Propiedades'];

  dataSource!: MatTableDataSource<any,any>;



  editar(){
    alert("Editar propiedades del campo");
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectedDesplegableValue: string[] = [];
  desplegableOptions = [
   {},
  ];

  onDesplegableValueChange(selectedValues: string[]) {
    this.selectedDesplegableValue = selectedValues;
  }



  //Cargar datos
  frmCabeceraOrden: FormGroup;
  accion : any;
  param1!: string;
  param2!: string;
  objetoData: any;


  public formFormato !: FormGroup;
  public id_formato:any;
  public formatoSeleccionado : number = 0;


  ngOnInit() {
    this.accion = this.route.snapshot.paramMap.get('accion') || '';

    this.formFormato = this.formBuilder.group({
      seccion: ['',[Validators.required]],
      descripcion:['',[Validators.required]],
      formato:['',[Validators.required]],
      descripcionformato:['',[Validators.required]],
      propiedad:['',[Validators.required]],
      id_formato: [null],
      id_campo: [null],
    });

  if(this.accion === "Editar"){

    this.cargarDatosFormato();
    this.formFormato.controls['id'].disable();
    this.formFormato.get('id_formato')?.setValue(this.objetoData.data.id);
    this.formatoSeleccionado = this.objetoData.data.id_formato;


  }else{
    this.formFormato.get('id')?.setValue(0);
    this.formatoSeleccionado = 0;
  }

}

cargarDatosFormato(){
  this.param1 = this.dataSharingService.getParam1();
  this.param2 = this.dataSharingService.getParam2();
  this.objetoData = this.dataSharingService.getData();
  this.id_formato = this.objetoData.data.id_formato;

  console.log(this.objetoData)

  this.formFormato.patchValue({
    seccion: this.objetoData.data.seccion,
    descripcion: this.objetoData.data.descripcion,
    formato: this.objetoData.data.formato,
    descripcionformato: this.objetoData.data.descripcionformato,
    propiedad: this.objetoData.data.propiedad,
    campo:this.objetoData.data.campo,
    tipopropiedad: this.objetoData.data.tipopropiedad,
  });
}

  datosCMaestro={
    opc : ''
  }

  listSecciones = signal<ISeccion[]>([]);
  secciones : any[];

  listCampos = signal<ICampo[]>([]);
  campos : any[];

  constructor(
    private dataSharingService: DataSharingService,
    private router: Router,
    private route: ActivatedRoute,
    private  ProdrestserviceService : ProdrestserviceService,
    private formBuilder: FormBuilder,
    private _prodrestserviceService:ProdrestserviceService
   ) {
    this.formFormato = this.formBuilder.group({
      seccion: ['',[Validators.required]],
      descripcion:['',[Validators.required]],
      formato:['',[Validators.required]],
      descripcionformato:['',[Validators.required]],
      propiedad:['',[Validators.required]],
      campo:['',[Validators.required]],
      tipopropiedad:['',[Validators.required]],
      id_formato: [null],
      id_campo: [null],
     });

     this.cargarMaestros()
   }


  cargarMaestros(){

    this.datosCMaestro.opc = 'CAMPO-FORMATO';
      this.ProdrestserviceService.getCampos({
        opc: "CAMPO-FORMATO",
        vID: 1
      }).subscribe(  ({ body }) =>{
        this.listCampos.update( listOld => [...body[0]]);
      })

      this.datosCMaestro.opc ='SECCIONES';
      this._prodrestserviceService.getSeccion({opc:'SECCIONES'}).subscribe( ({ body }) =>{
        this.listSecciones.update( listOld => [...body[0]]);
      })
  }


  //Guardar secciones
  async guardarSeccion( seccion : ISeccion ) {
    try {
      this.loadingServer.show();

      //const seccion = this.seccionData() as ISeccion;

      const resultado = await lastValueFrom(this.ProdrestserviceService.crearSeccion(seccion));

      this.formatoData.update((valueOld) => {
        const formato = valueOld as IFormato;
        if (!formato.secciones) formato.secciones = [];
        formato.secciones.push(seccion);
        return formato;
      });

      this.formFormato.patchValue({
        seccion: resultado.seccion,
        descripcion: resultado.descripcion
      });

      this.dataSharingService.setParams(resultado.id, resultado.seccion, resultado.descripcion);

      console.log('Sección guardada correctamente:', resultado);
      console.log('Formulario actualizado:', this.formFormato.value);

    } catch (error) {
      console.error('Error al guardar la sección:', error);
    } finally {
      this.loadingServer.hidden();
    }
  }

//Guardar Campos
async guardarCampo() {
  try {
    this.loadingServer.show();

    const campo = this.campoData() as ICampo;

    const resultado = await lastValueFrom(this.ProdrestserviceService.crearCampos(campo));

    this.seccionData.update((valueOld) => {
      const seccion = valueOld as ISeccion;
      if (!seccion.campos) seccion.campos = [];
      seccion.campos.push(resultado);
      return seccion;
    });

    this.formFormato.patchValue({
      campo: resultado.campo,
      descripcion: resultado.descripcion
    });

    this.dataSharingService.setParams(resultado.id, resultado.campo, resultado.descripcion);

    console.log('Campo guardado correctamente:', resultado);
    console.log('Formulario actualizado:', this.formFormato.value);

  } catch (error) {
    console.error('Error al guardar campo:', error);
  } finally {
    this.loadingServer.hidden();
}
}


// Guardar propiedad
async guardarPropiedad() {
  try {
    this.loadingServer.show();

    const propiedad = this.propiedadData() as IPropiedad;

    this.formatoData.update((valueOld) => {
      const formato = valueOld as IFormato;

      formato.secciones.forEach(seccion => {
        seccion.campos.forEach(campo => {

          if (!Array.isArray(campo.propiedad)) {
            campo.propiedad = [];
          }

          campo.propiedad.push(propiedad);
        });
      });

      return formato;
    });

    const resultado = await lastValueFrom(this.ProdrestserviceService.crearPropiedades(propiedad));

    console.log('Propiedad guardada correctamente:', resultado);

  } catch (error) {
    console.error('Error al guardar la propiedad:', error);
  } finally {
    this.loadingServer.hidden();
  }
}

  //Guardar primer parte del formato
  async  guardarFormato(){
    this.Show.update( valueOld => false );
    try{
        const res = await lastValueFrom( this.ProdrestserviceService.crearFormato(this.formatoData()));
        console.log({res})
        this.formatoData.update( valueOld => res );
    }catch(e){
        console.log('Error al guardar formato');
    }
  }

// Guaradr orden
async guardarOrden() {
  try {
    this.loadingServer.show();

    this.formatoData.update((valueOld) => {
      const formato = valueOld as IFormato;

      if (!formato.orden) formato.orden = [];

      formato.orden.push(this.ordenData() as IOrden);

      return formato;
    });

    const resultado = await lastValueFrom(this.ProdrestserviceService.crearOrden(this.ordenData()));

    console.log('Orden guardado correctamente:', resultado);

  } catch (error) {
    console.error('Error al guardar el orden:', error);
  } finally {
    this.loadingServer.hidden();
  }
}


  //Paginación
  actual = signal<number>(1)
  meta = signal<Meta>({
    page: 0,
    take: 0,
    itemCount: 0,
    pageCount: 0,
    hasNextPage: false,
    hasPreviousPage: false
  });

  loandPagniation(page: number) {
   this.actual.update( pageOld => page );
 }

// Guardar tipo de propiedad
async guardarTipoPropiedad() {
  try {
    this.loadingServer.show();

    const tipoPropiedad = this.tipopropiedadData() as ITipoPropiedad;

    const resultado = await lastValueFrom(this.ProdrestserviceService.crearTipoPropiedades(tipoPropiedad));

    console.log('Tipo de propiedad guardado correctamente:', resultado);

    this.formatoData.update((valueOld) => {
      const formato = valueOld as IFormato;

      if (!formato.secciones) formato.secciones = [];
      formato.secciones.forEach(seccion => {
        seccion.campos.forEach(campo => {
          if (!campo.propiedad) campo.propiedad = [];
          campo.propiedad.forEach(prop => {
            if (prop.id_tipopropiedad === tipoPropiedad.id) {
            }
          });
        });
      });

      return formato;
    });

  } catch (error) {
    console.error('Error al guardar el tipo de propiedad:', error);
  } finally {
    this.loadingServer.hidden();
  }
}

 //Guardar datos
 async guardarDatos() {
  try {
    this.loadingServer.show();

    const seccion = this.seccionData() as ISeccion;
    const campo = this.campoData() as ICampo;

    if (!seccion || !campo) {
      console.error('No se puede guardar los datos: la sección o el campo no existen.');
      return;
    }

    this.formatoData.update((valueOld) => {
      const formato = valueOld as IFormato;
      if (!formato.secciones) formato.secciones = [];
      if (!formato.secciones.some(s => s.id === seccion.id)) {
        formato.secciones.push(seccion);
      }
      return formato;
    });

    this.seccionData.update((valueOld) => {
      const secciones = valueOld as ISeccion;
      if (!secciones.campos) secciones.campos = [];
      if (!secciones.campos.some(c => c.id === campo.id)) {
        secciones.campos.push(campo);
      }
      return secciones;
    });

    console.log('Sección y campo guardados correctamente.');
  } catch (error) {
    console.error('Error al guardar los datos:', error);
  } finally {
    this.loadingServer.hidden();
  }
}


}
