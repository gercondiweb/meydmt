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
        path:'tecnico',
        loadChildren: () => import('./conductor/conductor.module')
        .then(m => m.ConductorModule)
      },
      {
        path:'produccion',
        loadChildren: () => import('./produccion/produccion.module')
        .then(m => m.ProduccionModule)
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
