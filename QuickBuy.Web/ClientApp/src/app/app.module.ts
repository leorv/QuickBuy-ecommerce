import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TruncateModule } from 'ng2-truncate';

import { AppComponent } from './app.component';
import { RotasGuard } from './autorizacao/rotas.guard';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ProdutoComponent } from './produto/produto.component';
import { LoginComponent } from './usuario/login/login.component';
import { CadastroUsuarioComponent } from './cadastro/cadastro-usuario/cadastro-usuario.component';
import { PesquisaProdutoComponent } from './produto/pesquisa-produto/pesquisa-produto.component';
import { LojaPesquisaComponent } from './loja/loja-pesquisa/loja-pesquisa.component';
import { LojaProdutoComponent } from './loja/loja-produto/loja-produto.component';
import { LojaEfetivarComponent } from './loja/loja-efetivar/loja-efetivar.component';
import { CompraRealizadaSucessoComponent } from './loja/compra-realizada-sucesso/compra-realizada-sucesso.component';
import { AppRoutingModule } from './app.routing.module';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        ProdutoComponent,
        LoginComponent,
        CadastroUsuarioComponent,
        PesquisaProdutoComponent,
        LojaPesquisaComponent,
        LojaProdutoComponent,
        LojaEfetivarComponent,
        CompraRealizadaSucessoComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        TruncateModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
