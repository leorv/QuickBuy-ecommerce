import { UsuarioService } from './../servicos/usuario/usuario.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RotasGuard  {

    constructor(
        private router: Router,
        private usuarioService: UsuarioService
    ) {

    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot)
        : Observable<boolean> | Promise<boolean> | boolean {
        var autenticado = localStorage.getItem("usuario-autenticado");
        if (this.usuarioService.usuarioAutenticado()) {
            return true;
        }
        this.router.navigate(['/entrar'], { queryParams: { returnUrl: state.url }});
        return false;
    }

}
