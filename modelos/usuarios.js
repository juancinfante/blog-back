const { Schema, model} = require('mongoose');

const usuarioSchema = new Schema({
    username: {
        type: String
    },
    contraseña: {
        type: String
    },
    rol: {
        type: String,
        default: "usuario"
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
})

module.exports = model('usuarioModel', usuarioSchema);