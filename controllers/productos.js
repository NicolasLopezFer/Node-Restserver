const { response, request } = require("express");

const { Categoria, Producto } = require('../models');

const obtenerProductos = async (req, res) => {
    const {limite = 5, desde = 0} = req.query;

    const [total, producto] = await Promise.all([
        Producto.countDocuments({ estado: true}),
        Producto.find({ estado: true})
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        producto
    })
}

const obtenerProducto = async (req, res) => {
    const { id } = req.params;

    const producto = await Producto.findById( id )
                                .populate('usuario', 'nombre')
                                .populate('categoria', 'nombre');

    res.json(producto);


}

const crearProducto = async (req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();
    const { categoriaId, precio } = req.body;

    const productoDB = await Producto.findOne({ nombre });

    if( productoDB ){
        return res.status(400).json({
            msg: `El producto ${ productoDB.nombre }, ya existe`
        })
    }

    const data = {
        nombre,
        usuario: req.usuario._id,
        precio,
        categoria: categoriaId,
    }

    const producto = new Producto(data);

    await producto.save();

    res.status(201).json(producto);
    
}

const actualizarProducto = async (req, res = response) => {
    const { id } = req.params;
    const { estado, usuario, categoria, disponible, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario - req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, {new: true});

    res.json(producto);
}

const borrarProducto = async(req, res) => {
    const { id } = req.params;
    const producto = await Producto.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.json(producto);
}


module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto,
}