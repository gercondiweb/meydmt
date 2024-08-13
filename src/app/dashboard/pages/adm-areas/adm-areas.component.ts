import { Component, Inject } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RestService } from '../../../dashboard/services/services/rest.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-adm-areas',
  standalone: false,
  templateUrl: './adm-areas.component.html',
  styleUrl: './adm-areas.component.css'
})
export class AdmAreasComponent {

  public clientes: any;

  public formAreas!: FormGroup;

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
    this.dialogRef.close();
  }

 async guardarArea(){
  try{
    this.formAreas.get('id_sucursal')?.setValue(this.data.idSucur);

    const area = await lastValueFrom(this.RestService.areas(this.formAreas.value));



  }catch{

  }

  this.regresar();

  }


}
