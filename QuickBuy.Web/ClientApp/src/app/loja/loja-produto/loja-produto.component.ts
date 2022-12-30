import { Produto } from './../../models/Produto';
import { ProdutoService } from './../../servicos/produto/produto.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-loja-produto',
    templateUrl: './loja-produto.component.html',
    styleUrls: ['./loja-produto.component.css']
})
export class LojaProdutoComponent implements OnInit {

    produto: Produto = new Produto();

    constructor(
        private produtoService: ProdutoService
    ) { }

    ngOnInit() {
        var produtoDetalhe = sessionStorage.getItem('produtoDetalhe');
        if (produtoDetalhe) {
            this.produto = JSON.parse(produtoDetalhe);
        }
    }

    comprar() {
        
    }

}
