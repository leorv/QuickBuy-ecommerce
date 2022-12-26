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
    arquivoSelecionado: File;
    ativarSpinner: boolean = false;

    stringImagem: any;

    constructor(
        private produtoService: ProdutoService
    ) { }

    ngOnInit() {
    }

    public obterNome() {
        return "Samsung";
    }

    cadastrar() {
        this.produtoService.cadastrar(this.produto)
            .subscribe({
                next: produto => {

                },
                error: err => {
                    console.error(err);
                }
            });
    }

    inputImageChange(files: FileList) {
        // TODO: melhorar isso deixando essa responsabilidade unicamente com o cadastrar. Usar map, switchMap, para evitar subscribers aninhados.
        this.ativarSpinner = true;
        this.arquivoSelecionado = files.item(0);
        alert(this.arquivoSelecionado.name);

        this.produtoService.enviarArquivo(this.arquivoSelecionado)
            .subscribe({
                next: result => {
                    this.produto.nomeArquivo = result.nome;
                    console.log(this.produto);
                    this.ativarSpinner = false;
                    this.stringImagem = result;
                },
                error: err => {
                    console.log('Ocorreu um erro ao tentar inserir a imagem.');
                    
                    console.error(err);
                    this.ativarSpinner = false;
                }
            });
    }

}
