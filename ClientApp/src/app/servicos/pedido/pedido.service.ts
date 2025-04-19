import { Observable } from 'rxjs';
import { Pedido } from './../../models/Pedido';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PedidoService {

    private readonly _apiUrl: string = `${environment.apiUrl}/pedidos`;

    constructor(
        private http: HttpClient
    ) {
    }

    efetivarCompra(pedido: Pedido): Observable<number> {
        return this.http.post<number>(this._apiUrl, pedido);
    }

    obterPedidoPorId(id: number): Observable<Pedido> {
        return this.http.get<Pedido>(`${this._apiUrl}/${id}`);
    }

    // TODO: qualquer usuário que mandar uma requisição com o id do outro receberá os pedidos??
    listarPedidosPorUsuario(userId: number): Observable<Pedido[]> {
        return this.http.get<Pedido[]>(`${this._apiUrl}/usuario/${userId}`);
    }

    // TODO: Somente é possível antes de ser enviado
    // TODO: Só pode cancelar pedidos que ele é dono.
    cancelarPedido(id: number): Observable<void> {
        return this.http.delete<void>(`${this._apiUrl}/${id}`);
    }
}
