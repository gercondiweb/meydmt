import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  isOpen = false;
  constructor() { }

  openModal(){
    this.isOpen = true;
  }

  closeModal(){
    this.isOpen = false;
  }
}
