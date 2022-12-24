import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    private baseUrl: string;
    private _usuario: Usuario;

    get usuario(): Usuario {
        return this._usuario;
    }
    set usuario(value) {
        this._usuario = value;
        sessionStorage.setItem('usuario-autenticado', JSON.stringify(value));
    }

    constructor(
        private http: HttpClient,
        @Inject("BASE_URL") baseUrl: string
    ) {
        this.baseUrl = baseUrl;
    }

    public usuario_autenticado(): boolean {
        return this._usuario != null && this._usuario.email != '' && this._usuario.senha != '';
    }

    public limpar_sessao() {
        sessionStorage.setItem('usuario-autenticado', '');
        this._usuario = null;
    }

    public verificarUsuario(usuario: Usuario): Observable<Usuario> {
        const headers = new HttpHeaders().set('content-type', 'application/json');
        var body = {
            email: usuario.email,
            senha: usuario.senha
        }
        return this.http.post<Usuario>(`${this.baseUrl}api/usuarios/VerificarUsuario`, body, { headers });
    }

    public cadastrarUsuario(usuario: Usuario): Observable<Usuario> {
        const headers = new HttpHeaders().set('content-type', 'application/json');
        var body = {
            email: usuario.email,
            senha: usuario.senha,
            nome: usuario.nome,
            sobrenome: usuario.sobrenome
        }
        return this.http.post<Usuario>(`${this.baseUrl}api/usuarios`, body, { headers });

    }

}