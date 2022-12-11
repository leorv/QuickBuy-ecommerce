using System;
using System.Collections.Generic;
using System.Text;

namespace QuickBuy.Dominio.Entidades
{
    public class Usuario : Entidade
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public string Nome { get; set; }
        public string Sobrenome { get; set; }

        /// <summary>
        /// Um usuário pode ter nenhum ou mais pedidos.
        /// É virtual para o EF Core alimentar em tempo de
        /// execução para os pedidos que estiverem na base.
        /// </summary>
        public virtual ICollection<Pedido> Pedidos { get; set; }

        public override void Validate()
        {
            if (string.IsNullOrEmpty(Email)) AdicionarMensagemValidacao("Não foi informado e-mail.");
            if (string.IsNullOrEmpty(Nome)) AdicionarMensagemValidacao("Não foi informado nome do usuário.");
            if (string.IsNullOrEmpty(Senha)) AdicionarMensagemValidacao("Não foi informado a senha do usuário.");
        }
    }
}
