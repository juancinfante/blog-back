const { Schema, model } = require('mongoose');

const comentarioSchema = new Schema({
    id_articulo: {
        type: String
    },
    username: {
        type: String
    },
    texto: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
})

module.exports = model('comentarioModel', comentarioSchema);