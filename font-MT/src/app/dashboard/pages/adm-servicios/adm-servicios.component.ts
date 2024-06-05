import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestService } from '../../../dashboard/services/services/rest.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-adm-servicios',
  standalone: false,
  templateUrl: './adm-servicios.component.html',
  styleUrl: './adm-servicios.component.css'
})
export class AdmServiciosComponent {

  public formServicio !: FormGroup;

  listServicios : any;
  lServicios: any[]=[];

  consultaSrv={
    opc:'SERV'
  }

  constructor(
    public dialogRef: MatDialogRef<AdmServiciosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private restService:RestService) {}

  ngOnInit(): void {
     this.cargarServicios();

     this.formServicio= this.formBuilder.group({
      opc:[''],
      id : ['0',[Validators.required]],
      id_contrato : ['',[Validators.required]],
      id_servicio : ['',[Validators.required]],
      fechainicio : [''],
      fechafin : [''],
      ans : ['', [Validators.required]],
      vhh : ['', [Validators.required]],
      activo:[0,[Validators.required]]
    });

  }

  cargarServicios(){
    this.restService.getMaestros(this.consultaSrv).subscribe((data: any) => {
      this.listServicios = data;
      this.lServicios = this.listServicios.body[0];
      //this.dataSource.data = this.listServicios.body[0];
      console.log(this.listServicios.body[0])
    });
  }

  async guardarServCont(){

  }

  cancelar() {
    this.dialogRef.close();
  }

}
