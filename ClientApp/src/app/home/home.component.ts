import { Component } from '@angular/core';
import { LojaPesquisaComponent } from '../loja/loja-pesquisa/loja-pesquisa.component';

@Component({
  selector: 'app-home',
  imports: [LojaPesquisaComponent],
  templateUrl: './home.component.html',
  standalone: true
})
export class HomeComponent {
}
