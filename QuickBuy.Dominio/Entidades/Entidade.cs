using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace QuickBuy.Dominio.Entidades
{
    public abstract class Entidade
    {
        private List<string> _mensagens { get; set; }
        private List<string> mensagemValidacao
        {
            get { return _mensagens ?? (_mensagens = new List<string>()); }
        }

        public abstract void Validate();
        public bool EhValido
        {
            get { return !mensagemValidacao.Any(); }
        }

        public string ObterMensagensValidacao()
        {
            return string.Join(". ", mensagemValidacao);
        }

        protected void LimparMensagensValidacao()
        {
            mensagemValidacao.Clear();
        }

        protected void AdicionarMensagemValidacao(string mensagem)
        {
            mensagemValidacao.Add(mensagem);
        }
    }
}
