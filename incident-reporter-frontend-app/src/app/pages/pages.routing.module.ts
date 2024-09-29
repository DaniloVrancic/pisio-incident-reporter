import { Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { AppMapComponent } from './map/map/map.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: AppDashboardComponent,
    data: {
      title: 'Starter Page',
    },
  },
  {
    path: 'map',
    component: AppMapComponent,
    data: {
      title: 'Map',
    },
  },
];
