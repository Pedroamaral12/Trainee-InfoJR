const express = require('express')
const router = express.Router()
const clientesServices = require('../services/clientesServices')

router.get('/', clientesServices.getAllClients)
    //Seleciona todos os clientes

router.post('/', clientesServices.createPedido)
    //Cria os pedidos

router.delete('/', clientesServices.deletePedido)
    //Deleta os pedidos

module.exports = router