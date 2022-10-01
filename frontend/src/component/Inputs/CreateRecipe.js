import React, {useState} from "react";
import classes from "./CreateRecipe.module.css";
import axios from 'axios';






function CreateRecipe()
{
    const [name, setName] = useState([]);
    const [theIngredients,setTheIngredients] = useState([]);
    const [theDirections, setTheDirections] = useState([]);
    const [fileData, setFileData] = useState([]);

    //Function for image adding
    const onChangeFile = e => {
        setFileData(e.target.files[0]);
    }

    
    const handleSubmit = (event) => {
        event.preventDefault();

       
        
        divide();
        const formData = new FormData();

        formData.append("name",name);
        formData.append("ingredient",theIngredients);
        formData.append("directions",theDirections);
        formData.append("recipeImage",fileData);

       
        axios.post('http://localhost:3000/create', formData)
            .then(res => console.log("Axios post"))
            .catch((err)=> {
                console.log(console.error);
            });

        alert(`Your recipe ${name} has been created!!!`);
        window.location.replace("/main");      
    }

   function divide()
   {
        var txt;
        txt = theIngredients;
        var text = txt.split(" ");
        var str = text.join(' </br>');
        setTheIngredients(document.write(str));
   }
    return (
        <div className={classes.create}>
            <h2 className={classes.title}>CREATE THE RECIPE!</h2>
            <form onSubmit={handleSubmit} action="/main" method="POST">
                <label className={classes.recipeName}>
                    Recipe Name:
                    <input className={classes.recipeIngredient}
                        type='text' 
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />                 
                </label>
                <label className={classes.recipeName}>
                    Ingredient:   
                </label>
                <textarea type='text' onChange={(e) => setTheIngredients(e.target.value)} id="a">

                </textarea>

                <label className={classes.recipeName}>
                    Directions: 
                </label>
                
                <textarea type='text' onChange={(e) => setTheDirections(e.target.value)}>

                </textarea>
               
                <div>
                    <label>
                        Picture for your recipe
                    </label>
                    <input type="file" filename="recipeImage" onChange={onChangeFile}></input>
                </div>

                <div>
                      <button type="submit" className={classes.submit}>Submit</button>
                </div>         
            </form>
        </div>
    );
}


export default CreateRecipe;