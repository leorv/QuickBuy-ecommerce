import { Usuario } from './../../models/Usuario';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public usuario: Usuario = new Usuario(); //{id: 0, nome: '', email: '', senha: '', sobrenome: ''};
    

    constructor() { }

    ngOnInit() {
    }

    entrar() {
        alert('Entrar no sistema.');
    }


}
