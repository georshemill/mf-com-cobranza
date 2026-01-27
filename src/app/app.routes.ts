import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'comercial/cobranza/dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'comercial/cobranza/PadronCorteServicio',
        loadComponent: () =>
          import('./pages/padron-corte/padron-corte.component').then((m) => m.PadronCorteServicioComponent),
      },
      {
        path: 'comercial/cobranza/CorteServicio',
        loadComponent: () =>
          import('./pages/corte-servicio/corte-servicio.component').then((c) => c.CorteServicioComponent),
      },
      {
        path: 'comercial/cobranza/RegistReaperServ',
        loadComponent: () =>
          import('./pages/reapertura-servicio/reapertura-servicio.component').then((c) => c.ReaperturaServicioComponent),
      },
      /*{
        path: 'comercial/catastro/SolicitudConexion',
        loadComponent: () =>
          import('./pages/presupuesto/solicitud-conexion/solicitud-conexion.component').then((c) => c.SolicitudConexionComponent),
      },
      */
      {
        path: 'comercial/catastro/PanelBusqueda',
        loadComponent: () =>
          import('./shared/panel-busqueda/panel-busqueda.component').then((c) => c.PanelBusquedaComponent),
      },
      

     
      {
        path: 'comercial/cobranza/notfound',
        loadComponent: () =>
          import('./pages/notfound/notfound').then((c) => c.Notfound),
      },
      


      
    ],
  },
  { path: '**', redirectTo: 'comercial/cobranza/notfound' }
];
