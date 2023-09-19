const Usuario = require("../modelos/usuarios");
const bcrypt = require('bcrypt');


const loginUsuario = async (req, res) => {
    const { username, contraseña } = req.body;

    try {
        let usuarioExiste = await Usuario.findOne({ username });
        if (!usuarioExiste) {
            return res.status(404).json({
                msg: "Email o contraseña incorrectos."
            })
        }else{
            const validarContraseña = bcrypt.compareSync(contraseña, usuarioExiste.contraseña);
            if (!validarContraseña) {
                return res.status(404).json({
                    msg: "Email o contraseña incorrectos"
                })
            }
            res.status(200).json({
                msg: "Logueado con exito!",
                id: usuarioExiste._id
            })
        }

    } catch (error) {
        res.status(400).json({
            msg: error
        })
    }
} 
const registroUsuario = async (req, res) => {

    const { username, contraseña } = req.body;

    try {
        let usuarioExiste = await Usuario.findOne({ username });
        if (usuarioExiste) {
            return res.status(400).json({
                msg: "Esta nombre de usuario ya esta en uso"
            })
        }
        let usuario = new Usuario(req.body);
        
        // BCRYP
        const salt = bcrypt.genSaltSync(10);
        usuario.contraseña = bcrypt.hashSync(contraseña, salt);

        await usuario.save();
        res.status(200).json({
            msg: "Usuario creado",
            id: usuario._id
        })

    } catch (error) {
        res.status(400).json({
            msg: error
        })
    }
}

const obtenerUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.find({ _id: req.params.id });
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe usuario con este id',
            });
        }
        res.status(200).json({
            ok: true,
            usuario
        });
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    registroUsuario,
    obtenerUsuario,
    loginUsuario
}