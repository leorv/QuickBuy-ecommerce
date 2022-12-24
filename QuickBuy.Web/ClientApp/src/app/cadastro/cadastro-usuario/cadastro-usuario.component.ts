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

    constructor(
        private usuarioService: UsuarioService
    ) { }

    ngOnInit() {
        this.usuario = new Usuario();
    }

    cadastrar() {
        this.usuarioService.cadastrarUsuario(this.usuario)
            .subscribe({
                next: usuario => {
                    
                },
                error: err => {

                }
            })
    }

}
