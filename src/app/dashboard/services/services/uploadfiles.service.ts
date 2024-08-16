import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, reduce } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadfilesService {

  constructor(private http: HttpClient) { }

  public updateUrlImg(datosimg): Observable<any>{
    return this.http.post('updateImg', datosimg); // GET http://localhost:4000/api/updateImg
  }

  public singleUpload(formData:FormData): Observable<any>{
    return this.http.post('singleUpload', formData); // GET http://localhost:4000/api/singleUpload
  }

}
