const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
const morgan = require('morgan')
    // chama o express e o morgan (express na const app)

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
    // configurações do body

app.use(morgan('dev'))
    //Informações de log no terminal

app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header(
            'Access-Control-Allow-Header',
            'Origin, x-resquest-With, Contet-Type, Accept, Authorization'
        )

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE')
            return res.status(200).send({})
        }

        next()
    })
    //Configuração de CORS


// Rotas
const clientesControler = require('./clientes/controler/clientesControler')

//End point
app.use('/clientes', clientesControler)

//Rotas caso as de cima deêm erro
app.use((req, res, next) => {
    const error = new Error('Não encontrado')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.send({
        erro: {
            menssage: error.menssage
        }
    })

})

module.exports = app