import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdmSucursalesComponent } from '../adm-sucursales/adm-sucursales.component';
import { MatDialog } from '@angular/material/dialog';
import { AdmAreasComponent } from '../adm-areas/adm-areas.component';

@Component({
  selector: 'app-adm-cliente',
  standalone: false,
  templateUrl: './adm-cliente.component.html',
  styleUrl: './adm-cliente.component.css'
})
export class AdmClienteComponent implements OnInit {


  public formCliente !: FormGroup;

  constructor(

    private router: Router,
    private route: ActivatedRoute,
    private restService: RestService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.formCliente = this.formBuilder.group({
      nit : ['',[Validators.required]],
      cliente : ['',[Validators.required]],
      direccion : ['',[Validators.required]],
      email : ['',[Validators.required]],
      telefono : ['',[Validators.required]],
      ciudad : ['',[Validators.required]],
      pais : ['',[Validators.required]],
      zip : ['',],
      id_cliente : ['',[Validators.required]],
      activo : [1,[Validators.required]],
    });

  }

  public clienteSeleccionado : number = 0;

  cargarDatosCliente(idCliente: number){
    //todo: tomar el id del cliente y lanzar la busqueda de los datos de espcialidades y documentos
  }

  guardarCliente(){

  }

  agregarSucursal(){
    const dialogRef = this.dialog.open(AdmSucursalesComponent, {
      disableClose: true,
      autoFocus: true,
      closeOnNavigation : false,
      width : '900px',
      data: {
        tipo: 'Crear',
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  agregarArea(){
    const dialogRef = this.dialog.open(AdmAreasComponent, {
      disableClose: true,
      autoFocus: true,
      closeOnNavigation : false,
      width : '900px',
      data: {
        tipo: 'Crear',
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
