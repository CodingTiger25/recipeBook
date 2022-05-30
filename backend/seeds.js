const mongoose = require('mongoose');
const RecipeList = require('./models/recipes');

mongoose.connect('mongodb://localhost:27017/recipeBook',{}
).then(() => {console.log("Mongo connect!")})
 .catch(err => {console.log("No mongo here!")})


 const salad = new RecipeList({name: 'Salad'})

 salad.save()
    .then(salad => {
        console.log(salad)
    })