const { response } = require('express')
const express = require('express')
require('dotenv').config()


const app = express();

app.use(express.json());

app.use(express.static(__dirname + "/public/"))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

var mat = require('./routes/mat')

app.use('/mat', mat)

// app.use('/dataForTable', mat)


app.listen(5000, () => {
    console.log('server running ... 5000')
})
