using System;
using System.Collections.Generic;
using System.Text;

namespace QuickBuy.Dominio.Contratos
{
    public interface IBaseRepositorio<T> : IDisposable where T : class
    {
        void Adicionar(T entity);
        T ObterPorId(int id);
        IEnumerable<T> ObterTodos();
        void Atualizar(T entity);
        void Remover(T entity);
    }
}
