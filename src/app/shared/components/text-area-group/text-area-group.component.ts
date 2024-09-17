import { Component, Input, input, signal } from '@angular/core';

@Component({
  selector: 'text-area-group',
  templateUrl: './text-area-group.component.html',
  styleUrl: './text-area-group.component.css'
})
export class TextAreaGroupComponent {

  @Input() placeholder: string='';
  @Input() name: string='';
  @Input() label: string='';
  @Input() data = signal<any>({})
  maxHeig = input<string>('')

onChange(value:string){
  this.data.update( dataOld => ({
    ...this.data(),
    [this.name] : value
  }))
}
}
