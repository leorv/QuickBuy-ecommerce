export class Produto {
    id: number = 0;
    nome: string = '';
    descricao: string = '';
    preco: number = 0;
    nomeArquivo: string = '';
    precoOriginal: number = 0;
    quantidade: number = 0;

    constructor(data?: Partial<Produto>) {
        Object.assign(this, data);
    }
}
