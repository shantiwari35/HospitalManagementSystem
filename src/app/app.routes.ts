import { Routes } from '@angular/router';
import { Sidenav } from './Layout/sidenav/sidenav';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'register',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./feature/user-registration/user-registration').then(
        (m) => m.UserRegistrationComponent,
      ),
  },
  {
    path: 'users',
    loadComponent: () => import('./feature/user-list/user-list').then((m) => m.UserList),
  },
  {
    path: 'user-list',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'register',
  },
];
