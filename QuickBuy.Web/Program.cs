using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using QuickBuy.Dominio.Contratos;
using QuickBuy.Repositorio.Contexto;
using QuickBuy.Repositorio.Repositorios;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

// To Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument(config =>
{
    config.DocumentName = "QuickBuyAPI";
    config.Title = "QuickBuyAPI v1";
    config.Version = "v1";
});

// Serviços da aplicação
builder.Services.AddScoped<IProdutoRepositorio, ProdutoRepositorio>();
builder.Services.AddScoped<IUsuarioRepositorio, UsuarioRepositorio>();
builder.Services.AddScoped<IPedidoRepositorio, PedidoRepositorio>();

builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

// Era assim na versão 2.2. Não sei como fazer isso nesta nova versão do .net, será que tem um jeito certo de acessar a string de conexão?:
// var connectionString = Configuration.GetConnectionString("QuickBuyDB");
// builder.services.AddDbContext<QuickBuyContexto>(option => option.UseLazyLoadingProxies()
//     .UseMySql(
//         connectionString,
//         m => m.MigrationsAssembly("QuickBuy.Repositorio")
//     ));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwaggerUi(config =>
    {
        config.DocumentTitle = "QuickBuyAPI";
        config.Path = "/swagger";
        config.DocumentPath = "/swagger/{documentName}/swagger.json";
        config.DocExpansion = "list";
    });
}

app.UseHttpsRedirection();
app.MapControllers();
app.UseAuthorization();

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(builder.Environment.WebRootPath, "imagens-produtos")),
    RequestPath = "/imagens-produtos"
});


app.Run();
