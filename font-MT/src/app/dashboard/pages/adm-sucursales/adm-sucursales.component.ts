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
  }

  cargarClientes(){
    this.RestService.getAllClientes().subscribe((data: any) => {
      this.clientes = data;
    });
  }

  regresar() {
    this.dialogRef.close();
  }

  guardarSucursal(){

  }

}
