# Dockerfile para o contêiner quickbuy-web

# Usar a imagem base do SDK do .NET Core 2.2
FROM mcr.microsoft.com/dotnet/core/sdk:2.2

# Diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar os arquivos do projeto para o contêiner
COPY . .

# Restaurar as dependências do projeto
RUN dotnet restore

# Publicar a aplicação
RUN dotnet publish -c Release -o out

# Definir a variável de ambiente para o ASP.NET Core
# ENV ASPNETCORE_URLS=http://+:4200

# Expor a porta 4200 do contêiner
EXPOSE 4200

# Comando para iniciar a aplicação
CMD ["dotnet", "out/QuickBuy.Web.dll"]
