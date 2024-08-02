import { Component, Inject, inject } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {  } from '@angular/material';
import { RestService } from '../../../dashboard/services/services/rest.service';
import { SucursalService } from './service/sucursal.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-adm-sucursales',
  templateUrl: './adm-sucursales.component.html',
  styleUrl: './adm-sucursales.component.css'
})
export class AdmSucursalesComponent {

  public clientes: any;
  readonly dialogRef = inject(MatDialogRef<AdmSucursalesComponent>);
  readonly sucursalService = inject(SucursalService);
  public data = inject<any>(MAT_DIALOG_DATA);
  titulo : string ='';

  public formSucursales!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private RestService:RestService,
  ){}

  ngOnInit(): void {
    this.formSucursales = this.formBuilder.group({
      id :['',],
      nombre : ['',[Validators.required]],
      ciudad : ['',[Validators.required]],
      direccion : ['',[Validators.required]],
      pais : ['',[Validators.required]],
      zip : [''],
      telefono : ['',[Validators.required]],
      id_cliente : ['',[Validators.required]],
      activo : [1,[Validators.required]],
    });


    if(this.data.tipo === 'Editar'){
      this.titulo = 'Editar Sucursal';
      this.cargarDatosSucursal();
    }else{
      this.titulo = 'Agregar Sucursal';
      this.cargarDatosCliente();
    }

  }

  cargarDatosSucursal(){

    this.formSucursales.patchValue({
      id: this.data.data.Id,
      nombre : this.data.data.nombre,
      ciudad : this.data.data.ciudad,
      direccion : this.data.data.direccion,
      pais : this.data.data.pais,
      zip : this.data.data.zip,
      telefono : this.data.data.vhh,
      id_cliente : this.data.data.id_cliente,
      activo:this.data.data.activo
    });
  }

  cargarDatosCliente(){
    this.formSucursales.patchValue({
      id : 0,
      id_cliente : this.data.data.id,
      activo:1
    })
  }

  regresar() {
    this.dialogRef.close();
  }

  async guardarSucursal(){
    await lastValueFrom(this.sucursalService.save(this.formSucursales.value));
  }

}
