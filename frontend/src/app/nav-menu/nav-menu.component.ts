import { Usuario } from './../models/Usuario';
import { UsuarioService } from './../servicos/usuario/usuario.service';
import { Router, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrinhoService } from '../servicos/carrinho/carrinho.service';

@Component({
    selector: 'app-nav-menu',
    imports: [CommonModule, RouterModule],
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.css'],
    standalone: true
})
export class NavMenuComponent {
    isExpanded = false;

    get usuario(): Usuario {
        return this.usuarioService.usuario;
    }

    constructor(
        private router: Router,
        private usuarioService: UsuarioService,
        private carrinhoService: CarrinhoService
    ) {
    }

    collapse() {
        this.isExpanded = false;
    }

    toggle() {
        this.isExpanded = !this.isExpanded;
    }

    usuarioLogado(): boolean {
        return this.usuarioService.usuarioAutenticado();
    }

    usuarioAdministrador(): boolean {
        return this.usuarioService.usuarioAdministrador();
    }

    carrinhoTemItens(): boolean {
        return this.carrinhoService.temItens();
    }

    sair(){
        this.usuarioService.usuario = new Usuario();
        this.usuarioService.limpar_sessao();
        this.router.navigate(['/']);
    }
}
