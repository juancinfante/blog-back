const express = require('express');
const router = express.Router();
const { agregarArticulo, obtenerArticulos, obtenerArticulo, editarArticulo, eliminarArticulo } = require('../controladores/articulos');
const { validarJWT } = require('../middlewares/validar.jwt');

router.post('/articulo', agregarArticulo);
router.get('/articulos' ,obtenerArticulos);
router.get('/articulo/:id', obtenerArticulo);
router.put('/articulo', editarArticulo);
router.delete('/articulo/:id', eliminarArticulo);

module.exports = router;