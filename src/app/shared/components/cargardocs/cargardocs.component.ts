import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UploadfilesService } from '@/app/dashboard/services';
import { response } from 'express';

@Component({
  selector: 'app-cargardocs',
  templateUrl: './cargardocs.component.html',
  styleUrl: './cargardocs.component.css'
})
export class CargardocsComponent {

  @Input() single: number = 0; // valida si se reciben 1 o varios archivos al tiempo
  @Input() option: string ='';
  @Input() id: number = 0;

  datosUpdate={
    OPC : '',
    vId:0,
    vUrl1: '',
    vUrl2: '',
    vUrl3: ''
  }


  selectedFiles: File[] = [];
  uploadedFiles: { url: string, name: string, type: string }[] = [];
  uploadUrl = 'upload'; // URL del backend para subir archivos

  constructor(
    private http: HttpClient,
    private uploadService : UploadfilesService
  ) {}

  onFileSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
  }

  async cargar(){
    const formData = new FormData();
    this.selectedFiles.forEach(file => {
      formData.append('files', file, file.name);
    });

    const urlFile = await lastValueFrom(this.uploadService.singleUpload(formData));

    console.log(urlFile.body);

    if(this.option='tecnico'){
      this.datosUpdate.OPC='TEC';
      this.datosUpdate.vId=this.id;
      this.datosUpdate.vUrl1= urlFile.body;

      //Actualizar el campo foto con la url de la imagen
      await lastValueFrom(this.uploadService.updateUrlImg(this.datosUpdate));
    }

  }

  onUpload(): void {
    const formData = new FormData();
    this.selectedFiles.forEach(file => {
      formData.append('files', file, file.name);
    });

    this.uploadFiles(formData).subscribe(response => {
      response.forEach((fileInfo: { url: any; name: any; type: any; }) => {
        this.uploadedFiles.push({
          url: fileInfo.url,
          name: fileInfo.name,
          type: fileInfo.type
        });
      });
    });
  }

  uploadFiles(formData: FormData): Observable<any> {

   return this.http.post<any[]>(this.uploadUrl, formData).pipe(
      map(response => response.map(file => ({
        url: file.url,
        name: file.name,
        type: file.type
      })))
    );
  }

}
