import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestService } from '../../services/services/rest.service';
import { DataSharingService } from '../../services/services/data-sharing.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adm-documentos',
  templateUrl: './adm-documentos.component.html',
  styleUrl: './adm-documentos.component.css'
})
export class AdmDocumentosComponent implements OnInit{

  formTecDocs !: FormGroup;

  listDocumentos: any;
  vDocumento: any[]=[];

  objetoData :any;
  response : any;

  consultaDocumentos={
    opc:''
  }

  constructor(
    public dialogRef: MatDialogRef<AdmDocumentosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private restService:RestService,
    private dataSharingService: DataSharingService){}

  ngOnInit(): void {
      this.formTecDocs = this.formBuilder.group({
        id:[0],
        id_tecnico:[''],
        id_documento:[''],
        fechaemision:[],
        fechavencimiento:[],
        numerodocumento:[''],
        observaciones:[''],
        rutadocumento:[''],
        activo:['']
      });

      this.cargarDocumentos();
  }
  cargarDocumentos() {

    this.consultaDocumentos.opc='DOC';
    this.restService.getMaestros(this.consultaDocumentos).subscribe(res=>{
      this.listDocumentos=res;
      this.vDocumento=this.listDocumentos.body[0];
    });
  }

  async guardarDocumento() {

    this.objetoData = this.dataSharingService.getData();

    this.formTecDocs.get('id_tecnico')?.setValue(this.objetoData.data.id);

    if (this.data.tipo === 'Crear'){
      this.formTecDocs.get('id')?.setValue(0);
    }else{
      this.formTecDocs.get('id')?.setValue(this.objetoData.data.id);
    }
    //console.log(this.formTecEsp.value)

    try{

      //console.log(this.formCliente.value)
      const res = await lastValueFrom(this.restService.saveDocTecnico (this.formTecDocs.value));

      //this.clienteCreado = res.insertId;

      //console.log(res)
      this.response = res;
      if(!this.response.error){
        await Swal.fire({
          position: "center",
          icon: "success",
          title: this.response.body + ' - ' +  res.insertId,
          showConfirmButton: false,
          timer: 1500
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

  regresar(){
    this.dialogRef.close();
  }


}
