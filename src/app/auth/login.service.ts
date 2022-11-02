import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map, of, tap, Observable } from 'rxjs';
import { AuthResponse } from './interfaces/auth.interface';
import { User } from './interfaces/user.interface';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    baseUrl: string = environment.baseUrl;

    constructor(private http: HttpClient) { }

    createUser(data: User){
        return this.http.post<AuthResponse>(`${this.baseUrl}/users/createUser`, data )
                .pipe(
                    tap( resp => console.log(resp)),
                    map(resp => resp.ok ),
                    catchError( err => of(err.error.ok))
                )
    }

    login(email: string, password: string){
        const data = { email, password }

        return this.http.post<AuthResponse>(`${this.baseUrl}/users/login`, data )
            .pipe(
                tap( resp => {
                    localStorage.setItem('token', resp.token!)
                    localStorage.setItem('name', resp.name!)
                }),
                map( resp =>  resp.ok ),
                catchError ( err => of(err.error.error))
                )
    }

    validarToken(): Observable<boolean>{
        const token = localStorage.getItem('token') || ''
        const data = { token }

        return this.http.post<AuthResponse>(`${this.baseUrl}/users/validarToken`, data)
                   .pipe(
                        tap( resp => {
                            localStorage.setItem('token', resp.token!)
                        }),
                        map( resp => {
                            return resp.ok
                        }),
                        catchError( err => of(false))
                   )

    }
}
