const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const RecipeList = require('./models/recipes');

mongoose.connect('mongodb://localhost:27017/recipeBook',{}
).then(() => {console.log("Mongo connect!")})
 .catch(err => {console.log("No mongo here!")})

app.use(express.urlencoded({extended:true}))

var bodyPars = require('body-parser');
app.use(bodyPars.json());

app.post('/create', async (req,res) => {
    
    
    const newRecipe = await new RecipeList({
        
        name: req.body.name,
        ingredient: req.body.ingredient
    })
   
    
    newRecipe.save()
        .then(newRecipe =>{
            console.log('The name', req.body.name);
            console.log('The ingredient', req.body.ingredient);
            console.log(newRecipe);
            console.log("Saved recipe");
        })

    
})



 app.get('/main', async (req,res) => {
    const recipes = await RecipeList.find();
    res.send('A recipe');
    console.log("From submit!!!");
    
    

})

app.get('/main/:id', async (req,res) => {
    const {id} = req.params;
    const recipe = await RecipeList.findById(id);
    res.send(recipe);
    console.log("Frome get");
}) 

app.get('/create', async(req,res) => {
    res.send('The main page!!!');
})

app.listen(3000, ()=> {
    console.log("Listening on 3000 for the first time")
})