const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const {dbConnection} = require('./database/config');

const PORT = process.env.PORT || 4001
app.listen(PORT, () => {
    console.log("Servidor levantado en puerto: "+PORT);
})

dbConnection();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));

app.use('/articulos', require('./rutas/articulos'));
app.use('/auth', require('./rutas/auth'));
app.use('/comentario', require('./rutas/comentarios'));