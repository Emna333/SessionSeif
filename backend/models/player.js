//import mongoose module
const mongoose = require('mongoose');

//create schema
const playerSchema = mongoose.Schema({
    name:String,
     age:Number,
    number:Number,
    position:String
});
//affectation d'un nom de modele pour le schema
const player = mongoose.model('Player', playerSchema);

//make match exportable
module.exports = player;