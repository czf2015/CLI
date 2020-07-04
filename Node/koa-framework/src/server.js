const mongoose = require('mongoose')
const consola = require('consola')
const app = require('./app.js')

const { HOST = '127.0.0.1', PORT = 3000 } = process.env

mongoose.connect('mongodb://127.0.0.1:27017/track', {
    useNewUrlParser: true
})

app.listen(PORT, HOST)

consola.ready({
    message: `Server listening on http://${HOST}:${PORT}`,
    badge: true
})