import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private param1!: string;
  private param2!: string;
  private data: any;

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
}
