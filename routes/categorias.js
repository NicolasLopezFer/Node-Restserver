const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

//Obtener todas las categorías - público
router.get('/', (req, res) => {
    res.json('get');
});

//Obtener una categoría - público
router.get('/:id', (req, res) => {
    res.json('get - id');
});

//Crear categoria - privado - cualquier rol
router.post('/', (req, res) => {
    res.json('post');
});

//Actualizar un registro - privado - cualquier rol
router.put('/:id', (req, res) => {
    res.json('put');
});


//Borrar una categoría - admin
router.delete('/:id', (req, res) => {
    res.json('delete');
});

module.exports= router;

