import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
    },
    { 
        path: 'inicio',
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
        path: 'experimentos/:id',
        loadComponent: () => import('./pages/detalle/detalle.component').then(m => m.DetalleComponent)
    },
    {
        path: "registro",
        loadComponent: () => import('./pages/registro/registro.component').then(m => m.RegistroComponent)
    },
    {
        path: "**",
        redirectTo: 'login',
    }
];
