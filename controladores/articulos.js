const Articulo = require("../modelos/articulo")

const agregarArticulo = async (req, res) => {
    try {
        const articulo = new Articulo(req.body); 
        const resp = await articulo.save();
        res.send({
            mgs : resp
        })
    } catch (error) {
        console.log(error);
    }
}

const obtenerArticulos = async (req, res) => {
    try {
        const articulos = await Articulo.find();
        res.send({
            articulos
        })
    } catch (error) {
        console.log(error);
    }
}

const obtenerArticulo = async (req, res) => {
    try {
        const articulo = await Articulo.find({ _id: req.params.id});
        if (!articulo) {
			return res.status(404).json({
				ok: false,
				msg: 'No existe un articulo con este ID',
			});
		}
        res.status(200).json({
			ok: true,
			articulo,
		});
    } catch (error) {
        console.log(error)
    }
}
const editarArticulo = async (req, res) => {
    try {
        await Articulo.findByIdAndUpdate(req.body._id, req.body);
        res.status(200).json({
            msg: "producto actualizado"
        })
        console.log("funciona")
    } catch (error) {
        res.status(400).json({
            msg: error
        })
    }
}
const eliminarArticulo = async (req, res) => {
    try {
        await Articulo.findByIdAndDelete(req.params.id);
        res.json({
          msg: "Articulo eliminado."  
        })
    } catch (error) {
        res.status(400).json({
            msg: error
        })
    }
}

module.exports = {
    agregarArticulo,
    obtenerArticulos,
    obtenerArticulo,
    editarArticulo,
    eliminarArticulo
}