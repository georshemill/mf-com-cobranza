// activity-widget.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'recent-activity-widget',
  standalone: true,
  imports: [CommonModule, TagModule, CardModule],
  template: `
  <p-card header="Actividad Reciente" class="h-full">
    <div class="flex flex-col gap-4">
      <div *ngFor="let activity of activities" class="flex items-start gap-3">
        <div class="p-2 bg-surface-100 dark:bg-surface-700 rounded-full">
          <i class="pi" [ngClass]="{
            'pi-check-circle text-green-500': activity.status === 'completed',
            'pi-pencil text-blue-500': activity.status === 'updated',
            'pi-user text-purple-500': activity.status === 'login'
          }"></i>
        </div>
        <div class="flex-1">
          <div class="font-medium">{{ activity.user }}</div>
          <div class="text-sm text-surface-500">{{ activity.action }}</div>
        </div>
        <div class="text-sm text-surface-400">{{ activity.time }}</div>
      </div>
    </div>
  </p-card>
  `
})
export class RecentActivityWidget {
  activities = [
    { user: 'Carlos Pérez', action: 'Completó el diseño del dashboard', time: '2 min ago', status: 'completed' },
    { user: 'María Gómez', action: 'Actualizó los reportes de ventas', time: '10 min ago', status: 'updated' },
    { user: 'Juan Rodríguez', action: 'Inició sesión en el sistema', time: '25 min ago', status: 'login' },
    { user: 'Ana López', action: 'Completó la revisión de QA', time: '1 hora ago', status: 'completed' }
  ];
}