import { SharedModule } from '@/app/shared/modules/shared/shared.module';
import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adm-campo',
  standalone: true,
  imports: [SharedModule,CommonModule, RouterModule],
  templateUrl: './adm-campo.component.html',
  styleUrl: './adm-campo.component.css'
})
export class AdmCampoComponent {
  options = signal<{ value: string, name: string}[]>([{ value: '0', name: 'Seleccione'}]);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
   ) { }
closed(){
    this.router.navigateByUrl('/produccion/campos');
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

}
