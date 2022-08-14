const mongoose = require('mongoose');




const ingredientSchema = new mongoose.Schema({

    items:[
        {
            _id : Number,
            type : String
        }
    ]
    
})


const anIngredient = mongoose.model('aningredient', ingredientSchema);

module.exports = anIngredient;

