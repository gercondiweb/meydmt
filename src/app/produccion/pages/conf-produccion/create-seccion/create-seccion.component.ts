import { SharedModule } from '@/app/shared/modules/shared/shared.module';
import { ISeccion } from '@/app/shared/types/interfaces/IFormato';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-create-seccion',
  standalone: true,
  imports: [ SharedModule, CommonModule ],
  templateUrl: './create-seccion.component.html',
  styleUrl: './create-seccion.component.css'
})
export class CreateSeccionComponent {

  @Input() showModal = signal(false);
  @Output() onSave = new EventEmitter<ISeccion>();

  seccionData = signal<ISeccion>({
    seccion: '',
    descripcion : '',
    campos: []
   });

  closed(){
    this.showModal.update( valueOld => false);
  }

  guardarSeccion() {
    this.closed();
    this.onSave.emit(this.seccionData());
  }

}
