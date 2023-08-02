//import mongoose module
const mongoose = require('mongoose');

//create schema
const teamSchema = mongoose.Schema({
    name: String,
    owner: String,
    foundation: Number,
    stadium: String,
});
//affectation d'un nom de modele pour le schema
const team = mongoose.model('Team', teamSchema);

//make match exportable
module.exports = team;