import { UsuarioService } from './../../servicos/usuario/usuario.service';
import { Usuario } from './../../models/Usuario';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-cadastro-usuario',
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './cadastro-usuario.component.html',
    styleUrls: ['./cadastro-usuario.component.css'],
    standalone: true
})
export class CadastroUsuarioComponent implements OnInit {
    usuario: Usuario = new Usuario();
    mensagem: string = '';
    ativarSpinner: boolean = false;
    usuarioCadastrado: boolean = false;

    constructor(
        private usuarioService: UsuarioService,
        private router: Router
    ) { }

    ngOnInit() {

    }

    cadastrar() {
        this.ativarSpinner = true;
        this.usuarioService.cadastrar(this.usuario).subscribe({
            next: usuarioCriado => {
                this.usuarioService.usuario = usuarioCriado;
                this.usuarioCadastrado = true;
                this.mensagem = 'Usuário cadastrado com sucesso, aguarde 3 segundos para ser redirecionado à página inicial.';
                setTimeout(() => {
                    this.router.navigate(['/']);
                }, 3000);
            }
        })
    }

}
