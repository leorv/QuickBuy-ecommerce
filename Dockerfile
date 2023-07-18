FROM mcr.microsoft.com/dotnet/core/sdk:2.2-bionic AS build
LABEL version="1.0.1" description="Aplicação ASP .NET Core Angular App"
WORKDIR /source

# Instalação do Node.js 10.x
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs

# copy csproj and restore as distinct layers
COPY *.sln .
COPY global.json .
COPY QuickBuy.Web/*.csproj ./QuickBuy.Web/
COPY QuickBuy.Repositorio/*.csproj ./QuickBuy.Repositorio/
COPY QuickBuy.Dominio/*.csproj ./QuickBuy.Dominio/
RUN dotnet restore

# copy everything else and build app
COPY QuickBuy.Web/. ./QuickBuy.Web/
COPY QuickBuy.Repositorio/. ./QuickBuy.Repositorio/
COPY QuickBuy.Dominio/. ./QuickBuy.Dominio/
RUN dotnet publish QuickBuy.Web/QuickBuy.Web.csproj -c release -o /app

# final stage/image
FROM mcr.microsoft.com/dotnet/core/aspnet:2.2
WORKDIR /app
COPY --from=build /app ./
EXPOSE 80/tcp
ENTRYPOINT ["dotnet", "QuickBuy.Web.dll"]