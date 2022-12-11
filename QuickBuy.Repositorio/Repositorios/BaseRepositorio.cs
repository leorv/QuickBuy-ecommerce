using QuickBuy.Dominio.Contratos;
using QuickBuy.Repositorio.Contexto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace QuickBuy.Repositorio.Repositorios
{
    public class BaseRepositorio<T> : IBaseRepositorio<T> where T : class
    {
        protected readonly QuickBuyContexto QuickBuyContexto;

        public BaseRepositorio(QuickBuyContexto quickBuyContexto)
        {
            QuickBuyContexto = quickBuyContexto;
        }

        public void Adicionar(T entity)
        {
            QuickBuyContexto.Set<T>().Add(entity);
        }

        public void Atualizar(T entity)
        {
            QuickBuyContexto.Set<T>().Update(entity);
            QuickBuyContexto.SaveChanges();
        }

        public T ObterPorId(int id)
        {
            return QuickBuyContexto.Set<T>().Find(id);
        }

        public IEnumerable<T> ObterTodos()
        {
            return QuickBuyContexto.Set<T>().ToList();
        }

        public void Remover(T entity)
        {
            QuickBuyContexto.Remove(entity);
            QuickBuyContexto.SaveChanges();
        }

        public void Dispose()
        {
            QuickBuyContexto.Dispose();
        }
    }
}
