import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Usuario } from '../../models/Usuario';
import { environment } from '../../../environments/environment';

//TODO: Criar um serviço de sessão/auth separado no futuro.

//TODO: Criar interceptors para enviar token automaticamente.

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    private readonly _apiUrl = `${environment.apiUrl}/usuarios`;
    private _usuario: Usuario = this.carregarUsuarioDoStorage();


    constructor(
        private http: HttpClient,
    ) {
    }

    get usuario(): Usuario {
        return this._usuario;
    }

    set usuario(value: Usuario) {
        this._usuario = value;
        if (value) {
            localStorage.setItem('usuario-autenticado', JSON.stringify(value))
        }
        else {
            localStorage.removeItem('usuario-autenticado');
        }
    }

    private carregarUsuarioDoStorage(): Usuario {
        const usuarioJson = localStorage.getItem('usuario-autenticado');
        return usuarioJson ? JSON.parse(usuarioJson) : new Usuario;
    }

    // TODO: Melhorar com uma consulta ao backend.
    usuarioAutenticado(): boolean {
        return this._usuario.email != '' && this._usuario.senha != '';
    }

    // TODO: Melhorar com uma consulta ao backend.
    usuarioAdministrador(): boolean {
        return this.usuarioAutenticado() && !!this.usuario.administrador;
    }

    limpar_sessao() {
        this._usuario = new Usuario;
        localStorage.setItem('usuario-autenticado', JSON.stringify(this._usuario));
    }

    verificar(usuario: Usuario): Observable<Usuario> {
        return this.http.post<Usuario>(`${this._apiUrl}/verificar`, usuario);
    }

    cadastrar(usuario: Usuario): Observable<Usuario> {
        return this.http.post<Usuario>(this._apiUrl, usuario);
    }

}