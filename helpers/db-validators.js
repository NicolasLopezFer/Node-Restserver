const Role = require('../models/rol');
const Usuario = require('../models/usuario');

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


module.exports = {
    esRoleValido,
    existeEmail,
}