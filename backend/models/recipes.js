const mongoose = require('mongoose');


const recipeSchema = new mongoose.Schema({
    name: String,

    ingredient: [{body:String}]


})

const Recipe = mongoose.model('Recipe', recipeSchema);



module.exports = Recipe;