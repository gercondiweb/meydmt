import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private param1!: string;
  private param2!: string;
  private data: any;

  private pais!: number;
  private departamento!: number;
  private ciudad: number;
  private zip : number;

  constructor() { }

  setParams(param1: string, param2: string, data: any) {
    this.param1 = param1;
    this.param2 = param2;
    this.data = data;
  }

  getParam1(): string {
    return this.param1;
  }

  getParam2(): string {
    return this.param2;
  }

  getData(): any {
    return this.data;
  }

  setDemografico(pais: number, departamento: number, ciudad: number, zip: number){
      this.pais = pais;
      this.departamento = departamento;
      this.ciudad = ciudad;
      this.zip = zip;
  }

  getCiudad():number{
    return this.ciudad;
  }

  getPais():number{
    return this.pais;
  }

  getDepartamento():number{
    return this.departamento;
  }

  getZip():number{
    return this.zip;
  }
}
