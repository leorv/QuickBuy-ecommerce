# Log de atualização

Este App originalmente foi feito com o ASP.NET Core 2.2 e Angular 6.

Porém, tentarei sempre dar atenção e atualização para ele, para fins de atualização profissional e aprendizado. Ou seja, para que eu não fique obsoleto como os pacotes! :S

## DEPRECATED Microsoft.AspNetCore.SpaServices

O pacote acima está obsoleto e não é mais necessário.

Esses pacotes serão removidos posteriormente no .NET 5. Se você estiver usando esses pacotes, atualize seus aplicativos para usar a funcionalidade em `Microsoft.AspNetCore.SpaServices.Extensions` em vez da funcionalidade fornecida pelas estruturas SPA que você está usando. Para habilitar recursos como pré-renderização do lado do servidor e recarregamento de módulo a quente, consulte a documentação para as estruturas SPA correspondentes. A funcionalidade em `Microsoft.AspNetCore.SpaServices.Extensions` não está obsoleta e continuará a ter suporte.

### Referência

Link: https://github.com/dotnet/AspNetCore/issues/12890