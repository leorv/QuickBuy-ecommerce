import { ItemPedido } from '../models/ItemPedido';

export function criarItemPedidoMock(parcial?: Partial<ItemPedido>): ItemPedido {
    return new ItemPedido({
        id: 1,
        produtoId: 1,
        quantidade: 2,
        ...parcial
    });
}