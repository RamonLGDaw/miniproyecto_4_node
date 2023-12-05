const express = require('express')
const app = express()
const mongoose = require('mongoose');

require('dotenv').config();


//Versión actualizada. body-parser esta DEPRECATED
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
// parse application/json
app.use(express.json())

//Pruebas para averiguar porque no funcionaban las putas variables de entorno... al final es que USER debe ser una palabra 'reservada' o algo asi

 const puerto = process.env.PORT || 3000;
// const nombre = process.env.NOM;
// const password = process.env.PASSWORD;
// const bdName = process.env.NAME;

// console.log(`contenido de la variable nombre: ${nombre}`);
// console.log(`que tipo de variable es nombre?? ==> ${typeof nombre}`)
// console.log(`contenido de la variable password: ${password}`);
// console.log(`que tipo de variable es nombre?? ==> ${typeof password}`)
// console.log(`contenido de la variable BASE DE DATOS: ${bdName}`);
// console.log(`que tipo de variable es nombre?? ==> ${typeof bdName}`)


//Conexion a base de datos
const uri = `mongodb+srv://${process.env.NOM}:${process.env.PASSWORD}@cluster0.n1h1nz9.mongodb.net/${process.env.NAME}?retryWrites=true&w=majority`;

mongoose.connect(uri)
    .then(() => console.log('Conectado CORRECTAMENTE a mongodb, FELICIDADES!!!!'))
    .catch(e => console.log('error de conexión', e))

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

app.use('/', require('./routers/rutasWeb'));
app.use('/clientes', require('./routers/rutaClientes'))



app.use((req, res, next) => {
    res.status(404).render("404");
});

app.listen(puerto, () => {
    console.log(`Servidor activo en el puerto ${puerto}`)
});

