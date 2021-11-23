const express = require('express')
var cors = require('cors')

class Server {

    constructor() {
        this.app = express()
        this.puerto = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // Middlewares
        this.middlewares();

        // Rutas de mi applicación
        this.routes();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio publico
        this.app.use( express.static('public') );
    }

    routes(){
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {

        this.app.listen(this.puerto, () =>{
            console.log('Servidor corriendo en puerto', this.puerto);
        });
    }

}

module.exports = Server;