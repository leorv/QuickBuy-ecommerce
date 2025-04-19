import { ProdutoService } from './../../servicos/produto/produto.service';
import { Produto } from './../../models/Produto';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-pesquisa-produto',
    imports: [CommonModule],
    templateUrl: './pesquisa-produto.component.html',
    styleUrls: ['./pesquisa-produto.component.css'],
    standalone: true
})
export class PesquisaProdutoComponent implements OnInit {

    carregando: boolean = true;
    caminhoImagem: string = `${environment.apiUrl}/imagens-produtos/`;

    produtos: Produto[] = [];

    constructor(
        private produtoService: ProdutoService,
        private router: Router
    ) { }

    ngOnInit() {
        this.produtoService.obterTodos().subscribe({
            next: (produtos: Produto[]) => {
                this.produtos = produtos;
                this.carregando = false;
            },
            error: err => {
                console.log(err);
                this.carregando = false;
            }
        })
    }

    adicionarProduto() {
        localStorage.setItem('produtoSessao', '');
        this.router.navigate(['/produto']);
    }

    deletarProduto(produto: Produto) {
        var retorno = confirm(`Deseja realmente deletar o produto ${produto.nome}?`);
        if (retorno == true) {
            this.produtoService.deletar(produto.id).subscribe({
                next: () => {
                    this.produtos = this.produtos.filter(p => p.id !== produto.id);
                },
                error: err => {
                    console.error('Ocorreu um erro ao deletar o produto.', produto);
                }
            })
        }

    }

    editarProduto(produto: Produto) {
        this.router.navigate(['/produto', produto.id]);
    }

}
