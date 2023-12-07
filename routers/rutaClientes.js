const express = require('express')
const router = express.Router();

const cliente = require('../model/cliente');
const { ClientEncryption } = require('mongodb');

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

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const clienteBD = await cliente.findByIdAndDelete({ _id: id })

        if (clienteBD) {
            res.json({
                estado: true,
                mensaje: 'eliminado! UUooooo!'
            })
        } else {
            res.json({
                estado: false,
                mensaje: 'No se puede eliminar, ups'
            })
        }
    } catch (error) {
        console.log(error)
    }
})


router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    try {
        const clienteBD = await cliente.findByIdAndUpdate(id, body, { useFindAndModify: false })
        console.log(clienteBD)
        res.json({
            estado: true,
            mensaje: 'Modificado! UUooooo!'
        })

    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'ups... no se pudo modificar'
        })
    }
})

module.exports = router;