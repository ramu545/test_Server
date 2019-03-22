require('./model/connection');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const cros = require('cors');

const userAuthRoute = require('./routers/login.route');
const app = express();

app.use(cros());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'uploads')));
app.use(morgan(':method :url :responce-time'));

app.use(userAuthRoute);

app.listen(3030,()=>{
    console.log('server running on Port :::',3030);
});