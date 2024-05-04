import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'select-date',
  templateUrl: './select-date.component.html',
  styleUrl: './select-date.component.css'
})
export class SelectDateComponent {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
}
