import { Component, Inject } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RestService } from '../../../dashboard/services/services/rest.service';

@Component({
  selector: 'app-adm-sucursales',
  standalone: false,
  templateUrl: './adm-sucursales.component.html',
  styleUrl: './adm-sucursales.component.css'
})
export class AdmSucursalesComponent {

  public clientes: any;

  titulo : string ='';

  public formSucursales!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AdmSucursalesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
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

console.log(this.data.tipo)

    if(this.data.tipo === 'Editar'){
      this.titulo = 'Editar Sucursal';
      this.cargarDatosSucursal();
    }else{
      this.titulo = 'Agregar Sucursal';
      this.cargarDatosCliente();
    }

  }

  cargarDatosSucursal(){

    console.log(this.data.data)

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
    console.log(this.data.data)

    this.formSucursales.patchValue({
      id : 0,
      id_cliente : this.data.data.id,
      activo:1
    })
  }

  regresar() {
    this.dialogRef.close();
  }

  guardarSucursal(){

  }

}
