import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { AppMapComponent } from './pages/map/map/map.component';
import { AppDescriptionComponent } from './pages/description/description/description.component';
import { MagicRefreshComponent } from './layouts/blank/magic-refresh/magic-refresh.component';
import { AppNLPAnalysisComponent } from './pages/nlp_analysis/nlp-analysis.component';

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/map',
        pathMatch: 'full',
      },
      {
        path: 'map',
        component: AppMapComponent,
        pathMatch: 'full',
      },
      {
        path: 'description',
        component: AppDescriptionComponent,
        pathMatch: 'full'
      },
      {
        path: 'nlp',
        component: AppNLPAnalysisComponent,
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'refresh',
        component: MagicRefreshComponent,
        pathMatch: 'full'
      }
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
