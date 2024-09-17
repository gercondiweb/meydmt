import { Component, inject} from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '@/app/auth/services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private authService = inject(AuthService);

  logOut(){
    this.authService.logout();
  }
}
