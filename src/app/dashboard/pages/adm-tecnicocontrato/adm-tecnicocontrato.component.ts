import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RestService } from '../../services/services/rest.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

export interface InfoTecnico {
  id: number;
  foto: string;
  numerodocumento: number;
  nombre: string;
  telefono: string;
}

@Component({
  selector: 'app-adm-tecnicocontrato',
  standalone: false,
  templateUrl: './adm-tecnicocontrato.component.html',
  styleUrl: './adm-tecnicocontrato.component.css'
})
export class AdmTecnicocontratoComponent implements OnInit{
  titulo: string = 'Agregar Tecnicos al Contrato';

  colTecnicos:string[] = ['foto','numerodocumento','nombre','telefono'];
  lTecnicos:any;
  dsTecnicos:  any[]=[];

  columnEspecialidades: string[] = ['id', 'nombre','descripcion'];
  listEspecialidades= new MatTableDataSource<any>();
  vEspecialidad:any;

  response: any;

  public formTecnicoContrato !: FormGroup;
  public contrato : string = '';

  constructor(
    public dialogRef: MatDialogRef<AdmTecnicocontratoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private restService:RestService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {


    this.formTecnicoContrato= this.formBuilder.group({
          opc:[''],
          vID : [0,[Validators.required]],
          vIDCONTRATO : [0,[Validators.required]],
          vIDTECNICO : [0,[Validators.required]],
          vACTIVO : [0]
    })

    this.cargarTecnicos();

  }

  consultaTec = {
    opc : 'TCN'
  }

  cargarTecnicos() {

    //console.log(this.data)

    this.restService.getMaestros(this.consultaTec).subscribe((respuesta:any)=>{
    this.lTecnicos = respuesta;
    this.dsTecnicos = this.lTecnicos.body[0];

    //console.log(this.dsTecnicos)

    this.contrato = this.data.data.data.CONTRATO;


    //console.log( this.dsTecnicos)

  });

  }

  onSelectChange(event: any) {
    const selectedValue = event.target.value;
    this.cargarEspecialidades(selectedValue);


  }

  consultaEspecialidades={
    opc:'',
    vID:0,
    vIDTECNICO:0,
    vActivo:0

  }

  cargarEspecialidades(idtecnico: any){
    //console.log('objetoData', this.objetoData)

    this.consultaEspecialidades.opc='SLC-TCN';
    this.consultaEspecialidades.vIDTECNICO= idtecnico;

    this.restService.consultaEspTecnico(this.consultaEspecialidades).subscribe((data: any) => {
      this.vEspecialidad = data.body[0];
      this.listEspecialidades = this.vEspecialidad;
    })
  }

  cancelar() {
    this.dialogRef.close();
  }

  async guardarTecnicoCont(){
    //Guardar Servicios Contrato
    if(this.formTecnicoContrato.get('vID')?.value == ''){
      this.formTecnicoContrato.get('vACTIVO')?.setValue('1');
    }
    //console.log(this.formTecnicoContrato.value)
    this.formTecnicoContrato.get('opc')?.setValue('ADD');
    this.formTecnicoContrato.get('vIDCONTRATO')?.setValue(this.contrato);
    //console.log(this.data.data)

    //console.log(this.formTecnicoContrato.value)
    try{

      //console.log(this.formContrato.value)
      const res = await lastValueFrom(this.restService.
                        tecnicosContratos(this.formTecnicoContrato.value));

      console.log(res)
      this.response = res;
      if(!this.response.error){
        await Swal.fire({
          position: "center",
          icon: "success",
          title: this.response.body,
          showConfirmButton: false,
          timer: 1500
        });

      }
    }catch( e:any ){
      console.log(e);
      await Swal.fire({
        position: "center",
        icon: "error",
        title: e.error.message,
        text:e.error.body,
        showConfirmButton: false,
        timer: 3000
      });
    }

    this.cancelar();

  }

}
