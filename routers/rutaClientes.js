const express = require('express')
const router = express.Router();

const cliente = require('../model/cliente');

router.get('/', async (req, res) => {

    try {
        const arrayClientesDB = await cliente.find()
       // console.log(arrayGatosDB);
        res.render('clientes', {
                arrayClientes : arrayClientesDB
        })

    } catch (error) {
        console.log(error);
    }   
})

module.exports = router;