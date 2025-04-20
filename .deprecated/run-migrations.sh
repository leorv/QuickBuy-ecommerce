# Execute o comando de migração dentro do contêiner do backend.
dotnet ef database update --project QuickBuy.Repositorio --startup-project QuickBuy.Web --verbose
