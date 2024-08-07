import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/modules/shared/shared.module';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front-tr';
}
