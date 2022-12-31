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

    get headers() {
        return new HttpHeaders().set('content-type', 'application/json');
    }

    constructor(
        private http: HttpClient,
        @Inject("BASE_URL") baseUrl: string
    ) {
        this.baseUrl = baseUrl;
    }

    usuario_autenticado(): boolean {
        return this._usuario != null && this._usuario.email != '' && this._usuario.senha != '';
    }

    usuario_administrador(): boolean {
        return this.usuario_autenticado() && this.usuario.administrador;
    }

    limpar_sessao() {
        sessionStorage.setItem('usuario-autenticado', '');
        this._usuario = null;
    }

    verificarUsuario(usuario: Usuario): Observable<Usuario> {
        return this.http.post<Usuario>(`${this.baseUrl}api/usuarios/VerificarUsuario`, JSON.stringify(usuario), { headers: this.headers } );
    }

    cadastrarUsuario(usuario: Usuario): Observable<Usuario> {
        return this.http.post<Usuario>(`${this.baseUrl}api/usuarios`, JSON.stringify(usuario), { headers: this.headers });

    }

}