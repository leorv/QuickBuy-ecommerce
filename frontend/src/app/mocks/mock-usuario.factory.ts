import { Usuario } from '../models/Usuario';

export function criarUsuarioMock(parcial?: Partial<Usuario>): Usuario {
    return new Usuario({
        id: 1,
        nome: 'Maria',
        sobrenome: 'Silva',
        email: 'maria@email.com',
        senha: '123456',
        administrador: true,
        ...parcial
    });
}