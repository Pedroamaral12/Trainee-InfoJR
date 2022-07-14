const express = require('express')
const app = express()
const port = 3000
const fetch = require('cross-fetch')

app.get('/api', async(req, res) => {
    const RESPONSE = await fetch(
        // Link da api
        'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1'
    )
    const DATA = await RESPONSE.json()
    res.json(DATA)
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})