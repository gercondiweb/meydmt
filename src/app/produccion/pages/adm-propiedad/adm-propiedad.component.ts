import { SharedModule } from '@/app/shared/modules/shared/shared.module';
import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-adm-propiedad',
  standalone: true,
  imports: [SharedModule,CommonModule, RouterModule],
  templateUrl: './adm-propiedad.component.html',
  styleUrl: './adm-propiedad.component.css'
})
export class AdmPropiedadComponent {
  options = signal<{ value: string, name: string}[]>([{ value: '0', name: 'Seleccione'}]);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
   ) { }
closed(){
    this.router.navigateByUrl('/produccion/propiedades');
  }
  selectedDesplegableValue: string[] = [];
  desplegableOptions = [
    { value: 'texto', name: 'Texto' },
    { value: 'string', name: 'String' },
    { value: 'booleano', name: 'Booleano' },
  
  ];

  onDesplegableValueChange(selectedValues: string[]) {
    this.selectedDesplegableValue = selectedValues;
    console.log('Seleccionado:', this.selectedDesplegableValue);
  }
}
