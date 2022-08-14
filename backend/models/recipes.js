const mongoose = require('mongoose');



const recipeSchema = new mongoose.Schema({
    name: String,

    ingredient: Object


})




const Recipe = mongoose.model('Recipe', recipeSchema,'recipes');



module.exports = Recipe;