import { UsuarioService } from './../../servicos/usuario/usuario.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Usuario } from './../../models/Usuario';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    imports: [FormsModule, CommonModule, RouterModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: true
})
export class LoginComponent implements OnInit {

    usuario: Usuario = new Usuario(); //{id: 0, nome: '', email: '', senha: '', sobrenome: ''};
    returnUrl: string = '';
    mensagem: string = '';
    ativarSpinner: boolean = false;


    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private usuarioServico: UsuarioService
    ) {
    }

    ngOnInit() {
        this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
    }

    entrar() {
        this.ativarSpinner = true;
        
        this.usuarioServico.verificarUsuario(this.usuario)
            .subscribe({
                next: usuario => {
                    // var usuarioRetorno: Usuario = data;
                    // localStorage.setItem('usuario-autenticado', '1');
                    // localStorage.setItem('usuario-email', usuarioRetorno.email);
                    this.usuarioServico.usuario = usuario;

                    if (this.returnUrl == null) {
                        this.router.navigate(['/']);
                    } else {
                        this.router.navigate([this.returnUrl]);
                    }                    
                },
                error: err => {
                    this.mensagem = err.error;
                    this.ativarSpinner = false;
                }
            });


        // if (this.usuario.email == 'leo@hotmail.com' && this.usuario.senha == 'marla') {
        //     alert('usuário autenticado.')
        //     // localStorage
        //     localStorage.setItem("usuario-autenticado", "1");
        //     this.router.navigate([this.returnUrl]);
        // }
    }


}
