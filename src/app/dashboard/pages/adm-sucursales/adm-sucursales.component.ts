import { Component, Inject, inject } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {  } from '@angular/material';
import { RestService } from '../../../dashboard/services/services/rest.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-adm-sucursales',
  templateUrl: './adm-sucursales.component.html',
  styleUrl: './adm-sucursales.component.css'
})
export class AdmSucursalesComponent {

  public clientes: any;
  readonly dialogRef = inject(MatDialogRef<AdmSucursalesComponent>);
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
      nit:[''],
      nombre : ['',[Validators.required]],
      ciudad : ['',[Validators.required]],
      direccion : ['',[Validators.required]],
      email : ['',[Validators.required]],
      telefono : ['',[Validators.required]],
      id_pais : ['',[Validators.required]],
      zip : [''],
      id_ciudad : ['',[Validators.required]],
      id_departamento : ['',[Validators.required]],
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
      nit: this.data.data.Nit,
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
    console.log(this.data.data)
    this.formSucursales.patchValue({
      id : 0,
      nit: this.data.data.data.Nit,
      id_cliente : this.data.data.data.Id,
      activo:1
    })
    console.log(this.formSucursales.value)
  }

  regresar() {
    this.dialogRef.close();
  }

  async guardarSucursal(){
    try{
      const sucursal = await lastValueFrom(this.RestService.sucursales(this.formSucursales.value));
    }catch{

    }

    this.regresar();

  }

}
