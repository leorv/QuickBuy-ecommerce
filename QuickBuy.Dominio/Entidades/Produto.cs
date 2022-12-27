using System;
using System.Collections.Generic;
using System.Text;

namespace QuickBuy.Dominio.Entidades
{
    public class Produto : Entidade
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public decimal Preco { get; set; }
        public string NomeArquivo { get; set; }

        public override void Validate()
        {
            try
            {
                if (Nome.Length == 0) AdicionarMensagemValidacao("Produto não possui nome.");
                if (Preco <= 0) AdicionarMensagemValidacao("Informar um preço válido.");
            }
            catch (NullReferenceException) {
                AdicionarMensagemValidacao("Produto não possui nome.");
            }

        }
    }
}
