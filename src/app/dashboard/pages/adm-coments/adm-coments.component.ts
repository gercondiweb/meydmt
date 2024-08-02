import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestService } from '../../../dashboard/services/services/rest.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { response } from 'express';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';
import { AuthService } from '@/app/auth/services/auth.service';

@Component({
  selector: 'app-adm-coments',
  standalone: false,
  templateUrl: './adm-coments.component.html',
  styleUrl: './adm-coments.component.css'
})
export class AdmComentsComponent implements OnInit{

  public frmComents !: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AdmComentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private RestService:RestService,
    private authService : AuthService) {}

  ngOnInit(): void {

    const now = new Date();
    const formattedTime = formatDate(now, 'HH:mm', 'en-US');
    const currentUser = this.authService.getCurrentUser();

     this.frmComents = this.formBuilder.group({
      id:[0],
      id_ticket:[0,[Validators.required]],
      comentario:['',[Validators.required]],
      usuario:['currentUser'],
      fecha:[now],
      hora:[formattedTime],
      visible:['']
     });

  }

  async grabar(){

    console.log(this.data)

    this.frmComents.get('id')?.setValue(0);

    try{
      const res = await lastValueFrom(this.RestService.comentarios(this.frmComents.value));
      if(!res.error){
        await Swal.fire({
          position: "center",
          icon: "success",
          title: 'Comentario creado satisfactoriamente!',
          showConfirmButton: false,
          timer: 2000
        });

      }
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

  regresar() {
    this.dialogRef.close();
  }

}
