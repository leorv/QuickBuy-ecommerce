import { Pedido } from '../models/Pedido';
import { criarItemPedidoMock } from './mock-item-pedido.factory';

export function criarPedidoMock(parcial?: Partial<Pedido>): Pedido {
    return new Pedido({
        id: 1,
        enderecoCompleto: 'Rua das Flores, 123',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '12345-678',
        numeroEndereco: '123',
        formaPagamentoId: 1,
        usuarioId: 1,
        itensPedido: [
            criarItemPedidoMock({ produtoId: 2, quantidade: 3 }),
            criarItemPedidoMock({ produtoId: 4, quantidade: 1 })
        ],
        ...parcial
    });
}