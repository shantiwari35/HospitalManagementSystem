import { inject, Service } from '@angular/core';
import { InjectionToken } from '@angular/core';
import { API_URL } from '../../app.config';
import { HttpClient } from '@angular/common/http';
@Service()
export class UserService {

    url=inject(API_URL);
    userUrl=`${this.url}/users`;

    http=inject(HttpClient);
    

    getRoles(){
        return this.http.get(`${this.userUrl}/roles`);
    }



}
