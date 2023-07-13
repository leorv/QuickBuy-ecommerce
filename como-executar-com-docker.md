# Executar o App com o Docker

Criar o container dotnet2.2

`docker container run --name quickbuy-dotnet2.2-angular6 -it -p 5000:5002 -v $(pwd):/app mcr.microsoft.com/dotnet/core/sdk:2.2`

Criar o container do mysql5.7

`docker container run -d --name mysql5.7-quickbuy -v dados-quickbuy:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=numsey mysql:5.7`

Inspecionar a rede docker:

`docker network inspect bridge`

Dentro do resultado, ver os containers e pegar o IPv4 do MySql.

Alterar a string de conexão, de acordo com o IP do MySql no arquivo config.json do projeto QuickBuy.Web.

Para entrar no container MySql:
`docker exec -it mysql5.7-quickbuy /bin/bash`
Lá dentro:
`mysql -u root -p`
Usar a senha definida no config.json.

Para entrar no container dotnet2.2:
`docker container exec -it quickbuy-dotnet2.2-angular6 /bin/bash`

Instalar o node e npm:
`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash`
`wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash`
```
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

`nvm install 10.24.1`

Rodar o projeto:
`dotnet restore`
`dotnet ef database update --project QuickBuy.Repositorio --startup-project QuickBuy.Web --verbose`
`dotnet run --project QuickBuy.Web`
Pode ocorrer um erro referente o https, rode:
`dotnet dev-certs https`
