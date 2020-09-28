// Creating the user Schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
    name: String,
    ecivil: String,
    age: Number,
    cpf: Number,
    city: String,
    uf: String
})

module.exports = mongoose.model('user', userSchema);