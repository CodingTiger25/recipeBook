const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const RecipeList = require('./models/recipes');
const IngredientList = require('./models/ingredient');
const multer = require('multer');

const absPath = path.join(__dirname, './frontend/public/RecipeImages');
const imageStore = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../frontend/public/RecipeImages')
    },
    filename: (req, file, cb) => {
        cb(null,file.originalname);
    },
})

const upload = multer({storage: imageStore});

mongoose.connect('mongodb://localhost:27017/recipeBook',{}
).then(() => {console.log("Mongo connect!")})
 .catch(err => {console.log("No mongo here!")})

app.use(express.json())

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    });


//Request add new recipe
app.post('/create', upload.single('recipeImage'), async (req,res) => {
    
    console.log('The name', req.body.name);
    console.log('The ingredient', req.body.ingredient);
    console.log('The steps: ', req.body.directions);

    var data = JSON.parse(req.body.ingredient);

    var steps = JSON.parse(req.body.directions);

    var foodPic =  req.file.originalname;

    const newRecipe = new RecipeList();

    console.log("From post", data, " Steps: ", steps);

    newRecipe.name = req.body.name;
    newRecipe.ingredient = data;  
    newRecipe.directions = steps;
    newRecipe.recipeImage = foodPic;

        newRecipe.save()
        .then(newRecipe =>{
            console.log(newRecipe);
        }) 
})





 app.get('/main', async (req,res) => {
    const recipes = await RecipeList.find({});
    res.send(recipes);
});

app.get('/main/:id', async (req,res) => {
    const {id} = req.params;
    const recipe = await RecipeList.findById(id);
    res.send(recipe);     
}) 

app.delete(`/main/:id`, async (req,res) => {
    const {id} = req.params;

    
        RecipeList.remove({_id:(req.params.id)})
        .then(result => {res.status(200).json(result)})
        .catch(err => {
            res.status(500).json({error: 'Could not delete recipe'})
        })
    
})

app.get('/create', async(req,res) => {
    res.send('The main page!!!');
})

app.listen(3000, ()=> {
    console.log("Listening on 3000 for the first time")
})