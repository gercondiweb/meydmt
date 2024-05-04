import { Component, Input } from '@angular/core';
import { ItemNavigate } from '../../types/interfaces';

@Component({
  selector: 'app-item-navigate',
  templateUrl: './item-navigate.component.html',
  styleUrl: './item-navigate.component.css'
})
export class ItemNavigateComponent {
  @Input({required:true}) itemNav!: ItemNavigate;

}
