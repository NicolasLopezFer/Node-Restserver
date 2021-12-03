const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.get('/', usuariosGet);

router.post('/',  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(), 
    check('password', 'La contraseña es obligatorio y mas de 6 letras').isLength({min: 6}), 
    check('correo', 'El correo no es válido').isEmail(), 
    check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']), 
    validarCampos,
 ], usuariosPost);

router.put('/:id', usuariosPut);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);













module.exports = router;
