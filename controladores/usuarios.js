const Usuario = require("../modelos/usuarios");
const bcrypt = require('bcrypt');
const { json } = require("body-parser");
const jwt = require('jsonwebtoken');


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

            const payload = {
                id: usuarioExiste._id,
                username: usuarioExiste.username,
                rol: usuarioExiste
            }

            const token = jwt.sign(payload,process.env.SECRET_JWT,{
                expiresIn: "10s"
            })

            res.status(200).json({
                msg: "Logueado con exito!",
                id: usuarioExiste._id,
                token
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
        const usuario = await Usuario.findById(req.params.id);
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
        res.status(400).json({
            msg: "ID NO VALIDA"
        })  
    }
}

module.exports = {
    registroUsuario,
    obtenerUsuario,
    loginUsuario
}