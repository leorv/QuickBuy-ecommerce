import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
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
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        FormsModule,
        TruncateModule,
        RouterModule.forRoot([
            { path: '', component: HomeComponent, pathMatch: 'full' },
            { path: 'loja-produto', component: LojaProdutoComponent },
            { path: 'loja-efetivar', component: LojaEfetivarComponent, canActivate: [RotasGuard] },
            { path: 'entrar', component: LoginComponent },
            { path: 'novo-usuario', component: CadastroUsuarioComponent },
            { path: 'pesquisar-produtos', component: PesquisaProdutoComponent, canActivate: [RotasGuard] },
            { path: 'produto', component: ProdutoComponent, canActivate: [RotasGuard] },
            { path: 'compra-realizada-sucesso', component: CompraRealizadaSucessoComponent}
        ])
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
