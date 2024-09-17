import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.css']
})
export class CheckBoxComponent {
  @Input() value: string = '';
  @Input() name: string = '';
  @Input() label: string = '';
  @Input() options: { value: string, name: string }[] = [];
  @Input() data = signal<any>({});
  selectedValues: Set<string> = new Set<string>();

  onCheckboxChange(value: string, isChecked: boolean): void {
    if (isChecked) {
      this.selectedValues.add(value);
    } else {
      this.selectedValues.delete(value);
    }
  }

  isChecked(value: string): boolean {
    return this.selectedValues.has(value);
  }

  trackByValue(index: number, option: { value: string }): string {
    return option.value;
  }

  ngOnInit(): void {
    if (this.options && this.options.length ) this.data()[this.name] =  this.options[0].value;
  } 
}
