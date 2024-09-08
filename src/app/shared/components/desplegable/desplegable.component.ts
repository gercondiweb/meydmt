import { Component, Input, Output, EventEmitter } from '@angular/core';

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

  @Output() valueChange = new EventEmitter<string[]>();  

  onChange(event: any) {
    const selectedOptions = Array.from(event.target.selectedOptions)
                                .map((option: any) => option.value);
    this.value = selectedOptions;
    this.valueChange.emit(this.value); 
  }
}
