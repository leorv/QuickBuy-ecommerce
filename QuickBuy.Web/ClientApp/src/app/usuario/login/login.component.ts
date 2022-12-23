import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from './../../models/Usuario';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public usuario: Usuario = new Usuario(); //{id: 0, nome: '', email: '', senha: '', sobrenome: ''};
    public returnUrl: string;


    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
    }

    entrar() {
        if (this.usuario.email == 'leo@hotmail.com' && this.usuario.senha == 'marla') {
            alert('usuário autenticado.')
            // localStorage
            sessionStorage.setItem("usuario-autenticado", "1");
            this.router.navigate([this.returnUrl]);
        }
    }


}
