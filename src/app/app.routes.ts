import { Routes } from '@angular/router';
import { UserRegistrationComponent } from './feature/user-registration/user-registration';

export const routes: Routes = [
  {
    path: 'register',
    component: UserRegistrationComponent,
  },
  {
    path: '',
    redirectTo: '/register',
    pathMatch: 'full',
  },
];
