const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');
const { json } = require('express/lib/response');


const login = async (req, res = response) => {

    const { correo, password } = req.body;

    try {

        // Verificar si el correo existe
        const usuario = await Usuario.findOne({ correo });
        if( !usuario ){
            return res.status(400).json({
                msg: 'Usuario / Contraseña incorrectos - Correo',
            })
        }
        
        // Verificar si el usuario esta activo en BD
        if( !usuario.estado ){
            return res.status(400).json({
                msg: 'Usuario / Contraseña incorrectos - estado: false',
            })
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password);
        if( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Contraseña incorrectos - password',
            })
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id );


        res.json({
            usuario,
            token,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        })
    }
    
}


const googleSignIn = async( req, res = response ) => {

    const { id_token } = req.body;
    
    try {

        const { correo, nombre, img} = await googleVerify( id_token );

        let usuario = await Usuario.findOne({ correo });

        if( !usuario ){
            //Tengo que crearlo
            const data = {
                nombre,
                correo, 
                password: ':D',
                img,
                google: true,
            };

            usuario = new Usuario( data );
            await usuario.save();
        }

        //Verificar que el usuario este activo
        if( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado',
            });
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id );
        
        res.json({
            usuario,
            token,
        })
    } catch (error) {
        console.log(error);
    }


}


module.exports = {
    login,
    googleSignIn,
}