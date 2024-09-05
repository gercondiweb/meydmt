import { Component, Input } from '@angular/core';

@Component({
  selector: 'desplegable',
  templateUrl: './desplegable.component.html',
  styleUrls: ['./desplegable.component.css']
})
export class DesplegableComponent {
  @Input() value: string[] = [];
  @Input() name: string = '';
  @Input() label: string = '';
  @Input() options: { value: string, name: string }[] = [];

  // Método para manejar cambios en la selección
  onChange(event: any) {
    const selectedOptions = Array.from(event.target.selectedOptions)
                                .map((option: any) => option.value);
    this.value = selectedOptions;
  }
}
