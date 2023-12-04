const express = require('express')
const app = express()
const puerto = process.env.PORT || 3000;
const mongoose = require('mongoose');


//Conexion a base de datos
const user = 'usuarioGeneral';
const password = 'contrasenya';
const dbname = 'persona'
const uri = `mongodb+srv://${user}:${password}@cluster0.n1h1nz9.mongodb.net/${dbname}?retryWrites=true&w=majority`;


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

