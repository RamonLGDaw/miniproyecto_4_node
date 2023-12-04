const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const clienteSchema = new Schema({
    nombre: String,
    edat: String,
    
})

// Crear modelo
const cliente = mongoose.model('clientes', clienteSchema);

module.exports = cliente