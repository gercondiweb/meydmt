
  import { Component, Input, Output, EventEmitter } from '@angular/core';

  @Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrl: './pagination.component.css'
  })
  export class PaginationComponent {
    @Input() pages: number[] = [];
    @Input() actual: number = 1;
    @Input() pageCount: number = 1;
    @Input() isNext: boolean = false;
    @Input() isPrev: boolean = false;
  
    @Output() eventPage = new EventEmitter<number>();
  
    prev() {
      this.eventPage.emit((this.actual - 1) === 0 ? 1 : this.actual - 1);
    }
  
    next() {
      const size = this.pages.length;
      this.eventPage.emit((this.actual + 1) > size ? size : this.actual + 1);
    }
  }
  