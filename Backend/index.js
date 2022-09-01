const express = require('express')
const app = express()
const port = 3030
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv/config')


app.use(bodyParser.json())
app.use(cors())
mongoose.connect(process.env.DB_URL,
    {
        dbName: 'Dapp_login',
        useNewUrlParser: true,
        useUnifiedTopology: true },
    err => err ? console.log(err) : console.log('Connected to database'))

app.use("/",require(path.join(__dirname,'./routes/route.js')))


app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})