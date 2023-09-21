const express = require('express');
const { agregarComentario, obtenerComentario } = require('../controladores/comentarios');
const router = express.Router();

router.post('/comentario', agregarComentario);
router.get('/comentario/:id', obtenerComentario);



module.exports = router;