using Microsoft.EntityFrameworkCore;
using QuickBuy.Dominio.Entidades;
using QuickBuy.Dominio.ObjetoDeValor;
using QuickBuy.Repositorio.Config;
using System;
using System.Collections.Generic;
using System.Text;

namespace QuickBuy.Repositorio.Contexto
{
    public class QuickBuyContexto : DbContext
    {
        public QuickBuyContexto(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Pedido> Pedidos { get; set; }
        public DbSet<Produto> Produtos { get; set; }
        public DbSet<ItemPedido> ItensPedidos { get; set; }
        public DbSet<FormaPagamento> FormaPagamento { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Classes de mapeamento.
            modelBuilder.ApplyConfiguration(new UsuarioConfiguration());
            modelBuilder.ApplyConfiguration(new ProdutoConfiguration());
            modelBuilder.ApplyConfiguration(new PedidoConfiguration());
            modelBuilder.ApplyConfiguration(new ItemPedidoConfiguration());
            modelBuilder.ApplyConfiguration(new FormaPagamentoConfiguration());

            // Popular a forma de pagamento.
            modelBuilder.Entity<FormaPagamento>().HasData(new FormaPagamento()
            {
                Id = 1,
                Nome = "Boleto",
                Descricao = "Boleto bancário"
            },
            new FormaPagamento()
            {
                Id = 2,
                Nome = "Cartão de Crédito",
                Descricao = "Forma de pagamento com cartão de crédito."
            },
            new FormaPagamento()
            {
                Id = 3,
                Nome = "Depósito",
                Descricao = "Forma de pagamento por depósito."
            }
            );

            base.OnModelCreating(modelBuilder);
        }

    }
}
