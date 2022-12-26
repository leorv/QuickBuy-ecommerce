using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using QuickBuy.Dominio.Contratos;
using QuickBuy.Repositorio.Contexto;
using QuickBuy.Repositorio.Repositorios;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace QuickBuy.Web
{
    public class Startup
    {
        // Um arquivo de json que terá as configurações do nosso sistema.
        // Essa atribuição será feita no método construtor.
        public IConfiguration Configuration { get; }

        public Startup()
        {
            // Construtor de configurações, arquivo JSON.
            // config.json deve ter como propriedade no projeto o "Copiar sempre"
            // para o diretório de saída.
            // <ItemGroup>
            //  < Content Update = "config.json" >
            //    < CopyToOutputDirectory > Always </ CopyToOutputDirectory >
            //  </ Content >
            // </ ItemGroup >
            // Artigo interessante:
            // https://learn.microsoft.com/pt-br/archive/msdn-magazine/2017/december/cutting-edge-configuring-asp-net-core-applications
            var builder = new ConfigurationBuilder();
            builder.AddJsonFile("config.json", optional: false, reloadOnChange: true);

            Configuration = builder.Build();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            var connectionString = Configuration.GetConnectionString("QuickBuyDB");
            services.AddDbContext<QuickBuyContexto>(option => option.UseLazyLoadingProxies()
                .UseMySql(
                    connectionString,
                    m => m.MigrationsAssembly("QuickBuy.Repositorio")
                ));

            services.AddScoped<IProdutoRepositorio, ProdutoRepositorio>();
            services.AddScoped<IUsuarioRepositorio, UsuarioRepositorio>();

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        // Configurar o pipeline do ASP .NET Core
        // Como ele trata cada requisição.
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    /**
                     * É possível usar o processo do Angular em separado com o do
                     * ASP .NET Core.
                     * Comentar a linha abaixo spa.Use...
                     * Quando colocar a aplicação do .net pra rodar, ele vai rodar ela e a do
                     * Angular.
                     * dar um ng serve.
                     * Ao invés de usar o CliServer, usar:
                     * spa.UseProxyToSpaDevelopmentServer("http://localhost:4200/");
                     */
                    // spa.UseAngularCliServer(npmScript: "start");
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:4200/");

                }
            });
        }
    }
}
