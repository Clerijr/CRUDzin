var express = require('express');
var app = express();
var PORT = process.env.PORT || 8081;
var mongoose = require('mongoose');
var User = require('./app/models/user');
var h = new Date().toLocaleString();
var _handlebars = require('handlebars');
var handlebars = require('express-handlebars');
var router = require('./routes/router')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
/* ========================================================================================================================== */
// Setting Database, View Engine, Data Parsing and Router
app.engine('handlebars', handlebars({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(_handlebars) }))
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'));
app.use('/', router)
app.listen(PORT, () => {
    console.log('Servidor rodando na porta ' + PORT + ' às ' + h);
})
// Mongoose Setting
mongoose.connect('mongodb+srv://clerivaldojr:Ithuryel1!@cluster0.focpz.mongodb.net/test?authSource=admin&replicaSet=atlas-kavto3-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) console.log('There is an error: ', err);
    console.log('Connected with Mongoose')
})
// Parsing data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* ========================================================================================================================== */









