const { Schema, model } = require('mongoose');

const articuloSchema = new Schema({
    titulo: {
        type: String
    },
    descripcion: {
        type: String
    },
    contenido: {
        type: String
    },
    autor: {
        type: String
    },
    imagen: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
})

module.exports = model('articuloModel', articuloSchema);