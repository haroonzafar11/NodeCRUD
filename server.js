const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const product = require('./routes/product.route');
const mongoose = require('mongoose');
// initialize our express app
const app = express();
let port = process.env.PORT;
let connectionString="mongodb://"+ process.env.DB_HOST + ":" + process.env.DB_PORT + "/Products";
const mongoDB = connectionString;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/products', product);

db.on('error',function(){
    console.log("Error connecting to DB");
});

db.once('open',function(){
    console.log("DB connected",connectionString);
    app.listen(port,"localhost",function(){
        console.log("Basic CRUD Operations");
        });
});