import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-service',
  templateUrl: './card-services.component.html',
  styleUrls: ['./card-services.component.css']
})
export class CardServicesComponent implements OnInit {
  @Input() servicio : any;
  constructor() { }

  ngOnInit() {
  }

}
