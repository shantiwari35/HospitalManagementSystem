import { createAction, props } from "@ngrx/store";

export const saveUser=createAction(
    '[User] Save User',
    props<{userData:any}>()
);

export const saveUserSuccess=createAction(
    '[User] Save User Success',
    props<{response:any}>()
);

export const saveUserFailure=createAction(
    '[User] Save User Failure',
    props<{error:any}>()
);

export const deleteUser=createAction(
    '[User] Delete User',
    props<{userId:any}>()
);

export const deleteUserSuccess=createAction(
    '[User] Delete User Success',
    props<{response:any}>()
);

export const deleteUserFailure=createAction(
    '[User] Delete User Failure',
    props<{error:any}>()
);

export const loadUsers=createAction(
    '[User] Load Users'
);

export const loadUsersSuccess=createAction(
    '[User] Load Users Success',
    props<{users:any}>()
);

export const loadUsersFailure=createAction(
    '[User] Load Users Failure',
    props<{error:any}>()
);

export const loadRoles=createAction(
    '[User] Load Roles'
);

export const loadRolesSuccess=createAction(
    '[User] Load Roles Success',
    props<{roles:any}>()
);

export const loadRolesFailure=createAction(
    '[User] Load Roles Failure',
    props<{error:any}>()
);