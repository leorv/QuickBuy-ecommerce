using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using QuickBuy.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Text;

namespace QuickBuy.Repositorio.Config
{
    public class ItemPedidoConfiguration : IEntityTypeConfiguration<ItemPedido>
    {
        public void Configure(EntityTypeBuilder<ItemPedido> builder)
        {
            // ===== Id =====
            builder.HasKey(ip => ip.Id);

            // ===== ProdutoId =====
            builder.Property(ip => ip.ProdutoId)
                .IsRequired();

            // ===== Quantidade =====
            builder.Property(ip => ip.Quantidade)
                .IsRequired();
        }
    }
}
