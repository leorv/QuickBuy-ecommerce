import { Observable } from 'rxjs';
import { Produto } from './../../models/Produto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ProdutoService {
    private _baseUrl: string;
    get headers() {
        return new HttpHeaders().set('content-type', 'application/json');
    }

    constructor(
        private http: HttpClient,
        @Inject('BASE_URL') baseUrl: string
    ) {
        this._baseUrl = baseUrl;
    }

    obterTodos(): Observable<Produto[]> {
        return this.http.get<Produto[]>(`${this._baseUrl}api/produtos`);
    }

    obterPorId(id: number): Observable<Produto> {
        return this.http.get<Produto>(`${this._baseUrl}api/produtos/${id}`);
    }

    cadastrar(produto: Produto): Observable<Produto> {
        
        // var body = {
        //     nome: produto.nome,
        //     descricao: produto.descricao,
        //     preco: produto.preco
        // }
        return this.http.post<Produto>(`${this._baseUrl}api/produtos/cadastrar`, JSON.stringify(produto), { headers: this.headers });
    }

    salvar(produto: Produto): Observable<Produto> {
        return this.http.post<Produto>(`${this._baseUrl}api/produtos/salvar`, JSON.stringify(produto), { headers: this.headers });
    }

    deletar(produto: Produto) {
        return this.http.post<Produto>(`${this._baseUrl}api/produtos/deletar`, JSON.stringify(produto), { headers: this.headers });
    }

    enviarArquivo(arquivoSelecionado: File): Observable<string> {
        const formData: FormData = new FormData();
        formData.append("arquivoEnviado", arquivoSelecionado, arquivoSelecionado.name);
        
        return this.http.post<string>(`${this._baseUrl}api/produtos/EnviarArquivo`, formData);
    }
}
