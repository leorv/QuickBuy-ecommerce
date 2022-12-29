import { ProdutoService } from './../../servicos/produto/produto.service';
import { Produto } from './../../models/Produto';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-pesquisa-produto',
    templateUrl: './pesquisa-produto.component.html',
    styleUrls: ['./pesquisa-produto.component.css']
})
export class PesquisaProdutoComponent implements OnInit {

    produtos: Produto[];

    constructor(
        private produtoService: ProdutoService,
        private router: Router
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

    adicionarProduto() {
        this.router.navigate(['/produto']);
    }

    deletarProduto(produto: Produto) {
        var retorno = confirm(`Deseja realmente deletar o produto ${produto.nome}?`);
        if (retorno == true) {
            this.produtoService.deletar(produto).subscribe({
                next: (produtos: Produto[]) => {
                    this.produtos = produtos;
                }
            })
        }

    }

    editarProduto(produto: Produto) {
        sessionStorage.setItem('produtoSessao', JSON.stringify(produto));
        this.router.navigate(['/produto']);
    }

}
