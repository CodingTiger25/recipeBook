const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const RecipeList = require('./models/recipes');

mongoose.connect('mongodb://localhost:27017/recipeBook',{}
).then(() => {console.log("Mongo connect!")})
 .catch(err => {console.log("No mongo here!")})

app.use(express.urlencoded({extended:true}))

app.post('/main', async (req,res) => {
    const newRecipe = new RecipeList(req.body);
    await newRecipe.save()
    console.log(newRecipe);
    res.send('A recipe is born!!!');
})

 app.get('/main', async (req,res) => {
    const recipes = await RecipeList.find({});
    res.send('A recipe');
    console.log(recipes);
})

app.get('/main/:id', async (req,res) => {
    const {id} = req.params;
    const recipe = await RecipeList.findById(id);
    res.send(recipe);
    console.log(recipe);
}) 

app.get('/create', async(req,res) => {
    res.send('The main page!!!');
})

app.listen(3000, ()=> {
    console.log("Listening on 3000 for the first time")
})