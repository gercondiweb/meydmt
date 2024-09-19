import { Seccion } from './../adm-produccion/adm-produccion.component';
import { Component, Inject } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProdrestserviceService } from './../../services/prodrestservice.service';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adm-seccion',
  standalone: false,
  templateUrl: './adm-seccion.component.html',
  styleUrl: './adm-seccion.component.css'
})
export class AdmSeccionComponent {
  public formatos: any;

  public formSecciones!: FormGroup;

  result: any;

  vSeccion: any;
  listSecciones: any[]=[];

  consultaservicio={
    opc:'SECCION'
  }

  constructor(
    public dialogRef: MatDialogRef<AdmSeccionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private ProdrestserviceService: ProdrestserviceService,
  ){}

  ngOnInit(): void {
    this.formSecciones = this.formBuilder.group({
      id :[0],
      seccion : ['',[Validators.required]],
      descripcion : ['',[Validators.required]],
      activo : [1,[Validators.required]],
    });

     if (this.data.tipo === 'Crear'){ 
          //console.log('seccion', this.data.idSeccion)
          this.formSecciones.get('id_seccion')?.setValue(this.data.idSeccion);
     }else{
     
      this.cargarSeccion();
    }
  }

  cargarSeccion(){
    this.consultaservicio.opc = 'SECCION';

    this.ProdrestserviceService.getSeccion(this.consultaservicio).subscribe((data: any) => {
    this.vSeccion = data.body[0][0];

    this.formSecciones.patchValue({
      id: this.vSeccion.id,
      seccion: this.vSeccion.seccion,
      descripcion: this.vSeccion.descripcion,
      activo: this.vSeccion.activo,
    });
 });
  }

  regresar() {
    this.dialogRef.close(this.result);
  }

  async guardarSeccion(){
    try {
      console.log(this.formSecciones.value);
      const seccion = await lastValueFrom(this.ProdrestserviceService.crearSeccion(this.formSecciones.value));
      this.result = seccion.body;
    } catch (e: any) {
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
