import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

    public nome: string;
    public liberadoParaVenda: boolean;

  constructor() { }

  ngOnInit() {
  }

  public obterNome(): string {
    return "Samsung";
  }

}
