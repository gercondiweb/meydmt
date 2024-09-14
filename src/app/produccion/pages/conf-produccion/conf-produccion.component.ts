import { ICampo, IFormato, IPropiedad, ISeccion} from '@/app/shared/types/interfaces/IFormato';
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


@Component({
  selector: 'app-conf-produccion',
  standalone: true,
  imports: [SharedModule,CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './conf-produccion.component.html',
  styleUrl: './conf-produccion.component.css'
})
export class ConfProduccionComponent implements OnInit {
  private readonly loadingServer = inject(LoadingService);
   formatoData = signal<IFormato >({
    formato: '',
    descripcion: '',
    secciones: []
   });
   seccionData = signal<ISeccion>({
    seccion: '',
    descripcion : '',
    campos: []
   });
   campoData = signal<ICampo>({
    id_formato: 0,
    id_seccion : 0,
    id_campo : 0,
    nombrecampo: '',
    orden : '',
    propiedad:[]
   });
   propiedadData = signal<IPropiedad>({
    propiedad: '',
    id_tipopropiedad: 0,
    tipopropiedad:''
   });

   seleccionSeleccionada = signal<number>(-1);



  @Input() showModal = signal<boolean>(false);
  @Input() showmodal = signal<boolean>(false);
  @Input() Modal = signal<boolean>(false);
  @Input() Show = signal<boolean>(false);
  @Input() Mod = signal<boolean>(false);

  options = signal<{ value: string, name: string}[]>([{ value: '0', name: 'Seleccione'}]);

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
  });
}

  datosCMaestro={
    opc : ''
  }

  listSecciones : any;
  secciones : any[];

  listCampos : any;
  campos : any[];

  constructor(
    private dataSharingService: DataSharingService,
    private router: Router,
    private route: ActivatedRoute,
    private  ProdrestserviceService : ProdrestserviceService,
    private formBuilder: FormBuilder
   ) { 
    this.formFormato = this.formBuilder.group({
      seccion: ['',[Validators.required]], 
      descripcion:['',[Validators.required]],
      formato:['',[Validators.required]],
      descripcionformato:['',[Validators.required]],
      propiedad:['',[Validators.required]],
      id_formato: [null],
      id_campo: [null],
     });
   }


  cargarMaestros(){
    this.datosCMaestro.opc = 'CAMPOS';
      this.ProdrestserviceService.getMaestros(this.datosCMaestro).subscribe(respuesta=>{
        this.listCampos=respuesta;
        this.campos=this.listCampos.body[0];
      })

      this.datosCMaestro.opc ='SECCIONES';
      this.ProdrestserviceService.getMaestros(this.datosCMaestro).subscribe(respuesta=>{
        this.listSecciones=respuesta;
        this.secciones=this.listSecciones.body[0];
      })
  }


  //Guardar secciones
 async guardarSeccion(){
    try {
      this.loadingServer.show();

      this.formatoData.update( (valueOld) => {
        const formato = valueOld as IFormato;
        if( !formato.secciones ) formato.secciones = [];
        formato.secciones.push(this.seccionData() as ISeccion)
        return formato;
      })
  
     // const seccion = await lastValueFrom(this.ProdrestserviceService.crearSeccion(this.formFormato.value));
  /* 
      this.formFormato.patchValue({
        seccion: seccion.seccion, 
        descripcion: seccion.descripcion 
      });
  
      this.dataSharingService.setParams(seccion.id, seccion.seccion, seccion.descripcion);
  
      console.log('Sección guardada correctamente:', seccion); */
      //console.log('Formulario actualizado:', this.formFormato.value);
    } catch (error) {
      console.error('Error al guardar la sección:', error);
    } finally {
      this.loadingServer.hidden();
    }
  }
//Guardar Campos
guardarCampo() {
  console.log('Datos del formato:', this.formatoData());
  let seleccionIndex = this.seleccionSeleccionada();
  console.log('Índice seleccionado:', seleccionIndex);
  
  this.formatoData.update((valueOld) => {
    const formato = valueOld as IFormato;
    console.log('Datos del formato antes de la actualización:', formato);
    if (!formato.secciones) {
      formato.secciones = [];
    }
    if (seleccionIndex === -1) {
      const nuevaSeccion: ISeccion = {
        seccion: 'Nueva Sección', 
        descripcion: 'Descripción de la nueva sección',
        campos: []
      };
      formato.secciones.push(nuevaSeccion);
      seleccionIndex = formato.secciones.length - 1;
    } else {
      if (seleccionIndex < 0 || seleccionIndex >= formato.secciones.length) {
        console.error('Índice de sección no válido');
        return formato;
      }
    }

    if (!formato.secciones[seleccionIndex].campos) {
      formato.secciones[seleccionIndex].campos = [];
    }
    formato.secciones[seleccionIndex].campos.push(this.campoData() as ICampo);
    console.log('Datos del formato después de la actualización:', formato);
    return formato;
  });
}



// Guardar propiedad 
async guardarPropiedad() {
  try {
    this.loadingServer.show();

    this.formatoData.update((valueOld) => {
      const formato = valueOld as IFormato;

      formato.secciones.forEach(seccion => {
        seccion.campos.forEach(campo => {
          
          if (!Array.isArray(campo.propiedad)) {
            campo.propiedad = []; 
          }
          
          campo.propiedad.push(this.propiedadData() as IPropiedad);
        });
      });

      return formato;
    });
  } finally {
    this.loadingServer.hidden();
  }
}



  //Guardar primer parte del formato
  public guardarFormatoTemp(){
    console.log(this.formatoData())
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
  
}
