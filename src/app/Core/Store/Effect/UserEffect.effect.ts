import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../Services/user-service';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import {
  deleteUser,
  deleteUserFailure,
  deleteUserSuccess,
  loadRoles,
  loadRolesFailure,
  loadRolesSuccess,
  saveUser,
  saveUserFailure,
  saveUserSuccess,
} from '../Action/userAction.action';

export class UserEffect {
  private userService = inject(UserService);
  private actions$ = inject(Actions);
  private store = inject(Store);

  loadRoles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadRoles),
      switchMap(() => {
        return this.userService.getRoles().pipe(
          tap((roles) => console.log('Fetched roles in effect:', roles)),
          map((roles: any) =>
            loadRolesSuccess({
              roles: roles,
            }),
          ),
          catchError((error) =>
            of(
              loadRolesFailure({
                error: error.message,
              }),
            ),
          ),
        );
      }),
    );
  });

  saveUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(saveUser),
      switchMap(({ userData }) => {
        return this.userService.addUser(userData).pipe(
          tap((response) => console.log('User registered successfully in effect:', response)),
          map((response: any) =>
            saveUserSuccess({
              response: response,
            }),
          ),
          catchError((error) =>
            of(
              saveUserFailure({
                error: error.message,
              }),
            ),
          ),
        );
      }),
    );
  });

  deleteUser$=createEffect(()=>{
    return this.actions$.pipe(
      ofType(deleteUser),
      switchMap(({userId})=>{
        return this.userService.deleteUser(userId).pipe(
          tap((response) => console.log('User deleted successfully in effect:', response)),
          map((response: any) =>
            deleteUserSuccess({
              response: response,
            }),
          ),
          catchError((error) =>
            of(
              deleteUserFailure({
                error: error.message,
              }),
            ),
          ),
        );
      }),
    );
  });
}
