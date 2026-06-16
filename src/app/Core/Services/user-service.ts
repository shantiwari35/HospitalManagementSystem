import { inject, Injectable } from '@angular/core';
import { InjectionToken } from '@angular/core';
import { API_URL } from '../../app.config';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, tap } from 'rxjs';
@Injectable({
    providedIn: 'root'})
export class UserService {

    url=inject(API_URL);
    userUrl=`${this.url}/users`;

    http=inject(HttpClient);
    

    getRoles(){
        return this.http.get(`${this.userUrl}/roles`).pipe(
            tap((roles) => console.log('Fetched roles:', roles)),
            map((response: any) => response.data || []), // Adjust based on actual API response structure
            catchError((error) => {
                console.error('Error fetching roles:', error);
                return of([]); // Return an empty array on error
            })
        );
    }

    addUser(userData:any){
        return this.http.post(`${this.userUrl}`, userData).pipe(
            tap((response) => console.log('User registered successfully:', response)),
            map((response: any) => response), // Adjust based on actual API response structure
            catchError((error) => {
                return of({ statusCode: 500, message: error.message ,data: null});
            })
        );
    }

    deleteUser(userId: number | string) {
        return this.http.delete(`${this.userUrl}/${userId}`).pipe(
            tap((response) => console.log('User deleted successfully:', response)),
            map((response: any) => response),
            catchError((error) => {
                console.error('Error deleting user:', error);
                return of({ statusCode: 500, message: error.message, data: null });
            })
        );
    }

    getUsers(){
        return this.http.get(`${this.userUrl}`).pipe(
            tap((response) => console.log('Fetched users:', response)),
            map((response: any) => response || []), // Adjust based on actual API response structure
            catchError((error) => {
                console.error('Error fetching users:', error);
                return of([]); // Return an empty array on error
            })
        );
    }

    getUserById(id:any){
        console.log(id);
        return this.http.get(`${this.userUrl}/${id}`).pipe(
            tap((response) => console.log('User fetched successfully:', response)),
            map((response: any) => response), // Adjust based on actual API response structure
            catchError((error) => {
                return of({ statusCode: 500, message: error.message ,data: null});
            })
        );
    }

}
