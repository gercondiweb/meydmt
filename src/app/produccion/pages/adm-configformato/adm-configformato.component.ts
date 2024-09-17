import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSharingService } from '@/app/dashboard/services';
import { ProdrestserviceService } from './../../services/prodrestservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  consultaFormato={
    opc:'FORMATO',
    
  }

  public formFormato !: FormGroup;

  public formatoSeleccionado : number = 0;

  constructor(
    private dataSharingService: DataSharingService,
    private router: Router,
    private route: ActivatedRoute,
    private  ProdrestserviceService : ProdrestserviceService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.accion = this.route.snapshot.paramMap.get('accion') || '';

    this.formFormato = this.formBuilder.group({
      id: [0],
      formato : ['',[Validators.required]],
      descripcion : ['',[Validators.required]],
      activo : [1,[Validators.required]],
    });

    //console.log(this.accion)

    if(this.accion === "Editar"){

      this.cargarDatosFormato();
      this.formFormato.controls['formato'].disable();
      this.formFormato.get('id')?.setValue(this.objetoData.data.id);
      this.formatoSeleccionado = this.objetoData.data.id;
      

    }else{
      this.formFormato.get('id')?.setValue(0);
      this.formatoSeleccionado = 0;
    }

  }

  cargarDatosFormato(){
    this.param1 = this.dataSharingService.getParam1();
    this.param2 = this.dataSharingService.getParam2();
    this.objetoData = this.dataSharingService.getData();
    this.idFormato = this.objetoData.data.Id;

    console.log(this.objetoData)

    this.formFormato.patchValue({
      formato: this.objetoData.data.Formato,
      descripcion: this.objetoData.data.Descripcion,
      activo: this.objetoData.data.Activo
    });
    console.log(this.formFormato.value)
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
}
