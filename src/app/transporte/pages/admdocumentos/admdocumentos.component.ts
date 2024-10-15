import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RestService } from '../../services/rest.service';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { DataSharingService } from '../../services/data-sharing.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admdocumentos',
  templateUrl: './admdocumentos.component.html',
  styleUrl: './admdocumentos.component.css'
})
export class AdmdocumentosComponent {
  formDocs !: FormGroup;

  listDocumentos: any;
  listVehiculos: any;

  objetoData :any;
  response : any;

  consultaDocumentos={
    opc:''
  }

  constructor(
    public dialogRef: MatDialogRef<AdmdocumentosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private restService:RestService,
    private dataSharingService: DataSharingService,
    private route: ActivatedRoute){}

  ngOnInit(): void {
    
console.log('GERMAN ',this.data.tipo)
      //Inicializar formulario de documentos
      this.formDocs = this.formBuilder.group({
        id:[0],
        id_vehiculo:[''],
        id_documento:[''],
        documento:[''],
        fechaexpedido:[],
        fechavence:[],
        numerodoc:[''],
        observaciones:[''],
        rutadocumento:[''],
        activo:[1]
      });

      this.cargarDocumentos();
      if(this.data.tipo='EDITAR'){
        this.mostrarDatos();
      }
      
  }

  mostrarDatos(){
    this.formDocs.get('id')?.setValue(this.data.data.id);
    this.formDocs.get('id_vehiculo')?.setValue(this.data.data.id_vehiculo);
    //this.formDocs.get('documento')?.setValue(this.data.data.documento);
    this.formDocs.get('documento')?.setValue(this.data.data.id_documento);
    this.formDocs.get('fechaexpedido')?.setValue(new Date(this.data.data.fechaexpedido));
    this.formDocs.get('fechavence')?.setValue(new Date(this.data.data.fechavence));
    this.formDocs.get('numerodoc')?.setValue(this.data.data.numerodoc);
    this.formDocs.get('observaciones')?.setValue(this.data.data.observaciones);
  }
  cargarDocumentos() {

    this.consultaDocumentos.opc='DOC';
    this.restService.getMaestros(this.consultaDocumentos).subscribe(res=>{
      this.listDocumentos=res.body[0];
    });

    this.consultaDocumentos.opc='VEHICULO';
    this.restService.getMaestros(this.consultaDocumentos).subscribe(res=>{
      this.listVehiculos=res.body[0]; 
    });

    this.formDocs.get('id_vehiculo').setValue(this.data.id_vehiculo);
    //this.formDocs.get('id_vehiculo').disabled;
   
  }

  async guardarDocumento() {

    this.objetoData = this.dataSharingService.getData();

    if (this.data.tipo === 'Crear'){
      this.formDocs.get('id')?.setValue(0);
      this.formDocs.get('activo')?.setValue(1);
    }else{
      this.formDocs.get('id')?.setValue(this.objetoData.data.id);
    }
    //console.log(this.formTecEsp.value)

    try{
      //this.formDocs.get('id_vehiculo').enabled;
      //console.log(this.formCliente.value)
      const res = await lastValueFrom(this.restService.saveDocVehiculo (this.formDocs.value));

      //this.clienteCreado = res.insertId;

      //console.log(res)
      this.response = res;
      if(!this.response.error){
        await Swal.fire({
          position: "center",
          icon: "success",
          title: this.response,
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

