import { Router } from '@angular/router';
import { Produto } from './../../models/Produto';
import { ProdutoService } from './../../servicos/produto/produto.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-loja-pesquisa',
    imports: [CommonModule],
    templateUrl: './loja-pesquisa.component.html',
    styleUrls: ['./loja-pesquisa.component.css'],
    standalone: true
})
export class LojaPesquisaComponent implements OnInit {
    caminhoImagem: string = `${environment.apiUrl}`;

    produtos: Produto[] = [];

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

    visualizarProduto(produto: Produto) {
        this.router.navigate(['/loja-produto', produto.id]);
    }

}
