//import mongoose module
const mongoose=require('mongoose');

//create schema
const matchSchema=mongoose.Schema({
    scoreOne:Number,
    scoreTwo:Number,
    teamOne:String,
    teamTwo:String,
});
//affectation d'un nom de modele pour le schema
const match=mongoose.model('Match',matchSchema);

//make match exportable
module.exports=match;