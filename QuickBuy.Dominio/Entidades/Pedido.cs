using QuickBuy.Dominio.ObjetoDeValor;
using System;
using System.Collections.Generic;
using System.Text;

namespace QuickBuy.Dominio.Entidades
{
    public class Pedido
    {
        public int Id { get; set; }
        public DateTime DataPedido { get; set; }
        public int UsuarioId { get; set; }
        public DateTime DataPrevisaoEntrega { get; set; }

        // Endereço de entrega
        public string EnderecoCompleto { get; set; }
        public string CEP { get; set; }
        public string Estado { get; set; }
        public int NumeroEndereco { get; set; }

        // Forma de pagamento
        public FormaPagamento FormaPagamento { get; set; }
        public int FormaPagamentoId { get; set; }


        /// <summary>
        /// Pedido deve ter pelo menos um item de pedido ou mais.
        /// </summary>
        public ICollection<ItemPedido> ItensPedido { get; set; }
    }
}
