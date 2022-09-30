const mongoose = require('mongoose');



const recipeSchema = new mongoose.Schema({
    name: String,

    ingredient: String,

    directions: String,

    recipeImage: String,


})




const Recipe = mongoose.model('Recipe', recipeSchema,'recipes');



module.exports = Recipe;