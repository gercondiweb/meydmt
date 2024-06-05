import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../services';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { TabladinamicaComponent } from '../../../shared/components/tabladinamica/tabladinamica.component';
import { AdmServiciosComponent } from '../adm-servicios/adm-servicios.component';
import { DataSharingService } from '../../services/services/data-sharing.service';

export interface ElementoTablaDetalle {
  nombre: string;
}

export interface tipoServicio {
  nombre: string;
}
@Component({
  selector: 'app-adm-contratos',
  standalone: false,
  templateUrl: './adm-contratos.component.html',
  styleUrl: './adm-contratos.component.css'
})
export class AdmContratosComponent implements OnInit{
  accion : any;

  param1!: string;
  param2!: string;
  objetoData: any;

  listServicios : any;
  lServicios: any[]=[];

  listServiciosContrato : any;
  //serviciosContrato: any[] = [];
  serviciosContrato!: MatTableDataSource<any,any>;;

  listClientes : any;
  clientes: any[] = [];

  response: any;

  consultaSrv={
    opc:'SERV'
  }

  consultaSrvContrato={
    opc:'SLC-SRV',
    vID: '',
    vIDCLIENTE : null,
    vActivo : null,
    vFECHAINI :'',
    vFECHAFIN :''
  }

  columnas: string[] = ['id','descripcion', 'fechainicio', 'fechafin', 'ans', 'vhh', 'activo'];
  dataSource = new MatTableDataSource<any>();

  constructor(

    private router: Router,
    private route: ActivatedRoute,
    private restService: RestService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private dataSharingService: DataSharingService,
) { }

    public formContrato !: FormGroup;
    public formServContrato!: FormGroup;

    public contratoSeleccionado : number = 0;

  ngOnInit(): void {
      this.accion = this.route.snapshot.paramMap.get('accion') || '';


      this.cargarClientes();

      this.formContrato= this.formBuilder.group({
        id : ['',[Validators.required]],
        id_cliente : ['',[Validators.required]],
        fechainicio : ['',[Validators.required]],
        fechafin : ['',[Validators.required]],
        responsable : ['',[Validators.required]],
        telefono: ['',[Validators.required]],
        email:['',[Validators.email]],
        clausulas: ['',[]],
        observaciones: ['',[]],
        activo:['',[Validators.required]]
      });

      if(this.accion === "Editar"){
        this.cargarContrato();
        this.formContrato.controls['id'].disable();
        this.formContrato.controls['id_cliente'].disable();
        this.cargarServiciosContrato();
      }

  }

  cargarContrato(){
    this.param1 = this.dataSharingService.getParam1();
    this.param2 = this.dataSharingService.getParam2();
    this.objetoData = this.dataSharingService.getData();

//console.log('objetoData', this.objetoData)

    this.formContrato.patchValue({
      id: this.objetoData.data.CONTRATO,
      id_cliente: this.objetoData.data.ID_CLIENTE,
      fechainicio: this.objetoData.data.FECHAINICIO,
      fechafin: this.objetoData.data.FECHAFIN,
      responsable: this.objetoData.data.RESPONSABLE,
      telefono: this.objetoData.data.TELEFONO,
      clausulas: this.objetoData.data.CLAUSULAS,
      observaciones: this.objetoData.data.OBSERVACIONES,
      activo: this.objetoData.data.ACTIVO
    });

  }

  cargarServiciosContrato(){
      this.consultaSrvContrato.vID=this.objetoData.data.CONTRATO;

      this.restService.getContratos(this.consultaSrvContrato).subscribe((data: any) => {
      this.listServiciosContrato = data;
      this.serviciosContrato = this.listServiciosContrato.body[0];

      //this.dataSource.data = this.listServiciosContrato.body[0];
      console.log('SERVICIOS ',this.listServiciosContrato.body[0])
    });
  }

  cargarClientes(){
    this.consultaSrv.opc = 'CLI';
    this.restService.getMaestros(this.consultaSrv).subscribe((data: any) => {
      this.listClientes = data;
      this.clientes = this.listClientes.body[0];

      console.log('CLIENTES ',this.listClientes.body[0])
    });
  }

  regresar(){
    this.router.navigateByUrl('/dashboard/contratos');
  }

  async guardar(){
    if(this.formContrato.get('id')?.value == ''){
      this.formContrato.get('activo')?.setValue('1');
    }

    try{

      console.log(this.formContrato.value)
      const res = await lastValueFrom(this.restService.crearContratos(this.formContrato.value));

      this.contratoSeleccionado = res.insertId;
      this.formContrato.get('id')?.setValue(res.insertId);
      this.formContrato.get('id')?.enabled;

      //console.log(res)
      this.response = res;
      if(!this.response.error){
        await Swal.fire({
          position: "center",
          icon: "success",
          title: this.response.body,
          showConfirmButton: false,
          timer: 1500
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

  }

  agregarServicio(){

    //TODO: abre el modal y recibe los datos del ervicio
    const param1 = this.dataSharingService.getParam1();
    const param2 = this.dataSharingService.getParam2();
    const data = this.dataSharingService.getData();

console.log(data)

    const dialogRef = this.dialog.open(AdmServiciosComponent, {
      disableClose: true,
      autoFocus: true,
      closeOnNavigation : false,
      width : '900px',
      data: {
        tipo: 'Crear',
        data: data,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  async guardarServCont(){
  try{
    console.log(this.formServContrato.value)

    this.formServContrato.get('id_contrato')?.setValue(this.contratoSeleccionado);
    this.formServContrato.get('activo')?.setValue(1);

    const res = await lastValueFrom(this.restService.serviciosContratos(this.formServContrato.value));
    this.response = res;
    if(!this.response.error){
      await Swal.fire({
        position: "center",
        icon: "success",
        title: this.response.body,
        showConfirmButton: false,
        timer: 1500
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
}

editarServicio(servicio : tipoServicio){

}

eliminarServicio(servicio : tipoServicio){

}

}
