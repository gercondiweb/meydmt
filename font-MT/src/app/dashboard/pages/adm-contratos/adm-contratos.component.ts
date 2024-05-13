import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../services';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { TabladinamicaComponent } from '../../../shared/components/tabladinamica/tabladinamica.component';

@Component({
  selector: 'app-adm-contratos',
  standalone: false,
  templateUrl: './adm-contratos.component.html',
  styleUrl: './adm-contratos.component.css'
})
export class AdmContratosComponent implements OnInit{
  accion : any;

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

  @ViewChild(MatTable) table!: MatTable<any>;

  columnas: string[] = ['id','Descripcion', 'fechainicio', 'fechafin', 'ans', 'vhh'];
  dataSource = new MatTableDataSource<any>();

  constructor(

    private router: Router,
    private route: ActivatedRoute,
    private restService: RestService,
    private formBuilder: FormBuilder) { }

    public formContrato !: FormGroup;
    public formServContrato!: FormGroup;

    public contratoSeleccionado : number = 0;

  ngOnInit(): void {
      this.accion = this.route.snapshot.paramMap.get('accion');

      this.cargarServicios();
      this.cargarServiciosContrato();
      this.cargarClientes();

      this.formContrato= this.formBuilder.group({
        id : ['',[Validators.required]],
        id_cliente : ['',[Validators.required]],
        fechainicio : ['',[Validators.required]],
        fechafin : ['',[Validators.required]],
        responsable : ['',[Validators.required]],
        telefono: ['',[Validators.required]],
        clausulas: ['',[Validators.required]],
        observaciones: ['',[Validators.required]],
        activo:['',[Validators.required]]
      });

      this.formServContrato= this.formBuilder.group({
        id : ['0',[Validators.required]],
        id_contrato : ['',[Validators.required]],
        id_servicio : ['',[Validators.required]],
        fechainicio : [''],
        fechafin : [''],
        ans : ['', [Validators.required]],
        vhh : ['', [Validators.required]],
        activo:[0,[Validators.required]]
      });

  }

  cargarServicios(){
    this.restService.getMaestros(this.consultaSrv).subscribe((data: any) => {
      this.listServicios = data;
      this.lServicios = this.listServicios.body[0];
      //this.dataSource.data = this.listServicios.body[0];
      console.log(this.listServicios.body[0])
    });
  }

  cargarServiciosContrato(){
    this.restService.getContratos(this.consultaSrvContrato).subscribe((data: any) => {
      this.listServiciosContrato = data;
      this.serviciosContrato = this.listServiciosContrato.body[0];

      //this.dataSource.data = this.listServiciosContrato.body[0];
      console.log(this.listServiciosContrato.body[0])
    });
  }

  cargarClientes(){
    this.consultaSrv.opc = 'CLI';
    this.restService.getMaestros(this.consultaSrv).subscribe((data: any) => {
      this.listClientes = data;
      this.clientes = this.listClientes.body[0];
      console.log(this.listServicios.body[0])
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
      this.table.renderRows();
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

}
