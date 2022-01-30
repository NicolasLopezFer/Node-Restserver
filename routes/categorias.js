const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');

const router = Router();

//Obtener todas las categorías - público
router.get('/', obtenerCategorias);

//Obtener una categoría - público
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos,
], obtenerCategoria);

//Crear categoria - privado - cualquier rol
router.post('/', [ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
 ], crearCategoria );

//Actualizar un registro - privado - cualquier rol
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarJWT,
    validarCampos,
], actualizarCategoria);


//Borrar una categoría - admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos,
], borrarCategoria);

module.exports= router;

