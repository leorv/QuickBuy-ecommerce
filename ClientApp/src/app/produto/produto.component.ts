import { CommonModule } from '@angular/common';
import { Produto } from './../models/Produto';
import { ProdutoService } from './../servicos/produto/produto.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-produto',
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './produto.component.html',
    styleUrls: ['./produto.component.css'],
    preserveWhitespaces: true,
    standalone: true
})
export class ProdutoComponent implements OnInit {

    productId: number = 0;
    nome: string = '';
    liberadoParaVenda: boolean = false;
    produto: Produto = new Produto();
    arquivoSelecionado: File | null = null;
    ativarSpinner: boolean = false;
    mensagem: string = '';

    stringImagem: any;

    constructor(
        private produtoService: ProdutoService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.productId = +id;
            this.produtoService.obterPorId(this.productId).subscribe({
                next: (produto) => this.produto = produto,
                error: (err) => console.error(err)
            });
        }
    }

    public obterNome() {
        return "Samsung";
    }

    cadastrar() {
        if (this.productId != 0) {
            this.atualizarProduto();
        } else {
            this.produtoService.criar(this.produto)
                .subscribe({
                    next: () => this.router.navigate(['/pesquisar-produtos']),
                    error: err => {
                        console.error(err);
                        this.mensagem = `Erro ao cadastrar: ${err.error}`;
                    }
                });
        }
    }

    atualizarProduto() {
        if (!this.produto.id) {
            this.mensagem = 'Produto inválido para atualização.';
            return;
        }

        this.produtoService.atualizar(this.produto).subscribe({
            next: () => this.router.navigate(['/pesquisar-produtos']),
            error: err => {
                console.error('Erro ao atualizar produto.', err);
                this.mensagem = `Erro ao atualizar: ${err.error}`;
            }
        });
    }

    // TODO: Refatoração do serviço de produtos com RxJS moderno (switchMap, catchError).

    inputImageChange(event: Event) {

        const input = event.target as HTMLInputElement;

        if (!input || !input.files || input.files.length === 0) {
            alert('Arquivo inválido ou não selecionado');
            return;
        }

        this.ativarSpinner = true;

        this.arquivoSelecionado = input.files.item(0);

        if (this.arquivoSelecionado == null) {
            alert('Erro: Arquivo de imagem nulo.');
            return;
        }

        this.produtoService.enviarArquivo(this.arquivoSelecionado)
            .subscribe({
                next: result => {
                    this.produto.nomeArquivo = result.nome;
                    console.log(this.produto);
                    this.ativarSpinner = false;
                    this.stringImagem = result;
                },
                error: err => {
                    console.error('Erro ao enviar a imagem.', err);
                    this.ativarSpinner = false;
                    this.mensagem = err.error;
                }
            });
    }

}
