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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LoadingService } from '@/app/shared/services/loading.service';


@Component({
  selector: 'app-conf-produccion',
  standalone: true,
  imports: [SharedModule,CommonModule, RouterModule],
  templateUrl: './conf-produccion.component.html',
  styleUrl: './conf-produccion.component.css'
})
export class ConfProduccionComponent implements OnInit {
  private readonly loadingServer = inject(LoadingService);
  @Input() showModal = signal<boolean>(false);
  @Input() showmodal = signal<boolean>(false);
  @Input() Modal = signal<boolean>(false);
  @Input() Show = signal<boolean>(false);
  options = signal<{ value: string, name: string}[]>([{ value: '0', name: 'Seleccione'}]);



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
    { value: 'bueno', name: 'Bueno' },
    { value: 'malo', name: 'Malo' },
    { value: 'si', name: 'Si' },
    { value: 'no', name: 'No' },
    { value: 'sellos', name: 'Sellos' },
    { value: 'correo', name: 'Correo' },
  ];

  onDesplegableValueChange(selectedValues: string[]) {
    this.selectedDesplegableValue = selectedValues;
    console.log('Seleccionado:', this.selectedDesplegableValue);
  }

  onSubmit() {
    console.log('Datos enviados', this.selectedDesplegableValue);
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
  console.log(this.formFormato.value)
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
   ) { }


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
//Guardar Campos



// Guardar propiedad 
async guardarPropiedad() {
  try {
    this.loadingServer.show(); 

    this.formFormato.get('id_campo')?.setValue(this.formatoSeleccionado); 

    const propiedad = await lastValueFrom(this.ProdrestserviceService.crearPropiedades(this.formFormato.value));

    this.formFormato.patchValue({
      propiedad: propiedad.campo,
      id_campo: propiedad.id_campo, 
    });

    console.log('Propiedad guardada correctamente:', propiedad);

  } catch (error) {
    console.error('Error al guardar la propiedad:', error);
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
  
}
