import { Router, ActivatedRoute } from '@angular/router';
import { Produto } from './../../models/Produto';
import { ProdutoService } from './../../servicos/produto/produto.service';
import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../../servicos/carrinho/carrinho.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-loja-produto',
    imports: [CommonModule],
    templateUrl: './loja-produto.component.html',
    styleUrls: ['./loja-produto.component.css'],
    standalone: true
})
export class LojaProdutoComponent implements OnInit {

    produtoValido: boolean = false;
    mensagemErro: string = '';
    caminhoImagem: string = `${environment.apiUrl}`;

    produto: Produto = new Produto();

    constructor(
        private produtoService: ProdutoService,
        private router: Router,
        private carrinhoService: CarrinhoService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        const produtoId = this.route.snapshot.paramMap.get('id');
        if (produtoId) {
            this.produtoValido = true;
            this.produtoService.obterPorId(+produtoId).subscribe({
                next: produto => this.produto = produto,
                error: err => {
                    this.produtoValido = false;
                    console.error('Produto não encontrado ou ocorreu um erro no carregamento.', err);
                    this.mensagemErro = 'Produto não encontrado ou ocorreu um erro no carregamento.';
                }})
        } else {
            this.mensagemErro = 'Ocorreu um erro ao tentarmos mostrar o produto. Id do produto é inválido.';
            this.produtoValido = false;
        }
    }

    comprar() {
        this.carrinhoService.adicionar(this.produto);
        this.router.navigate(['/loja-efetivar']);
    }
}