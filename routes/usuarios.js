const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { esRoleValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.get('/', usuariosGet);

router.post('/',  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(), 
    check('password', 'La contraseña es obligatorio y mas de 6 letras').isLength({min: 6}), 
    check('correo', 'El correo no es válido').isEmail(), 
    check('correo').custom( existeEmail ), 
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']), 
    check('rol').custom( esRoleValido ),
    validarCampos,
 ], usuariosPost);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom( esRoleValido ),
    validarCampos,
], usuariosPut);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);













module.exports = router;
