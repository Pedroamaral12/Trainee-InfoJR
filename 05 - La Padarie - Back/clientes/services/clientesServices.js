const { response } = require('express')
const mysql = require('../../database.js')

exports.getAllClients = (req, res) => {
        mysql.pool.getConnection((error, conn) => {
                if (error) {
                    conn.release()
                    return res.status(500).send({ error: error })
                }
                conn.query(
                    'SELECT * FROM PEDIDOS',
                    (error, response) => {
                        if (error) {
                            return res.status(500).send({ error: error })
                        }

                        res.status(200).send({
                            res: 'Exibindo Todos os Clientes',
                            response: response
                        })
                    }

                )
            }

        )
    }
    // Mensagens de erro de conexão e conexão ok mas não leu os dados.
    // Mensagem de confirmação pra conexão.

exports.createPedido = (req, res) => {
    mysql.pool.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error })
        }
        conn.query(
            'INSERT INTO PEDIDOS (nome, pães) VALUE(?, ?)', [req.body.nome, req.body.pães],
            (error) => {
                conn.release()

                if (error) {
                    return res.status(500).send({ error: error })
                }

                res.status(201).send({
                    res: 'Pedido cadastrado com sucesso'

                })
            }
        )
    })
}
exports.deletePedido = (req, res) => {
    mysql.pool.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error })
        }
        conn.query(
            'DELETE FROM PEDIDOS WHERE ID = ?', [req.body.id],
            (error) => {
                conn.release()

                if (error) {
                    return res.status(500).send({ error: error })
                }

                res.status(201).send({
                    res: 'Pedido deletado com sucesso',

                })
            }
        )
    })
}