const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json({limit: '50mb', extended: true}))
const loginRoute = require('./api/routes/login')
const dataRoute = require('./api/routes/data')

app.use('/',loginRoute)
app.use('/',dataRoute)
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}))

const server = app.listen(3001,() => {
    const {port} = server.address()
    console.log('server localhost running at port: ', port)
})