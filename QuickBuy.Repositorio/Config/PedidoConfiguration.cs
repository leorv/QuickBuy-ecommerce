using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using QuickBuy.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Text;

namespace QuickBuy.Repositorio.Config
{
    public class PedidoConfiguration : IEntityTypeConfiguration<Pedido>
    {
        public void Configure(EntityTypeBuilder<Pedido> builder)
        {
            // ===== Id =====
            builder.HasKey(p => p.Id);

            // ===== Data do pedido =====
            builder.Property(p => p.DataPedido)
                .IsRequired();

            // ===== Data previsão de entrega =====
            builder.Property(p => p.DataPrevisaoEntrega)
                .IsRequired();

            // ===== Endereço completo =====
            builder.Property(p => p.EnderecoCompleto)
                .IsRequired()
                .HasMaxLength(60);

            // ===== CEP =====
            builder.Property(p => p.CEP)
                .IsRequired()
                .HasMaxLength(12);

            // ===== Estado =====
            builder.Property(p => p.Estado)
                .IsRequired()
                .HasMaxLength(30);

            // ===== Número do endereço =====
            builder.Property(p => p.NumeroEndereco)
                .IsRequired()
                .HasMaxLength(10);

            // ===== Um pedido tem uma forma de pagamento =====
            builder.HasOne(p => p.FormaPagamento);

            // ===== Um pedido deve ter um ou mais itens de pedido =====
            builder.HasMany(p => p.ItensPedido)
                .WithOne(i => i.Pedido);

            // ===== Pedido tem um usuário =====
            // Determinado na classe UsuarioConfiguration.


        }
    }
}
