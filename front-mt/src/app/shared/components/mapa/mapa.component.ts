import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent implements OnInit{
  // coordenadas de origen y destino
  origenLat: number = 40.730610;
  origenLng: number = -73.935242;
  destinoLat: number = 37.774929;
  destinoLng: number = -122.419416;

  constructor() { }

  ngOnInit(): void {
  }

}
