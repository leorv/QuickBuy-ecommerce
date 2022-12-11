using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using QuickBuy.Dominio.ObjetoDeValor;
using System;
using System.Collections.Generic;
using System.Text;

namespace QuickBuy.Repositorio.Config
{
    public class FormaPagamentoConfiguration : IEntityTypeConfiguration<FormaPagamento>
    {
        public void Configure(EntityTypeBuilder<FormaPagamento> builder)
        {
            // ===== Id =====
            builder.HasKey(fp => fp.Id);

            // ===== Nome =====
            builder.Property(fp => fp.Nome)
                .IsRequired()
                .HasMaxLength(20);

            // ===== Descricao =====
            builder.Property(fp => fp.Descricao)
                .HasMaxLength(200);

            // ===== Propriedades a ignorar =====
            builder.Ignore(fp => fp.EhNaoDefinido);
            builder.Ignore(fp => fp.EhCartao);
            builder.Ignore(fp => fp.EhBoleto);
            builder.Ignore(fp => fp.EhDeposito);
        }
    }
}
