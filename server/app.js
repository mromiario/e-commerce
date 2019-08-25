if(!process.env.NODE_ENV || process.env.NODE_ENV == 'dev' || process.env.NODE_ENV == 'test'){
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

mongoose.connect( 'mongodb://mromiario:123@cluster0-shard-00-00-qjyss.mongodb.net:27017,cluster0-shard-00-01-qjyss.mongodb.net:27017,cluster0-shard-00-02-qjyss.mongodb.net:27017/ecommerce?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', {useNewUrlParser: true},()=>{
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