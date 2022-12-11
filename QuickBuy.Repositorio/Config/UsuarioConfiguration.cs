using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using QuickBuy.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Text;

namespace QuickBuy.Repositorio.Config
{
    public class UsuarioConfiguration : IEntityTypeConfiguration<Usuario>
    {
        public void Configure(EntityTypeBuilder<Usuario> builder)
        {
            // ===== Id =====
            builder.HasKey(u => u.Id);

            // ===== E-mail =====
            builder.Property(u => u.Email)
                .IsRequired()
                .HasMaxLength(80);

            // ===== Senha =====
            builder.Property(u => u.Senha)
                .IsRequired()
                .HasMaxLength(500);

            // ===== Nome =====
            builder.Property(u => u.Nome)
                .IsRequired()
                .HasMaxLength(40);
            //.HasColumnType("VARCHAR");

            // ===== Sobrenome =====
            builder.Property(u => u.Sobrenome)
                .IsRequired()
                .HasMaxLength(50);

            // ===== Usuário tem muitos pedidos, um pedido tem um usuário =====
            builder.HasMany(u => u.Pedidos)
                .WithOne(p => p.usuario);
        }
    }
}
