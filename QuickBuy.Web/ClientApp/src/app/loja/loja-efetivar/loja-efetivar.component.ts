import { Router } from '@angular/router';
import { PedidoService } from './../../servicos/pedido/pedido.service';
import { Component, OnInit } from '@angular/core';

import { Pedido } from '../../models/Pedido';
import { ItemPedido } from './../../models/ItemPedido';
import { Produto } from './../../models/Produto';
import { UsuarioService } from './../../servicos/usuario/usuario.service';
import { CarrinhoCompras } from './../carrinho-compras';

@Component({
    selector: 'app-loja-efetivar',
    templateUrl: './loja-efetivar.component.html',
    styleUrls: ['./loja-efetivar.component.css']
})
export class LojaEfetivarComponent implements OnInit {

    carrinhoCompras: CarrinhoCompras;
    produtos: Produto[];
    total: number;

    constructor(
        private usuarioServico: UsuarioService,
        private pedidoServico: PedidoService,
        private router: Router
    ) { }

    ngOnInit() {
        this.carrinhoCompras = new CarrinhoCompras();
        this.produtos = this.carrinhoCompras.obterProdutos();
        this.atualizarTotal();
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
        this.atualizarTotal();
    }

    remover(produto: Produto) {
        this.carrinhoCompras.removerProduto(produto);
        this.produtos = this.carrinhoCompras.obterProdutos();
        this.atualizarTotal();
    }

    atualizarTotal() {
        this.total = this.produtos.reduce((acc, produto) => acc + produto.preco, 0);
    }

    efetivarCompra() {
        this.pedidoServico.efetivarCompra(this.criarPedido()).subscribe({
            next: (pedidoId: number) => {
                sessionStorage.setItem('pedidoId', pedidoId.toString());
                this.produtos = [];
                this.carrinhoCompras.limparCarrinho();
                this.router.navigate(['/compra-realizada-sucesso']);
            },
            error: err => {
                console.log(err);
            }
        });        
    }

    criarPedido(): Pedido {
        let pedido = new Pedido();
        pedido.usuarioId = this.usuarioServico.usuario.id;

        // TODO: Form para preenchimento das informações do pedido.
        // Quebra galho abaixo.
        pedido.cep = '12345678';
        pedido.estado = 'São Paulo';
        pedido.cidade = 'Marília';
        pedido.dataPrevisaoEntrega = new Date();
        pedido.formaPagamentoId = 1;
        pedido.numeroEndereco = '12';
        pedido.enderecoCompleto = 'Av. Santo Antônio';
        pedido.dataPedido = new Date();

        this.produtos = this.carrinhoCompras.obterProdutos();
        for (let produto of this.produtos) {
            let itemPedido = new ItemPedido();
            itemPedido.produtoId = produto.id;
            if (!produto.quantidade) {
                produto.quantidade = 1;
            }
            itemPedido.quantidade = produto.quantidade;
            pedido.itensPedido.push(itemPedido);
        }

        return pedido;
    }

}
