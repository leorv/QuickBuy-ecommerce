import { Observable } from 'rxjs';
import { Produto } from './../../models/Produto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UploadImagemResponse } from '../../models/upload-image-response';

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

    criar(produto: Produto): Observable<void> { 
        return this.http.post<void>(this._apiUrl, produto);
    }

    atualizar(produto: Produto): Observable<void> {
        return this.http.put<void>(this._apiUrl, produto);
    }

    deletar(id: number): Observable<void> {
        return this.http.delete<void>(`${this._apiUrl}/${id}`);
    }

    enviarArquivo(arquivoSelecionado: File): Observable<UploadImagemResponse> {
        const formData: FormData = new FormData();
        formData.append("arquivoEnviado", arquivoSelecionado, arquivoSelecionado.name);
        return this.http.post<any>(`${this._apiUrl}/upload`, formData);
    }
}