import { Routes } from '@angular/router';


export const routes: Routes = [
  { path: '',
    loadChildren: () => import('./pages/pages-route').then(m => m.PagesRoute) },
];
