import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent implements OnInit {
  services = [
    {
      cliente: 'Mannuel',
      origen: 'N/A',
      destino: 'N/A',
      hora: '40:00 pm'
    },
    {
      cliente: 'Mannuel',
      origen: 'N/A',
      destino: 'N/A',
      hora: '40:00 pm'
    },
    {
      cliente: 'Mannuel',
      origen: 'N/A',
      destino: 'N/A',
      hora: '40:00 pm'
    },
    {
      cliente: 'Mannuel',
      origen: 'N/A',
      destino: 'N/A',
      hora: '40:00 pm'
    },
    {
      cliente: 'Mannuel',
      origen: 'N/A',
      destino: 'N/A',
      hora: '40:00 pm'
    },
  ]
  constructor() { }

  ngOnInit() {
  }

}
