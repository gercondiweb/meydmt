import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tikets',
    loadComponent: () => import('./tikets/tikets.page').then( m => m.TiketsPage)
  },
  {
    path: 'main',
    loadComponent: () => import('./main/main.page').then( m => m.MainPage)
  },
];
