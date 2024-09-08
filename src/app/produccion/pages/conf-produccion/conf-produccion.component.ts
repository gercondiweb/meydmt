import { SharedModule } from './../../../shared/modules/shared/shared.module';
import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-conf-produccion',
  standalone: true,
  imports: [SharedModule,CommonModule],
  templateUrl: './conf-produccion.component.html',
  styleUrl: './conf-produccion.component.css'
})
export class ConfProduccionComponent {
  @Input() showModal = signal<boolean>(false);
  @Input() showmodal = signal<boolean>(false);
  closed(){
    this.showModal.update( dataOld => false);
  }
  openModal() {
    this.showModal.update( valueOld => true);
  }
  closedModal(){
    this.showmodal.update( dataOld => false);
  }
  opendModal() {
    this.showmodal.update( valueOld => true);
  }


  titulo = ['Propiedades del campo'];
  columnas = ['Nombre','Propiedades'];

  dataSource!: MatTableDataSource<any,any>;

  

  editar(){
    alert("Editar propiedades del campo");
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectedDesplegableValue: string[] = [];
  desplegableOptions = [
    { value: 'bueno', name: 'Bueno' },
    { value: 'malo', name: 'Malo' },
    { value: 'si', name: 'Si' },
    { value: 'no', name: 'No' },
    { value: 'sellos', name: 'Sellos' },
    { value: 'correo', name: 'Correo' },
  ];

  onDesplegableValueChange(selectedValues: string[]) {
    this.selectedDesplegableValue = selectedValues;
    console.log('Seleccionado:', this.selectedDesplegableValue);
  }

  onSubmit() {
    console.log('Datos enviados', this.selectedDesplegableValue);
  }
}
