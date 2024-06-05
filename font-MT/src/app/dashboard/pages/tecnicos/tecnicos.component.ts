import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../services';
import { MatTableDataSource } from '@angular/material/table';
import { ModalComponent } from '../tickets/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { FrmdinamicmodalComponent } from '../../../shared/components/frmdinamicmodal/frmdinamicmodal.component';

@Component({
  selector: 'app-tecnicos',
  standalone: false,
  templateUrl: './tecnicos.component.html',
  styleUrl: './tecnicos.component.css'
})
export class TecnicosComponent implements OnInit{
  titulo = ['Tecnicos'];
  colTecnicos:string[] = ['foto','numerodocumento','nombre','apellido'];
  dsTecnicos = new MatTableDataSource<any>();

  colEspecialidades: string[] = ['id','especialidad', 'activo'];
  dataSourceEspec = new MatTableDataSource<any>();

  colDocuments:string[] = ['documento','numerodocumento','fechaemision','fechavencimiento','observaciones'];
  dataSourceDocs = new MatTableDataSource<any>();

  lDocumentos : any;
  documentos :any[]=[];


  lEspecialidades : any;
  especialidades:any[]=[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private restService: RestService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog ) { }

  public formTecnicos!: FormGroup;
  public formDocumentos!: FormGroup;
  public formEspecialidades!: FormGroup;



  ngOnInit(): void {
    this.cargarTecnicos();

    this.formTecnicos = this.formBuilder.group({
      numerodocumento : ['',[Validators.required]],
      nombre : ['',[Validators.required]],
      apellido : ['',[Validators.required]],
      numid : ['',[Validators.required]],
      direccion : ['',[Validators.required]],
      email : ['',[Validators.required, Validators.email]],
      telefono : ['',[Validators.required]],
      tiposangre : ['',[Validators.required]],
      activo : [1,[Validators.required]],
      foto : ['',[Validators.required]]
    })

    this.formDocumentos = this.formBuilder.group({
      id : ['',[Validators.required]],
      id_tecnico : ['',[Validators.required]],
      id_documento : ['',[Validators.required]],
      numerodocumento : ['',[Validators.required]],
      fechaemision : ['',[Validators.required]],
      fechavencimiento : ['',[Validators.required]],
      observaciones : ['',[Validators.required]]
    })

    this.formEspecialidades = this.formBuilder.group({
      id : ['',[Validators.required]],
      id_tecnico : ['',[Validators.required]],
      id_especialidad : ['',[Validators.required]],
      fechaemision : ['',[Validators.required]],
      fechavencimiento : ['',[Validators.required]],
      observaciones : ['',[Validators.required]]
    })
  }

  buscar(){
    //llamamos el modal y guardamos el id del tecnico seleccionado
    const dialogRef = this.dialog.open(FrmdinamicmodalComponent, {
      disableClose: true,
      autoFocus: true,
      closeOnNavigation : false,
      width : '900px',
      data: {
        tipo: 'Buscar',
        vDatasource: this.dsTecnicos
      }

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

    // si lo encontramos armamos la consulta de especialidades y documentos con el id del tecnico
    this.consultaDoc.vIDTECNICO = 1;
    this.cargarDocumentos();

    this.consultaEsp.vIDTECNICO = 1;
    this.cargarEspecialidades();

  }

  guardar(){

  }

  consultaTec = {
    opc : 'TCN'
  }

  cargarTecnicos() {
    this.restService.getMaestros(this.consultaTec).subscribe(respuesta=>{
    this.lDocumentos = respuesta;
    this.dsTecnicos = this.lDocumentos.body[0];
    //this.dataSource.data = this.listServicios.body[0];

  });

  }

  consultaDoc = {
    opc : 'SLC-DOC',
    vID : 0,
    vIDTECNICO : 0,
    vActivo : 0
  }

  cargarDocumentos() {
    this.restService.getDocumentosTecnico(this.consultaDoc).subscribe((data: any) => {
    this.lDocumentos = data;
    this.documentos = this.lDocumentos.body[0];
    //this.dataSource.data = this.listServicios.body[0];
    console.log(this.lDocumentos.body[0])
  });

  }

  consultaEsp = {
    opc : 'SLC-TCN',
    vID : 0,
    vIDTECNICO : 0,
    vActivo : 0
  }

  cargarEspecialidades() {
    this.restService.getEspecialidadesTecnico(this.consultaEsp).subscribe((data: any) => {
      this.lEspecialidades = data;
      this.especialidades = this.lEspecialidades.body[0];
      //this.dataSource.data = this.listServicios.body[0];
      console.log(this.lDocumentos.body[0])
    });
  }



  addEspecialidad(){
    const dialogRef = this.dialog.open(FrmdinamicmodalComponent, {
      disableClose: true,
      autoFocus: true,
      closeOnNavigation : false,
      width : '900px',
      data: {
        tipo: 'Crear'
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  addDocument(){

  }

}


