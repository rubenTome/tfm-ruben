import { Routes } from '@angular/router';

export const routes: Routes = [
    { 
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'ejecucion-actual',
        loadComponent: () => import('./pages/ejecucion/ejecucion.component').then(m => m.EjecucionComponent)
    },
    {
        path: 'historial',
        loadComponent: () => import('./pages/historial/historial.component').then(m => m.HistorialComponent)
    },
    {
        path: 'manual',
        loadComponent: () => import('./pages/manual/manual.component').then(m => m.ManualComponent)
    },
    {
        path: 'detalle',
        loadComponent: () => import('./pages/detalle/detalle.component').then(m => m.DetalleComponent)
    },
    {
        path: "**",
        redirectTo: '',
    }
];
