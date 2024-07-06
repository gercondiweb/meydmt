import { Component, computed, inject, input, signal } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading-full',
  templateUrl: './loading-full.component.html',
  styleUrls: ['./loading-full.component.css']
})
export class LoadingFullComponent {
  private readonly loadingService = inject(LoadingService);
  isShow = computed<boolean>( () => this.loadingService.isShow());
  size = computed<string>( () => this.loadingService.size());

}
