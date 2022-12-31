import { Produto } from './../../models/Produto';
import { CarrinhoCompras } from './../carrinho-compras';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-loja-efetivar',
    templateUrl: './loja-efetivar.component.html',
    styleUrls: ['./loja-efetivar.component.css']
})
export class LojaEfetivarComponent implements OnInit {

    carrinhoCompras: CarrinhoCompras;
    produtos: Produto[];

    constructor() { }

    ngOnInit() {
        this.carrinhoCompras = new CarrinhoCompras();
        this.produtos = this.carrinhoCompras.obterProdutos();
    }

    atualizarPreco(produto: Produto, quantidade: number) {
        if (!produto.precoOriginal) {
            produto.precoOriginal = produto.preco;
        }
        if (quantidade <= 0) {
            quantidade = 1;
            produto.quantidade = quantidade;
        }
        produto.preco = produto.precoOriginal * quantidade;
        this.carrinhoCompras.atualizar(this.produtos);
    }

    remover(produto: Produto) {
        this.carrinhoCompras.removerProduto(produto);
        this.produtos = this.carrinhoCompras.obterProdutos();
    }

}
