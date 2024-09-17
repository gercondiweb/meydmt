import { Campo } from './../adm-produccion/adm-produccion.component';
import { Component, Inject } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProdrestserviceService } from './../../services/prodrestservice.service';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adm-campos',
  standalone: false,
  templateUrl: './adm-campos.component.html',
  styleUrl: './adm-campos.component.css'
})
export class AdmCamposComponent {
  public formatos: any;

  public formCampos!: FormGroup;

  result: any;

  vCampo: any;
  listCampos: any[]=[];

  consultaFormato={
    opc:'FORMATOS'
  }

  constructor(
    public dialogRef: MatDialogRef<AdmCamposComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private ProdrestserviceService: ProdrestserviceService,
  ){}

  ngOnInit(): void {
    this.formCampos = this.formBuilder.group({
      id :[0],
      campo : ['',[Validators.required]],
      activo : [1,[Validators.required]],
    });

     if (this.data.tipo === 'Crear'){ 
          //console.log('seccion', this.data.idSeccion)
          this.formCampos.get('id_campo')?.setValue(this.data.idCampo);
     }else{
     
      this.cargarCampo();
    }
  }

  cargarCampo(){
    this.consultaFormato.opc = 'FORMATOS';

    this.ProdrestserviceService.getFormatos(this.consultaFormato).subscribe((data: any) => {
    this.vCampo = data.body[0][0];

    this.formCampos.patchValue({
      id: this.vCampo.id,
      campo: this.vCampo.campo,
      activo: this.vCampo.activo,
    });
 });
  }

  regresar() {
    this.dialogRef.close(this.result);
  }

  async guardarCampo(){
    try {
      console.log(this.formCampos.value);
      const campo = await lastValueFrom(this.ProdrestserviceService.crearCampos(this.formCampos.value));
      this.result = campo.body;
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
