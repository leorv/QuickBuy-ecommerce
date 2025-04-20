import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';


/*
TODO: Montar um serviço simulado de pagamento (mock).
Criar um backend fake com JSON Server ou similar pra testar.
Integrar com API real tipo PagSeguro, Mercado Pago ou Stripe no futuro.
*/
@Injectable({
  providedIn: 'root'
})
export class PagamentoService {
  private readonly _apiUrl: string = `${environment.apiUrl}/pagamentos`;

  constructor(private http: HttpClient) { }

  iniciarPagamento(pedidoId: number) : Observable<string> {
    return this.http.post<string>(`${this._apiUrl}/iniciar`, pedidoId);
  }

  verificarStatus(pedidoId: number): Observable<'pendente' | 'pago' | 'falhou'> {
    return this.http.get<'pendente' | 'pago' | 'falhou'>(`${this._apiUrl}/status/${pedidoId}`);
  }
}
