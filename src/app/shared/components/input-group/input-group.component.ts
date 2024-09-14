import { Component, Input, input, signal } from '@angular/core';

@Component({
  selector: 'input-group',
  templateUrl: './input-group.component.html',
  styleUrl: './input-group.component.css'
})
export class InputGroupComponent {
  @Input() placeholder: string='';
  @Input() name: string='';
  @Input() label: string='';
  @Input() type: 'number'| 'text'| 'email'|'password' | 'file'='text';
  @Input() data = signal<any>({})
  disabled = input<boolean>(false);
  
  onChange(value:string){
    this.data.update( dataOld => ({
      ...this.data(),
      [this.name] : value
    }))
  }
}
