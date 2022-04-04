require('dotenv').config();



const express=require('express');
const app=express();
const mongoose=require('mongoose');
const bodyParser=require('body-parser')
const port=process.env.PORT;


mongoose.connect("mongodb://localhost/my_rest");
const db=mongoose.connection;
db.on('open',()=>console.log('connection success'));
db.once('error',()=>console.log('connection failed'))
app.use('/upload',express.static('upload'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(require('./app/routes/events'))

app.listen(port ,()=>{
    console.log('Connection Okkkk')
})
 
