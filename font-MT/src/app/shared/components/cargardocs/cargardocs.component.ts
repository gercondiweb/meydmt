import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cargardocs',
  templateUrl: './cargardocs.component.html',
  styleUrl: './cargardocs.component.css'
})
export class CargardocsComponent {

  selectedFiles: File[] = [];
  uploadedFiles: { url: string, name: string, type: string }[] = [];
  uploadUrl = 'https://tu-servidor.com/api/upload'; // URL del backend para subir archivos

  constructor(private http: HttpClient) {}

  onFileSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
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
