import { Component, Inject } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RestService } from '../../../dashboard/services/services/rest.service';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adm-areas',
  standalone: false,
  templateUrl: './adm-areas.component.html',
  styleUrl: './adm-areas.component.css'
})
export class AdmAreasComponent {

  public clientes: any;

  public formAreas!: FormGroup;

  result: any;

  constructor(
    public dialogRef: MatDialogRef<AdmAreasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private RestService:RestService,
  ){}

  ngOnInit(): void {
    this.formAreas = this.formBuilder.group({
      id :[''],
      id_sucursal : ['',[Validators.required]],
      nombre : ['',[Validators.required]],
      descripcion : ['',[Validators.required]],
      autorizador : ['',[Validators.required]],
      emailautorizador : ['',[Validators.required]],
      telefonoautorizador : ['',[Validators.required]],
      activo : [1,[Validators.required]],
    });

    this.formAreas.get('id_sucursal')?.setValue(this.data.idSucur);
  }

  cargarSucursales(){

  }

  regresar() {
    this.dialogRef.close(this.result);
  }

 async guardarArea(){
  try{
    this.formAreas.get('id_sucursal')?.setValue(this.data.idSucur);

    const area = await lastValueFrom(this.RestService.areas(this.formAreas.value));
    this.result = area.body;


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

  this.regresar();

  }


}
