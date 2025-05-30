import { Routes } from '@angular/router';
import { RotasGuard } from './autorizacao/rotas.guard';
import { CadastroUsuarioComponent } from './cadastro/cadastro-usuario/cadastro-usuario.component';
import { HomeComponent } from './home/home.component';
import { CompraRealizadaSucessoComponent } from './loja/compra-realizada-sucesso/compra-realizada-sucesso.component';
import { LojaEfetivarComponent } from './loja/loja-efetivar/loja-efetivar.component';
import { LojaProdutoComponent } from './loja/loja-produto/loja-produto.component';
import { PesquisaProdutoComponent } from './produto/pesquisa-produto/pesquisa-produto.component';
import { ProdutoComponent } from './produto/produto.component';
import { LoginComponent } from './usuario/login/login.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'loja-produto:id', component: LojaProdutoComponent },
    { path: 'loja-efetivar', component: LojaEfetivarComponent, canActivate: [RotasGuard] },
    { path: 'entrar', component: LoginComponent },
    { path: 'novo-usuario', component: CadastroUsuarioComponent },
    { path: 'pesquisar-produtos', component: PesquisaProdutoComponent, canActivate: [RotasGuard] },
    { path: 'produto', component: ProdutoComponent, canActivate: [RotasGuard] },
    { path: 'produto:id', component: ProdutoComponent, canActivate: [RotasGuard] },
    { path: 'compra-realizada-sucesso:id', component: CompraRealizadaSucessoComponent, canActivate: [RotasGuard]}
];

