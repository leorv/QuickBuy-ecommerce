import { Usuario } from './../models/Usuario';
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

    get usuario(): Usuario {
        return this.usuarioService.usuario;
    }

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

    usuarioLogado(): boolean {
        return this.usuarioService.usuario_autenticado();
    }

    usuarioAdministrador(): boolean {
        return this.usuarioService.usuario_administrador();
    }

    sair(){
        this.usuarioService.usuario = null;
        this.usuarioService.limpar_sessao();
        this.router.navigate(['/']);
    }
}
