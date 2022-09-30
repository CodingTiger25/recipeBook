import React, {useEffect, useState} from "react";
import classes from "./CreateRecipe.module.css";
import axios from 'axios';
import {useParams} from 'react-router-dom';





function EditRecipe()
{
    const [name, setName] = useState([]);
    const [theIngredients,setTheIngredients] = useState([]);
    const [theDirections, setTheDirections] = useState([]);
    const [fileData, setFileData] = useState([]);

    const [currentRecipe, setCurrentRecipe] = useState([]);


    const {id} = useParams();
    useEffect(() => {
        axios.get(`http://localhost:3000/update/${id}`).then(res => {
            /*const items = res.data;
            setCurrentRecipe((items));   */

            setName(res.data.name);
            setTheIngredients(res.data.ingredient);
            setTheDirections(res.data.directions);
            
                
        })
    }, [])

    //Function for image adding
    const onChangeFile = e => {
        setFileData(e.target.files[0]);
    }

    
    const handleSubmit = (event) => {
        event.preventDefault();

       
        

        const formData = new FormData();

        formData.append("name",name);
        formData.append("ingredient",theIngredients);
        formData.append("directions",theDirections);
        formData.append("recipeImage",fileData);

       
        axios.put(`http://localhost:3000/update/${id}`,
        {
                name:name,
                ingredient:theIngredients,
                directions:theDirections,
                recipeImage: fileData
        });

        alert(`Your recipe ${name} has been updated!!!`);
        window.location.replace("/main");      
    }

    return (
        <div className={classes.create}>
            <h2 className={classes.title}>EDIT THE RECIPE!</h2>
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
                <textarea type='text' onChange={(e) => setTheIngredients(e.target.value)} value={theIngredients}>

                </textarea>

                <label className={classes.recipeName}>
                    Directions: 
                </label>
                
                <textarea type='text' onChange={(e) => setTheDirections(e.target.value)} value={theDirections}>

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


export default EditRecipe;