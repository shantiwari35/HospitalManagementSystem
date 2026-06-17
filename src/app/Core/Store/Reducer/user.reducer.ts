import { createReducer, on } from "@ngrx/store"
import { deleteUser, deleteUserFailure, deleteUserSuccess, loadRoles, loadRolesFailure, loadRolesSuccess, loadUsers, loadUsersFailure, loadUsersSuccess, saveUser, saveUserFailure, saveUserSuccess } from "../Action/userAction.action"


export const initialState={
    users:[],
    roles:[],
    error:null,
    loading:false,
    response:null,
}


export const userReducer=createReducer(
    initialState,
    on(saveUser,(state)=>({...state,loading:true,error:null})),
    on(saveUserSuccess,(state,{response})=>({...state,loading:false,response})),
    on(saveUserFailure,(state,{error})=>({...state,loading:false,error})),
    on(deleteUser,(state)=>({...state,loading:true,error:null})),
    on(deleteUserSuccess,(state,{response})=>({...state,loading:false,response})),
    on(deleteUserFailure,(state,{error})=>({...state,loading:false,error})),
    on(loadUsers,(state)=>({...state,loading:true,error:null})),
    on(loadUsersSuccess,(state,{users})=>({...state,loading:false,users})),
    on(loadUsersFailure,(state,{error})=>({...state,loading:false,error})),
    on(loadRoles,(state)=>({...state,loading:true,error:null})),
    on(loadRolesSuccess,(state,{roles})=>({...state,loading:false,roles:roles})),
    on(loadRolesFailure,(state,{error})=>({...state,loading:false,error}))
)