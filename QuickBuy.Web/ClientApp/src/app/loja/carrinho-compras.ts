import { Produto } from "../models/Produto";


export class CarrinhoCompras {

    produtos: Produto[] = [];

    constructor() { }

    adicionar(produto: Produto) {
        var produtosLocalStorage = localStorage.getItem('produtosLocalStorage');
        if (!produtosLocalStorage) {
            this.produtos.push(produto);
        } else {
            this.produtos = JSON.parse(produtosLocalStorage);
            this.produtos.push(produto);
        }
        localStorage.setItem('produtosLocalStorage', JSON.stringify(this.produtos));
    }

    obterProdutos(): Produto[] {
        var produtosLocalStorage = localStorage.getItem('produtosLocalStorage');
        if (produtosLocalStorage) {
            return JSON.parse(produtosLocalStorage);
        }
    }

    removerProduto(produto: Produto) {
        // O abaixo não é boa prática.
        var produtosLocalStorage = localStorage.getItem('produtosLocalStorage');
        if (produtosLocalStorage) {
            this.produtos = JSON.parse(produtosLocalStorage);
            this.produtos = this.produtos.filter(p => p.id != produto.id);
            localStorage.setItem('produtosLocalStorage', JSON.stringify(this.produtos));
        }
    }

    atualizar(produtos: Produto[]) {
        localStorage.setItem('produtosLocalStorage', JSON.stringify(produtos));
    }

    temItens(): boolean {
        if (this.obterProdutos()) {
            return true;
        }
        return false;
    }

}