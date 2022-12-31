import { Observable } from 'rxjs';
import { Pedido } from './../../models/Pedido';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PedidoService {

    private BASE_URL: string;
    get headers(): HttpHeaders {
        return new HttpHeaders().set('content-type', 'application/json');
    }

    constructor(
        private http: HttpClient,
        @Inject('BASE_URL') baseUrl: string
    ) {
        this.BASE_URL = baseUrl;
    }

    efetivarCompra(pedido: Pedido): Observable<number> {
        return this.http.post<number>(`${this.BASE_URL}api/pedidos`, JSON.stringify(pedido), {headers: this.headers} )
    }
}
