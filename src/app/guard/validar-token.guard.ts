import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginService } from '../auth/login.service';

@Injectable({
    providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate {

    constructor(private loginService: LoginService,
        private router: Router) { }

    canActivate(): Observable<boolean> | boolean {
        console.log('CanActivate');
        return this.loginService.validarToken()
            .pipe(
                tap(valid => {
                    if (!valid) {
                        this.router.navigate(['/auth/login'])
                    }
                })
            )

    }
    canLoad(): Observable<boolean> | boolean {

        console.log('CanLoad');
        return this.loginService.validarToken()
            .pipe(
                tap(valid => {
                    if (!valid) {
                        this.router.navigate(['/auth/login'])
                    }
                })
            )
    }
}

