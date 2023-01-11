export interface User {
    id: string,
    name: string,
    email: string,
    password: string,
    age: number,
    cpf: string,
    createAt: string,
    orderIs: string,
}

export interface UserLogin {
    email: string,
    password: string,
}

export interface UserRegister {
    name: string,
    email: string,
    password: string,
    age: number,
    cpf: string,
}

export interface UserUpdate {
    name?: string,
    email?: string,
    password?: string,
    age?: number,
    cpf?: string,
}