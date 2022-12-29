import { Produto } from './../../models/Produto';
import { ProdutoService } from './../../servicos/produto/produto.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-loja-pesquisa',
    templateUrl: './loja-pesquisa.component.html',
    styleUrls: ['./loja-pesquisa.component.css']
})
export class LojaPesquisaComponent implements OnInit {

    produtos: Produto[] = [];

    constructor(
        private produtoService: ProdutoService
    ) { }

    ngOnInit() {
        this.produtoService.obterTodos().subscribe({
            next: (produtos: Produto[]) => {
                this.produtos = produtos;
            },
            error: err => {
                console.log(err);
                
            }
        })
    }

}
