const Role = require('../models/rol');
const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');
const { Producto } = require('../models');

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if( !existeRol ){
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}

const existeEmail = async (correo = '') => {
    
    //Verificar si el correo existe
    const email = await Usuario.findOne({ correo });
    if( email ){
        throw new Error(`El correo: ${ correo } ya esta registrado`);
    }
}

const existeUsuarioPorId = async (id) => {
    
    const existeUsuario = await Usuario.findById( id );
    if( !existeUsuario ){
        throw new Error(`El id no existe: ${ id }`);
    }
}

const existeCategoriaPorId = async (id) => {
    const existeCategoria = await Categoria.findById( id );
    if(!existeCategoria ) {
        throw new EvalError(`El id no existe: ${ id }`);
    }

}

const existeProductoPorId = async (id) => {
    const existeProducto = await Producto.findById( id );
    if( !existeProducto ){
        throw new EvalError(`El id no existe: ${ id }`);

    }
}


module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
}