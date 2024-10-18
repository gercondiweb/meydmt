import { Component, OnInit } from '@angular/core';
import moment from 'moment';

interface Vehicle {
  name: string;
  status: { [key: string]: string }; // Key: Day of the month, Value: Status ('assigned' or 'available')
}

interface VehicleStatus {
  time: string; // Formato '08:00'
  available: number;
  occupied: number;
  maintenance: number;
  details: {
    available: string[]; // Lista de placas disponibles
    occupied: string[];  // Lista de placas ocupadas
    maintenance: string[];  // Lista de placas en mantenimiento
  };
}

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.css'
})
export class ForecastComponent implements OnInit{

  // En el componente padre
vehicleStatuses: VehicleStatus[] = [
  { time: '08:00', available: 5, occupied: 3, maintenance: 2, details: { available: ['ABC123', 'XYZ456'], occupied: ['DEF789'], maintenance: ['GHI012', 'JKL345'] } },
  { time: '08:15', available: 6, occupied: 2, maintenance: 2, details: { available: ['MNO678', 'PQR234'], occupied: ['STU567'], maintenance: ['VWX890'] } },
  // Más registros...
];


  days: string[] = []; // Array para almacenar los días completos (YYYY-MM-DD)
  filteredDays: string[] = [];
  vehicles: Vehicle[] = [];
  filteredVehicles: Vehicle[] = [];
  selectedVehicle: string = '';
  startDate: Date | null = null;
  endDate: Date | null = null;

  ngOnInit(): void {
    this.generateVehicles();
    this.filteredVehicles = [...this.vehicles]; // Mostrar todos los vehículos inicialmente
  }

  // Genera vehículos con estado aleatorio
  generateVehicles(): void {
    this.vehicles = [
      {
        name: 'Vehicle 1',
        status: this.generateRandomStatus()
      },
      {
        name: 'Vehicle 2',
        status: this.generateRandomStatus()
      },
      {
        name: 'Vehicle 3',
        status: this.generateRandomStatus()
      }
    ];
  }

  // Genera estado aleatorio para cada día dentro de un mes (YYYY-MM-DD)
  generateRandomStatus(): { [key: string]: string } {
    const status = {};
    for (let i = 0; i < 90; i++) { // Simulamos 90 días (aproximadamente 3 meses)
      const date = moment().subtract(45, 'days').add(i, 'days'); // Generamos días desde 45 días antes hasta 45 días después
      status[date.format('YYYY-MM-DD')] = Math.random() > 0.5 ? 'assigned' : 'available';
    }
    return status;
  }

  // Filtra los días dentro del rango seleccionado
  applyDateFilter(): void {
    if (this.startDate && this.endDate) {
      const startMoment = moment(this.startDate);
      const endMoment = moment(this.endDate);

      // Generar los días que caen dentro del rango seleccionado
      this.days = [];
      let currentMoment = startMoment.clone();
      while (currentMoment.isSameOrBefore(endMoment)) {
        this.days.push(currentMoment.format('YYYY-MM-DD'));
        currentMoment.add(1, 'day');
      }

      this.filteredDays = [...this.days]; // Filtra los días dentro del rango
    }
    this.applyVehicleFilter(); // Aplica también el filtro de vehículos
  }

  // Filtra los vehículos basados en la selección
  applyVehicleFilter(): void {
    if (this.selectedVehicle) {
      this.filteredVehicles = this.vehicles.filter(vehicle => vehicle.name === this.selectedVehicle);
    } else {
      this.filteredVehicles = [...this.vehicles]; // Si no hay selección, muestra todos
    }
  }

  // Obtiene el estado del vehículo para un día específico
  getStatus(vehicle: Vehicle, day: string): string {
    return vehicle.status[day] === 'assigned' ? 'assigned' : 'available';
  }

  // Obtiene el texto de estado
  getStatusText(vehicle: Vehicle, day: string): string {
    return vehicle.status[day] === 'assigned' ? 'Assigned' : 'Available';
  }

  // Método para manejar el cambio de fechas
  onDateChange(): void {
    this.applyDateFilter();
  }

  // Método que se dispara cuando el vehículo es seleccionado
  onVehicleChange(): void {
    this.applyVehicleFilter();
  }
}


