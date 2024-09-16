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

  vArea: any;
  listAreas: any[]=[];

  consultaCliente={
    opc:'AREAID',
    vIDCLIENTE: 1,
  }

  constructor(
    public dialogRef: MatDialogRef<AdmAreasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private RestService:RestService,
  ){}

  ngOnInit(): void {
    this.formAreas = this.formBuilder.group({
      id :[0],
      id_sucursal : ['',[Validators.required]],
      nombre : ['',[Validators.required]],
      descripcion : ['',[Validators.required]],
      autorizador : ['',[Validators.required]],
      emailautorizador : ['',[Validators.required]],
      telefonoautorizador : ['',[Validators.required]],
      activo : [1,[Validators.required]],
    });

     if (this.data.tipo === 'Crear'){ 
          //console.log('sucursal', this.data.idSucursal)
          this.formAreas.get('id_sucursal')?.setValue(this.data.idSucursal);
     }else{
     
      this.cargarArea();
    }
  }

  cargarArea(){
    this.consultaCliente.opc = 'AREAID';
    this.consultaCliente.vIDCLIENTE = this.data.idArea;

    this.RestService.getClientes(this.consultaCliente).subscribe((data: any) => {
    this.vArea = data.body[0][0];

    this.formAreas.patchValue({
      id: this.vArea.id,
      id_sucursal: this.vArea.id_sucursal,
      nombre: this.vArea.nombre,
      descripcion: this.vArea.descripcion,
      autorizador: this.vArea.autorizador,
      emailautorizador: this.vArea.emailautorizador,
      telefonoautorizador: this.vArea.telefonoautorizador,
      activo: this.vArea.activo,
    });
 });
  }

  regresar() {
    this.dialogRef.close(this.result);
  }

 async guardarArea(){
  try{
    console.log(this.formAreas.value)
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
