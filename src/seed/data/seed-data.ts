import { ValidRolesInterface } from "../../auth/interfaces";
import { CreateUserDto } from "../../auth/dto";
import { CreateProductoDto } from "../../productos/dto";


const users: CreateUserDto[] = [
    {
        username: "Admin123",
        email: 'admin123@gmail.com',
        password: 'Admin123',
        roles: [ValidRolesInterface.admin, ValidRolesInterface.super, ValidRolesInterface.user],
        name: 'Admin',
        lastName: 'Admin'
    }
]

const products: CreateProductoDto[] = [
    {
        nombre: 'Producto 1',
        descripcion: 'Descripcion del producto 1',
        precio: 100,
        tamanoUnidad: 'unidad',
        stock: 100
    },
    {
        nombre: 'Producto 2',
        descripcion: 'Descripcion del producto 2',
        precio: 200,
        tamanoUnidad: 'unidad',
        stock: 200
    },
    {
        nombre: 'Producto 3',
        descripcion: 'Descripcion del producto 3',
        precio: 300,
        tamanoUnidad: 'unidad',
        stock: 300
    },
    {
        nombre: 'Producto 4',
        descripcion: 'Descripcion del producto 4',
        precio: 400,
        tamanoUnidad: 'unidad',
        stock: 400
    },
    {
        nombre: 'Producto 5',
        descripcion: 'Descripcion del producto 5',
        precio: 500,
        tamanoUnidad: 'unidad',
        stock: 500
    },
    {
        nombre: 'Producto 6',
        descripcion: 'Descripcion del producto 6',
        precio: 600,
        tamanoUnidad: 'unidad',
        stock: 600
    },
    {
        nombre: 'Producto 7',
        descripcion: 'Descripcion del producto 7',
        precio: 700,
        tamanoUnidad: 'unidad',
        stock: 700
    },
    {
        nombre: 'Producto 8',
        descripcion: 'Descripcion del producto 8',
        precio: 800,
        tamanoUnidad: 'unidad',
        stock: 800
    },
    {
        nombre: 'Producto 9',
        descripcion: 'Descripcion del producto 9',
        precio: 900,
        tamanoUnidad: 'unidad',
        stock: 900
    },
    {
        nombre: 'Producto 10',
        descripcion: 'Descripcion del producto 10',
        precio: 1000,
        tamanoUnidad: 'unidad',
        stock: 1000
    }
]


export const initialData = {
    initUsers: users,
    initProducts: products
}