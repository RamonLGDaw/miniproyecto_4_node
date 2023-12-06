const express = require('express')
const router = express.Router();

const cliente = require('../model/cliente');

router.get('/', async (req, res) => {

    try {
        const arrayClientesDB = await cliente.find()
        // console.log(arrayGatosDB);
        res.render('clientes', {
            arrayClientes: arrayClientesDB
        })

    } catch (error) {
        console.log(error);
    }
})

router.get('/crear', (req, res) => {
    res.render('crear')
})

router.post('/', async (req, res) => {
    const body = req.body

    try {
        await cliente.create(body)
        res.redirect('/clientes')
    } catch (error) {
        console.log('error', error)
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    
    try {
        const clienteBD = await cliente.findOne({ _id: id });
        
        res.render('detalle', {
            elemento: clienteBD, 
            error: false
        })
    } catch (error) {
        console.log(error)
        res.render('detalle', {
            mensaje: 'id no encontrada!!', 
            error: true
        })
    }
})

module.exports = router;