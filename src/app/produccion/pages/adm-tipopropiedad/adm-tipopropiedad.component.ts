import { Component, Inject } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProdrestserviceService } from './../../services/prodrestservice.service';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adm-tipopropiedad',
  standalone: false,
  templateUrl: './adm-tipopropiedad.component.html',
  styleUrl: './adm-tipopropiedad.component.css'
})
export class AdmTipopropiedadComponent {
  public formatos: any;

  public formTipoPropiedad!: FormGroup;

  result: any;

  vTipopropiedad: any;
  listTipopropiedad: any[]=[];

  consultaservicio={
    opc:'TIPOPROPIE'
  }

  constructor(
    public dialogRef: MatDialogRef<AdmTipopropiedadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private ProdrestserviceService: ProdrestserviceService,
  ){}

  ngOnInit(): void {
    this.formTipoPropiedad = this.formBuilder.group({
      id :[0],
      tipopropiedad: ['',[Validators.required]],
      activo : [1,[Validators.required]],
    });

     if (this.data.tipo === 'Crear'){ 
          this.formTipoPropiedad.get('id_tipopropiedad')?.setValue(this.data.id_tipopropiedad);
     }else{
     
      this.cargarTipoPropiedad();
    }
  }

  cargarTipoPropiedad(){
    this.consultaservicio.opc = 'TIPOPROPIE';

    this.ProdrestserviceService.getTipoPropiedades(this.consultaservicio).subscribe((data: any) => {
    this.vTipopropiedad = data.body[0][0];

    this.formTipoPropiedad.patchValue({
      id: this.vTipopropiedad.id,
      tipopropiedad: this.vTipopropiedad.tipopropiedad,
      activo: this.vTipopropiedad.activo,
    });
 });
  }

  regresar() {
    this.dialogRef.close(this.result);
  }

  async guardarTipoPropiedad(){
    try {
      console.log(this.formTipoPropiedad.value);
      const tipopropiedad = await lastValueFrom(this.ProdrestserviceService.crearTipoPropiedades(this.formTipoPropiedad.value));
      this.result = tipopropiedad.body;
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
