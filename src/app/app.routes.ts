import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'subscribe',
    loadComponent: () =>
      import('./components/subscribe-form/subscribe-form').then((m) => m.SubscribeForm),
  },
  {
    path: '',
    redirectTo: '/subscribe',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/subscribe',
  },
];
