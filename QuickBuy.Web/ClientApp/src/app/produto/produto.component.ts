import { Produto } from './../models/Produto';
import { ProdutoService } from './../servicos/produto/produto.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-produto',
    templateUrl: './produto.component.html',
    styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

    public nome: string;
    public liberadoParaVenda: boolean;
    produto: Produto = new Produto();

    constructor(
        private produtoService: ProdutoService
    ) { }

    ngOnInit() {
    }

    public obterNome() {
        return "Samsung";
    }

    cadastrar() {
        // this.produtoService.cadastrar(this.produto)
        //     .subscribe({
        //         next: produto => {

        //         },
        //         error: err => {
        //             console.error(err);
        //         }
        //     });
    }

}
