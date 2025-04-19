import { Produto } from '../models/Produto';

export function criarProdutoMock(parcial?: Partial<Produto>): Produto {
    return new Produto({
        id: 1,
        nome: 'Camiseta Preta',
        descricao: 'Uma camiseta básica preta',
        preco: 59.90,
        nomeArquivo: 'camiseta-preta.png',
        precoOriginal: 79.90,
        quantidade: 10,
        ...parcial // permite sobrescrever qualquer campo
    });
}