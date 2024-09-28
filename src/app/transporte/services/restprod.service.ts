
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, reduce } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestprodService {

  constructor(private http: HttpClient) { }

  
}
