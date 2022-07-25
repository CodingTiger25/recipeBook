import React, {useState} from "react";
import classes from "./CreateRecipe.module.css";
import { Link } from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import AddButton from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import axios from 'axios';



function CreateRecipe()
{
    const [name, setName] = useState([]);
    const [inputList, setInputList] = useState([{id: uuidv4(), ingredient:' '}]);
    
    //Handles Add button functionality
    const handleInputAdd = () => {
        setInputList([...inputList,{id:uuidv4() ,ingredient:' '}]);
    };

    const handleInputRemove = (id) => {
        const list = [...inputList];
        list.splice(list.findIndex(value => value.id === id), 1);
        setInputList(list);
    }

    const handleChange = (id, event) => {
        const newInput = inputList.map(i => {
            if(id === i.id){
                i[event.target.name] = event.target.value
            }
            return i;
        })

        setInputList(newInput);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newRecipe = {
            name: name,
            ingredient: inputList
        }
        
        axios.post('http://http://localhost:3000/#/create', newRecipe)
            .then(res => console.log("Axios post"))
            .catch((err)=> {
                console.log("Error")
            });

        setName(" ");
        setInputList("");
        alert(`Your recipe ${name} has been created!!!`);
        window.location.replace("http://localhost:3000/main");
        
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
                {Array(inputList).map( inputList => (
                    <div key={inputList.id}>
                           <TextField name="ingredient"
                                      value={inputList.ingredient}
                                      onChange={(e) => {handleChange(inputList.id,e)}}>
                           </TextField>
                            <IconButton disabled={inputList.length === 1} onClick={() => handleInputRemove(inputList.id)}>
                                <RemoveIcon/>
                            </IconButton>
                            <IconButton onClick={handleInputAdd}>
                                <AddButton></AddButton>
                            </IconButton>
                    </div>
                ))}
                <div>
                      <button className={classes.submit}>Submit</button>
                </div>         
            </form>
        </div>
    );
}


export default CreateRecipe;