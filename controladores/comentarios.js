const Comentario = require("../modelos/comentarios")

const agregarComentario = async (req, res) => {
    try {
        const comentario = new Comentario(req.body); 
        const resp = await comentario.save();
        res.send({
            mgs : resp
        })
    } catch (error) {
        console.log(error);
    }
}
const obtenerComentario = async (req, res) => {
    try {
        const comentarios = await Comentario.find({id_articulo: req.params.id});
        res.send({ 
            comentarios
        })
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    agregarComentario,
    obtenerComentario
}