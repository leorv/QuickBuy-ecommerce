import { Observable } from 'rxjs';
import { Produto } from './../../models/Produto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProdutoService {

    private readonly _apiUrl = `${environment.apiUrl}/produtos`;

    constructor(
        private http: HttpClient,
    ) {
    }

    obterTodos(): Observable<Produto[]> {
        return this.http.get<Produto[]>(`${this._apiUrl}`);
    }

    obterPorId(id: number): Observable<Produto> {
        return this.http.get<Produto>(`${this._apiUrl}/${id}`);
    }

    criar(produto: Produto): Observable<Produto> { 
        return this.http.post<Produto>(this._apiUrl, produto);
    }

    atualizar(produto: Produto): Observable<Produto> {
        return this.http.put<Produto>(this._apiUrl, produto);
    }

    deletar(id: number): Observable<Produto[]> {
        return this.http.post<Produto[]>(this._apiUrl, id); 
    }

    enviarArquivo(arquivoSelecionado: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append("arquivoEnviado", arquivoSelecionado, arquivoSelecionado.name);

        return this.http.post<any>(`${this._apiUrl}/EnviarArquivo`, formData);
    }
}