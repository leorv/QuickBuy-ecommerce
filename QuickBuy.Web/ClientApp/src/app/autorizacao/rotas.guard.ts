import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RotasGuard implements CanActivate {

    constructor(
        private router: Router
    ) {

    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot)
        : Observable<boolean> | Promise<boolean> | boolean {
        var autenticado = sessionStorage.getItem("usuario-autenticado");
        if (autenticado == '1') {
            return true;
        }
        this.router.navigate(['/entrar'], { queryParams: { returnUrl: state.url }});
        return false;
    }

}
