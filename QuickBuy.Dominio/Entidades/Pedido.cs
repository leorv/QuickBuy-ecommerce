using QuickBuy.Dominio.ObjetoDeValor;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace QuickBuy.Dominio.Entidades
{
    public class Pedido : Entidade
    {
        public int Id { get; set; }
        public DateTime DataPedido { get; set; }
        public DateTime DataPrevisaoEntrega { get; set; }

        // Endereço de entrega
        public string EnderecoCompleto { get; set; }
        public string CEP { get; set; }
        public string Estado { get; set; }
        public string NumeroEndereco { get; set; }

        /// <summary>
        /// Pedido tem uma forma de pagamento.
        /// </summary>
        public virtual FormaPagamento FormaPagamento { get; set; }
        public int FormaPagamentoId { get; set; }


        /// <summary>
        /// Pedido deve ter pelo menos um item de pedido ou mais.
        /// </summary>
        public virtual ICollection<ItemPedido> ItensPedido { get; set; }

        /// <summary>
        /// Um pedido tem um usuário.
        /// </summary>
        public int UsuarioId { get; set; }
        public virtual Usuario usuario { get; set; }

        public override void Validate()
        {
            if (!ItensPedido.Any()) AdicionarMensagemValidacao("Crítica: Pedido não pode existir sem ao menos um item.");

            if (string.IsNullOrEmpty(CEP)) AdicionarMensagemValidacao("Crítica: CEP deve ser informado.");

            if (FormaPagamentoId == 0) AdicionarMensagemValidacao("Não foi informado a forma de pagamento.");

        }
    }
}
