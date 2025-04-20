export class ItemPedido {
    id: number = 0;
    produtoId: number = 0;
    quantidade: number = 0;

    constructor(data?: Partial<ItemPedido>) {
        Object.assign(this, data);
    }
}