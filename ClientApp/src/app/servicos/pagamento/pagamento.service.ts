import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

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
