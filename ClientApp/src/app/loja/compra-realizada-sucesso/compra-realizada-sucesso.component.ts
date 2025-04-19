import { ActivatedRoute } from '@angular/router';
import { PedidoService } from './../../servicos/pedido/pedido.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-compra-realizada-sucesso',
    templateUrl: './compra-realizada-sucesso.component.html',
    styleUrls: ['./compra-realizada-sucesso.component.css']
})
export class CompraRealizadaSucessoComponent implements OnInit {

    pedidoId: string = '';
    mensagemErro: string = '';

    constructor(
        private pedidoService: PedidoService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        const pedidoId = this.route.snapshot.paramMap.get('id');
        if (pedidoId == null) {
            this.mensagemErro = 'Ocorreu um erro ao tentarmos buscar o número do pedido.';
        } else {
            this.pedidoId = pedidoId;
        }
        
    }

}
