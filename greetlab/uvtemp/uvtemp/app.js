require('dotenv').config()
require('./config/db.config')
const express = require('express') 
const app = express() 
const server = require('http').createServer(app)
const PORT = process.env.PORT || process.env.PORT_NUMBER
const routes = require('./routes')
require('./cronJob');
app
    .use(require('cors')())   
    .use(express.json({limit : "50mb", extends:true})) 
    .use('/uploads', express.static('uploads'))
    .use(express.urlencoded({limit:"100mb" , extended:true})) 
    .use( function(request,response,next) {
        response.setHeader("Access-Control-Allow-Origin", "*")
        response.setHeader("Access-Control-Allow-Methods",
        "GET,HEAD,OPTIONS,POST,PUT,DELETE")
        response.setHeader(
            "Access-Control-Allow-Headers",
            "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, application/json,Accept, Authorization, refreshToken"
          );
         
     next();
     }) 

.use('/authentication',routes.authRoute)
.use('/admin',routes.adminRoute)  
.use('/client',routes.clientRoute)
.use('/common',routes.common)

server.listen(PORT, () => {
    console.log('Uv heal server is started on '+ PORT);
})