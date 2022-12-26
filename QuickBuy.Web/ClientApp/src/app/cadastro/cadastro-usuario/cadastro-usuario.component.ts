import { UsuarioService } from './../../servicos/usuario/usuario.service';
import { Usuario } from './../../models/Usuario';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-cadastro-usuario',
    templateUrl: './cadastro-usuario.component.html',
    styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {
    usuario: Usuario;
    mensagem: string = null;
    ativarSpinner: boolean = false;
    usuarioCadastrado: boolean = false;

    constructor(
        private usuarioService: UsuarioService
    ) { }

    ngOnInit() {
        this.usuario = new Usuario();
    }

    cadastrar() {
        this.ativarSpinner = true;
        this.usuarioService.cadastrarUsuario(this.usuario)
            .subscribe({
                next: usuario => {
                    this.mensagem = null;
                    this.usuarioCadastrado = true;
                    this.ativarSpinner = false;
                },
                error: err => {
                    this.ativarSpinner = false;
                    this.mensagem = 'Ocorreu um erro ao tentarmos cadastrar o usuário.';
                }
            })
    }

}
