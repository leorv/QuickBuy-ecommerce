import { UsuarioService } from './../servicos/usuario/usuario.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
    selector: 'app-nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
    isExpanded = false;

    constructor(
        private router: Router,
        private usuarioService: UsuarioService
    ) {
    }

    collapse() {
        this.isExpanded = false;
    }

    toggle() {
        this.isExpanded = !this.isExpanded;
    }

    public usuarioLogado(): boolean {
        return this.usuarioService.usuario_autenticado();
    }

    sair(){
        this.usuarioService.usuario = null;
        this.router.navigate(['/']);
    }
}
