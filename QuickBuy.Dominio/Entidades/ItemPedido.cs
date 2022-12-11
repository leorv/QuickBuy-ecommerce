using System;
using System.Collections.Generic;
using System.Text;

namespace QuickBuy.Dominio.Entidades
{
    public class ItemPedido : Entidade
    {
        public int Id { get; set; }
        public int ProdutoId { get; set; }
        public int Quantidade { get; set; }

        // Relações
        public virtual Pedido Pedido { get; set; }
        public int PedidoId { get; set; }

        public override void Validate()
        {
            if (ProdutoId == 0) AdicionarMensagemValidacao("Não foi identificado a referência do produto.");
            if (Quantidade <= 0) AdicionarMensagemValidacao("Quantidade não informada.");
        }
    }
}
