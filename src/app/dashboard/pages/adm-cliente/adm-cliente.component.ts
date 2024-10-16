import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdmSucursalesComponent } from '../adm-sucursales/adm-sucursales.component';
import { MatDialog } from '@angular/material/dialog';
import { AdmAreasComponent } from '../adm-areas/adm-areas.component';
import { DataSharingService } from '../../services/services/data-sharing.service';
import { lastValueFrom, catchError } from 'rxjs';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { LoadingService } from '@/app/shared/services/loading.service';

interface Area {
  id: number;
  nombre: string;
  descripcion: string;
  id_sucursal:number;
  autorizador:string;
  emailautorizador:string;
  telefonoautorizador:string;
}

@Component({
  selector: 'app-adm-cliente',
  templateUrl: './adm-cliente.component.html',
  styleUrl: './adm-cliente.component.css'
})
export class AdmClienteComponent implements OnInit {
  private readonly loadingServer = inject(LoadingService);
  accion : any;
  param1!: string;
  param2!: string;

  objetoData: any;

  public idCliente:any;

  vCliente: any;
  listClientes: any[]=[];

  vSucursal: any;
  listSucursales: any[]=[];

  vArea: any;
  listAreas: any[]=[];

  columnAreas: string[] = ['id', 'nombre', 'autorizador', 'email', 'activo'];
  vCiudad: any;

  listCiudades: any[]=[];

  vPais: any;
  listPaises: any[]=[];

  consultaCliente={
    opc:'SUCUR',
    vIDCLIENTE: 1,
  }

  public formCliente !: FormGroup;

  public clienteSeleccionado : number = 0;

  constructor(
    private dataSharingService: DataSharingService,
    private router: Router,
    private route: ActivatedRoute,
    private restService: RestService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.accion = this.route.snapshot.paramMap.get('accion') || '';

    this.formCliente = this.formBuilder.group({
      id: [0],
      nit : ['',[Validators.required]],
      cliente : ['',[Validators.required]],
      direccion : ['',[Validators.required]],
      email : ['',[Validators.required]],
      telefono : ['',[Validators.required]],
      id_ciudad : ['',[Validators.required]],
      id_pais : ['',[Validators.required]],
      id_departamento : ['',[Validators.required]],
      zip : ['',],
      activo : [1,[Validators.required]],
    });

    //console.log(this.accion)

    if(this.accion === "Editar"){

      this.cargarDatosCliente();
      this.formCliente.controls['nit'].disable();
      this.formCliente.get('id')?.setValue(this.objetoData.data.id);
      this.clienteSeleccionado = this.objetoData.data.id;
      this.cargarSucursalesCliente();
      this.cargarAreasSucursal();

    }else{
      this.formCliente.get('id')?.setValue(0);
      this.clienteSeleccionado = 0;
    }

  }

  cargarDatosCliente(){
    this.param1 = this.dataSharingService.getParam1();
    this.param2 = this.dataSharingService.getParam2();
    this.objetoData = this.dataSharingService.getData();
    this.idCliente = this.objetoData.data.Id;

    console.log(this.objetoData)

    this.formCliente.patchValue({
      nit: this.objetoData.data.Nit,
      cliente: this.objetoData.data.Cliente,
      direccion: this.objetoData.data.Direccion,
      email: this.objetoData.data.Email,
      telefono: this.objetoData.data.Telefono,
      id_ciudad: this.objetoData.data.id_ciudad,
      id_pais: this.objetoData.data.id_pais,
      id_departamento: this.objetoData.data.id_departamento,
      zip: this.objetoData.data.zip,
      id: this.objetoData.data.Id,
      activo: this.objetoData.data.Activo
    });
    console.log(this.formCliente.value)
  }

  cargarSucursalesCliente(){
    this.consultaCliente.opc = 'SUCUR';
    this.consultaCliente.vIDCLIENTE = this.objetoData.data.Id;

    //console.log(this.consultaCliente)

    this.restService.getClientes(this.consultaCliente).subscribe((data: any) => {
      this.vSucursal = data.body[0];
      this.listSucursales = this.vSucursal;
    });

  }

  cargarAreasSucursal(){
    this.consultaCliente.opc = 'AREAS';
    this.consultaCliente.vIDCLIENTE = this.objetoData.data.Id;;

    //console.log(this.consultaCliente)

    this.restService.getClientes(this.consultaCliente).subscribe((data: any) => {
      this.vArea = data.body[0];
      this.listAreas = this.vArea;
    });

  }

  async guardarCliente(){

    try{

      this.formCliente.get('id_pais').setValue(this.dataSharingService.getPais());
      this.formCliente.get('zip').setValue(this.dataSharingService.getZip());
      this.formCliente.get('id_ciudad').setValue(this.dataSharingService.getCiudad());
      this.formCliente.get('id_departamento').setValue(this.dataSharingService.getDepartamento());

      console.log(this.formCliente.value)

      this.loadingServer.show();
      const cliente = await lastValueFrom(this.restService.crearCliente(this.formCliente.value));

        this.clienteSeleccionado = cliente.id;
        this.formCliente.get('id')?.setValue( this.clienteSeleccionado );
        this.formCliente.get('nit')?.disable;
        this.formCliente.patchValue({
          cliente: cliente.cliente,
          direccion: cliente.direccion,
          email: cliente.email,
          telefono: cliente.telefono,
          activo: cliente.activo,
          nit: cliente.nit,
          id: cliente.id,
          ...this.formCliente.value
        });
      //--- Guardamos la info del cliente que se acaba de crear

      this.dataSharingService.setParams(cliente.id,cliente.nit, cliente);

      console.log( { cliente });
      console.log( this.formCliente.value );
     /*  if(!this.response.error){
        await Swal.fire({
          position: "center",
          icon: "success",
          title: this.response.body + ' - ' +  this.clienteSeleccionado,
          showConfirmButton: false,
          timer: 1500
        });
      } */
    }catch(e){
      console.log(e);
    }finally{
      this.loadingServer.hidden();
    }
  }

  agregarSucursal(){
    const data = this.dataSharingService.getData();

    const dialogRef = this.dialog.open(AdmSucursalesComponent, {
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
        this.listSucursales.push(result);
      }
    });
  }

  agregarArea(vId: number){
    const dialogRef = this.dialog.open(AdmAreasComponent, {
      disableClose: true,
      autoFocus: true,
      closeOnNavigation : false,
      width : '900px',
      data: {
        tipo: 'Crear',
        idSucursal: vId
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
      console.log(`Dialog result: ${result}`);
      this.listAreas.push(result);
      }
    });
  }

  editarArea(vID:any, vIdSucur: any){
    const dialogRef = this.dialog.open(AdmAreasComponent, {
      disableClose: true,
      autoFocus: true,
      closeOnNavigation : false,
      width : '900px',
      data: {
        tipo: 'Editar',
        idArea: vID,
        idSucursal: vIdSucur
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  regresar(){
    this.router.navigateByUrl('/dashboard/clientes');
  }
}
