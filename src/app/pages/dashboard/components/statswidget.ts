// stats-widget.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'stats-widget',
  standalone: true,
  imports: [CommonModule, CardModule],
  template: `
  <div class="w-full overflow-x-auto">
    <div class="flex flex-nowrap md:flex-wrap gap-4 min-w-max md:min-w-0">
      <p-card *ngFor="let stat of stats" class="min-w-[250px] shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center gap-4">
          <div class="p-3 rounded-full flex-shrink-0" [ngClass]="stat.bgColor">
            <i [class]="stat.icon" class="text-white"></i>
          </div>
          <div class="min-w-0">
            <span class="block text-sm text-surface-500 truncate">{{ stat.title }}</span>
            <span class="block text-2xl font-semibold truncate">{{ stat.value }}</span>
            <span class="block text-sm truncate" [ngClass]="stat.trendColor">
              <i [class]="stat.trendIcon"></i> {{ stat.trend }}%
            </span>
          </div>
        </div>
      </p-card>
    </div>
  </div>
  `,
  styles: [`
    /* Estilos adicionales para mejor visualización */
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class StatsWidget {
  stats = [
    {
      title: 'Ventas Totales',
      value: '$24,780',
      icon: 'pi pi-shopping-cart',
      bgColor: 'bg-blue-500',
      trend: 12.5,
      trendIcon: 'pi pi-arrow-up',
      trendColor: 'text-green-500'
    },
    {
      title: 'Clientes Nuevos',
      value: '1,254',
      icon: 'pi pi-users',
      bgColor: 'bg-purple-500',
      trend: 8.2,
      trendIcon: 'pi pi-arrow-up',
      trendColor: 'text-green-500'
    },
    {
      title: 'Tickets Activos',
      value: '56',
      icon: 'pi pi-ticket',
      bgColor: 'bg-orange-500',
      trend: -3.4,
      trendIcon: 'pi pi-arrow-down',
      trendColor: 'text-red-500'
    },
    {
      title: 'Satisfacción',
      value: '92%',
      icon: 'pi pi-thumbs-up',
      bgColor: 'bg-green-500',
      trend: 1.8,
      trendIcon: 'pi pi-arrow-up',
      trendColor: 'text-green-500'
    }
  ];
}