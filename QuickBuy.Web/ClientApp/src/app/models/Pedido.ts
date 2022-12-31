import { ItemPedido } from './ItemPedido';

export class Pedido {
    id: number;
    dataPedido: Date;
    dataPrevisaoEntrega: Date;
    enderecoCompleto: string;
    cep: string;
    cidade: string;
    estado: string;
    numeroEndereco: string;
    formaPagamentoId: number;
    usuarioId: number;

    itensPedido: ItemPedido[];

    constructor() {
        this.itensPedido = [];
    }
}