using QuickBuy.Dominio.Enumeradores;
using System;
using System.Collections.Generic;
using System.Text;

namespace QuickBuy.Dominio.ObjetoDeValor
{
    public class FormaPagamento
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }

        public bool EhBoleto
        {
            get { return Id == (int)TipoFormaDePagamentoEnum.Boleto; }
        }

        public bool EhCartao
        {
            get { return Id == (int)TipoFormaDePagamentoEnum.CartaoDeCredito; }
        }

        public bool EhCartao
        {
            get { return Id == (int)TipoFormaDePagamentoEnum.Deposito; }
        }

        public bool EhCartao
        {
            get { return Id == (int)TipoFormaDePagamentoEnum.NaoDefinido; }
        }
    }
}
