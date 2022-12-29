import { ProdutoService } from './../../servicos/produto/produto.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-loja-produto',
    templateUrl: './loja-produto.component.html',
    styleUrls: ['./loja-produto.component.css']
})
export class LojaProdutoComponent implements OnInit {

    constructor(
        private produtoService: ProdutoService
    ) { }

    ngOnInit() {
        
    }

}
