export class Usuario {
    id: number = 0;
    email: string = '';
    senha: string = '';
    nome: string = '';
    sobrenome: string = '';
    administrador: boolean = false;

    constructor(data?: Partial<Usuario>) {
        Object.assign(this, data);
    }
}