const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const RecipeList = require('./models/recipes');

mongoose.connect('mongodb://localhost:27017/recipeBook',{}
).then(() => {console.log("Mongo connect!")})
 .catch(err => {console.log("No mongo here!")})

app.get('/create', (req,res) => {
    res.send('Food incoming!')
})

app.listen(3000, ()=> {
    console.log("Listening on 3000 for the first time")
})