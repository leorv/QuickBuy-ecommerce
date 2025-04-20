FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ./QuickBuy.Repositorio ./QuickBuy.Repositorio
COPY ./QuickBuy.Web ./QuickBuy.Web
COPY ./QuickBuy.Dominio ./QuickBuy.Dominio
COPY global.json .
COPY QuickBuy.sln .

RUN dotnet restore
RUN dotnet build -c Release -o /app/build
RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 80
ENV ASPNETCORE_URLS=http://+:80
ENTRYPOINT ["dotnet", "QuickBuy.Web.dll"]
