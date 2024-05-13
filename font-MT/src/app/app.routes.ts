import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'auth',
        loadChildren: ()=> import('./auth/auth.module')
        .then(m => m.AuthModule)
      },
      {
        path:'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module')
        .then(m => m.DashboardModule)
      },
      {
        path:'conductor',
        loadChildren: () => import('./conductor/conductor.module')
        .then(m => m.ConductorModule)
      },
      {
        path: 'login',
        redirectTo: 'auth/login',
        pathMatch: 'full'
      },
      {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
      }
];
