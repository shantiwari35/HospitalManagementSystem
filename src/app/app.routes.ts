import { Routes } from '@angular/router';
import { UserRegistrationComponent } from './feature/user-registration/user-registration';

export const routes: Routes = [
  {
    path: 'register',
    component: UserRegistrationComponent,
  },
  {
    path:'user-list',
    loadComponent: () => import('./feature/user-list/user-list').then(m => m.UserList),
  },
  {
    path: '',
    redirectTo: '/register',
    pathMatch: 'full',
  },
];
