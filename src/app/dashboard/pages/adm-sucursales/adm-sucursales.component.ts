import { Component, Inject, inject } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {  } from '@angular/material';
import { RestService } from '../../../dashboard/services/services/rest.service';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { DataSharingService } from '../../services';

@Component({
  selector: 'app-adm-sucursales',
  templateUrl: './adm-sucursales.component.html',
  styleUrl: './adm-sucursales.component.css'
})
export class AdmSucursalesComponent {

  public clientes: any;
  readonly dialogRef = inject(MatDialogRef<AdmSucursalesComponent>);
  public data = inject<any>(MAT_DIALOG_DATA);


  result : any;
  titulo : string ='';

  isFormValid: boolean = false;

  public formSucursales!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private RestService:RestService,
    private DatoDemograf: DataSharingService
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

    this.formSucursales.patchValue({
      id: this.data.data.Id,
      nit: this.data.data.Nit,
      nombre : this.data.data.nombre,
      id_ciudad : this.data.data.ciudad,
      direccion : this.data.data.direccion,
      id_pais : this.data.data.pais,
      zip : this.data.data.zip,
      telefono : this.data.data.vhh,
      id_cliente : this.data.data.id_cliente,
      activo:this.data.data.activo
    });
  }

  cargarDatosCliente(){
    //console.log(this.data.data)
    this.formSucursales.get('nit')?.disable;

    if (this.data.data.data.Id > 0){
      this.formSucursales.patchValue({
        id : 0,
        nit: this.data.data.data.Nit,
        id_cliente : this.data.data.data.Id,
        activo:1
      })
    }else{
      this.formSucursales.patchValue({
      id : 0,
      nit: this.DatoDemograf.getParam2,
      id_cliente : this.DatoDemograf.getParam1,
      activo:1
    })
  }

    //console.log(this.formSucursales.value)
  }

  regresar() {
    //console.log(this.result);
    this.dialogRef.close(this.result);
  }

  onValidationStatusChanged(isValid: boolean){
    this.isFormValid = isValid;
  }

  async guardarSucursal(){
    if(this.isFormValid){


      this.formSucursales.get('id_pais').setValue(this.DatoDemograf.getPais());
      this.formSucursales.get('zip').setValue(this.DatoDemograf.getZip());
      this.formSucursales.get('id_ciudad').setValue(this.DatoDemograf.getCiudad());
      this.formSucursales.get('id_departamento').setValue(this.DatoDemograf.getDepartamento());

      console.log(this.formSucursales.value);

    try{
      const sucursal = await lastValueFrom(this.RestService.sucursales(this.formSucursales.value));
      this.result = sucursal.body;
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

  }else{
    await Swal.fire({
      position: "center",
      icon: "warning",
      title: "Todos los campos son obligatorios",
      showConfirmButton: false,
      timer: 3000
    });
  }
    this.regresar();

  }

}
