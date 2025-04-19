import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Produto } from '../../models/Produto';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  private readonly storageKey = 'produtosLocalStorage';
  private produtos: Produto[] = [];
  private isBrowser: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.carregarProdutosDoStorage();
    }
  }

  private carregarProdutosDoStorage(): void {
    const data = localStorage.getItem(this.storageKey);
    this.produtos = data ? JSON.parse(data) : [];
  }

  private salvarProdutosNoStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.produtos));
  }

  adicionar(produto: Produto): void {
    this.produtos.push(produto);
    this.salvarProdutosNoStorage();
  }

  obterProdutos(): Produto[] {
    return [...this.produtos]; // Retorna cópia segura
  }

  removerProduto(produto: Produto): void {
    this.produtos = this.produtos.filter(p => p.id !== produto.id);
    this.salvarProdutosNoStorage();
  }

  atualizar(produtos: Produto[]): void {
    this.produtos = [...produtos];
    this.salvarProdutosNoStorage();
  }

  temItens(): boolean {
    return this.produtos.length > 0;
  }

  limparCarrinho(): void {
    this.produtos = [];
    localStorage.removeItem(this.storageKey);
  }
}
