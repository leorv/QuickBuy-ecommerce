import { ItemPedido } from './ItemPedido';

export class Pedido {
    id: number = 0;
    dataPedido: Date = new Date();
    dataPrevisaoEntrega: Date = new Date();
    enderecoCompleto: string = '';
    cep: string = '';
    cidade: string = '';
    estado: string = '';
    numeroEndereco: string = '';
    formaPagamentoId: number = 0;
    usuarioId: number = 0;
    itensPedido: ItemPedido[] = [];

    constructor(data?: Partial<Pedido>) {
        Object.assign(this, data);
        // Garante que itensPedido seja um array mesmo que venha undefined
        this.itensPedido = data?.itensPedido ?? [];
    }
}