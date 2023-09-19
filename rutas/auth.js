const express = require('express');
const router = express.Router();
const { registroUsuario, obtenerUsuario, loginUsuario } = require('../controladores/usuarios');

router.post('/register', registroUsuario);
router.get('/usuario/:id', obtenerUsuario);
router.post('/login', loginUsuario);



module.exports = router;