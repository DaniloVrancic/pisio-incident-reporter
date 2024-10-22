import { Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { AppMapComponent } from './map/map/map.component';
import { AppDescriptionComponent } from './description/description/description.component';
import { AppNLPAnalysisComponent } from './nlp_analysis/nlp-analysis.component';

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
  {
    path: 'description',
    component: AppDescriptionComponent,
    data: {
      title: 'Description',
    },
  },
  {
    path: 'nlp',
    component: AppNLPAnalysisComponent,
    data: {
      title: 'NLP Analysis'
    }
  }
];
