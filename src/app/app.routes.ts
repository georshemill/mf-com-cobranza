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
      {
        
        path: 'comercial/cobranza/CierresFecha',
        loadComponent: () =>
          import('./pages/cierre-fecha/cierre-fecha.component').then((c) => c.CierreFechaComponent),
      },
      {
        
      path: 'comercial/cobranza/ReaperturaFecha',
        loadComponent: () =>
          import('./pages/reapertura-periodo/reapertura-periodo.component').then((c) => c.ReaperturaPeriodoComponent),
      },
      {
      path: 'comercial/cobranza/PadronReapertura',
        loadComponent: () =>
          import('./pages/padron-reapertura/padron-reapertura.component').then((c) => c.PadronReaperturaServicioComponent),
      },

      {
        path: 'comercial/cobranza/saldCuentCobr',
        loadComponent: () =>
          import('./pages/saldo-cuenta/saldo-cuenta.component').then((c) => c.SaldoCuentaComponent),
      },
      {
        path: 'comercial/cobranza/VentaConcepto',
        loadComponent: () =>
          import('./pages/reportes/venta-concepto/venta-concepto.component').then((c) => c.VentaConceptoComponent),
      },
      {
        path: 'comercial/cobranza/VentaPeriodo',
        loadComponent: () =>
          import('./pages/reportes/venta-periodo/venta-periodo.component').then((c) => c.VentaPeriodoComponent),
      },



      
      

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
