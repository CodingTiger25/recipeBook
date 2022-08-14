const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const RecipeList = require('./models/recipes');
const IngredientList = require('./models/ingredient');

mongoose.connect('mongodb://localhost:27017/recipeBook',{}
).then(() => {console.log("Mongo connect!")})
 .catch(err => {console.log("No mongo here!")})

//app.use(express.urlencoded({extended:false}))

app.use(express.json())

/*var bodyPars = require('body-parser');
const { json } = require('express');
app.use(bodyPars.json());*/

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    });

app.post('/create', async (req,res) => {
    
    console.log('The name', req.body.name);
    console.log('The ingredient', req.body.ingredient)

    const data = req.body.ingredient;

    

    /*const newRecipe =  new RecipeList({
        
        name: req.body.name,
        
       ingredient: JSON.stringify(data)
        })*/

    //const newIngredient = new IngredientList();
    const newRecipe = new RecipeList();

   // newIngredient.items = JSON.stringify(data); //JSON.stringify(data,null, 2);

    newRecipe.name = req.body.name;
    newRecipe.ingredient = data;  //JSON.stringify(data,null, 2);
    
   
    
                    


        newRecipe.save()
        .then(newRecipe =>{
          

            //console.log('The parsed: ', JSON.parse(newRecipe.ingredient));
           /* console.log('The name', req.body.name);
              console.log('The ingredient', req.body.ingredient);
          
            console.log(newRecipe);
            console.log("Saved recipe");*/
            //console.log('ingredient schema',newIngredient);

            console.log(newRecipe);
        })

    
})



 app.get('/main', async (req,res) => {
    const recipes = await RecipeList.find();
    res.send('from main');
    
    console.log("From submit!!!");
    
    

})

app.get('/main/:id', async (req,res) => {
    const {id} = req.params;
    const recipe = await RecipeList.findById(id);
    res.send(recipe);
    
    
}) 

app.get('/create', async(req,res) => {
    res.send('The main page!!!');
})

app.listen(3000, ()=> {
    console.log("Listening on 3000 for the first time")
})