import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-compra-realizada-sucesso',
    templateUrl: './compra-realizada-sucesso.component.html',
    styleUrls: ['./compra-realizada-sucesso.component.css']
})
export class CompraRealizadaSucessoComponent implements OnInit {

    pedidoId: string;

    constructor() { }

    ngOnInit() {
        this.pedidoId = sessionStorage.getItem('pedidoId');
    }

}
