if(!process.env.NODE_ENV || process.env.DEV == 'development'){
    const env = require('dotenv').config()
}
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const express = require('express')
const app = express()
const routes = require('./routes')
const port = 3000 || process.env.PORT
 
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(morgan('dev'))

mongoose.connect( 'mongodb://localhost:27017/tes' , {useNewUrlParser: true},()=>{
    console.log('connected to mongodb');
})
 
app.use(cors())
app.get('/',(req,res)=>{
    res.send('REST API')
})
 
app.use('/api',routes)
 
app.use(function (err, req, res, next) {
    console.log(err)
    res.status(500).send({message : 'Internal Server Error' })
})
 
app.listen(port,()=>{
    console.log('listening to port ',port);
})

module.exports = app