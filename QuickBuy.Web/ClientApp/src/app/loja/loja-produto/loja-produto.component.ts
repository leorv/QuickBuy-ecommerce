import { Router } from '@angular/router';
import { Produto } from './../../models/Produto';
import { ProdutoService } from './../../servicos/produto/produto.service';
import { Component, OnInit } from '@angular/core';
import { CarrinhoCompras } from '../carrinho-compras';

@Component({
    selector: 'app-loja-produto',
    templateUrl: './loja-produto.component.html',
    styleUrls: ['./loja-produto.component.css']
})
export class LojaProdutoComponent implements OnInit {

    produto: Produto = new Produto();
    carrinhoCompras: CarrinhoCompras

    constructor(
        private produtoService: ProdutoService,
        private router: Router
    ) { }

    ngOnInit() {
        this.carrinhoCompras = new CarrinhoCompras();
        var produtoDetalhe = sessionStorage.getItem('produtoDetalhe');
        if (produtoDetalhe) {
            this.produto = JSON.parse(produtoDetalhe);
        }
    }

    comprar() {
        this.carrinhoCompras.adicionar(this.produto);
        this.router.navigate(['/loja-efetivar'])
        
    }

}
