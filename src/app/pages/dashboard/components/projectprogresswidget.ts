// progress-widget.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'project-progress-widget',
  standalone: true,
  imports: [CommonModule, ProgressBarModule, CardModule],
  template: `
  <p-card header="Progreso de Proyectos" class="h-full">
    <div class="flex flex-col gap-4">
      <div *ngFor="let project of projects" class="mb-3">
        <div class="flex justify-between mb-2">
          <span>{{ project.name }}</span>
          <span>{{ project.progress }}%</span>
        </div>
        <p-progressBar [value]="project.progress" [style]="{ height: '6px' }"></p-progressBar>
      </div>
    </div>
  </p-card>
  `
})
export class ProjectProgressWidget {
  projects = [
    { name: 'Migración a Angular 16', progress: 75 },
    { name: 'Implementación API', progress: 45 },
    { name: 'Diseño UI/UX', progress: 90 },
    { name: 'Documentación', progress: 60 }
  ];
}