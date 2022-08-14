import React, {useEffect, useState} from "react";
import classes from "./CreateRecipe.module.css";
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import AddButton from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import uuid from "react-uuid";
import { ListItemSecondaryAction } from "@mui/material";



function CreateRecipe()
{
    const [name, setName] = useState([]);
    //const [inputList, setInputList] = useState([{ingredient:' '}]);
    const [inputList, setInputList] = useState(['']);
    const [items, setItems] = useState([]);

    const list = [...items];
    
    //Handles Add button functionality
    const handleInputAdd = () => {

        /*let object = {
            ingredient: ''
        }*/

        const object = [...inputList,['']]

        //setInputList([...inputList,object]);

        setInputList(object);
    };

    const handleInputRemove = (index) => {
        const list = [...inputList];
        list.splice(index,1);
        setInputList(list);
    }

    const handleChange = (event, index) => {
        let data = [...inputList];
        //data[index].ingredient = event.target.value;
        data[index] = event.target.value;
        setInputList(data);
    };

    

    const handleSubmit = (e) => {
        e.preventDefault();
        /*console.log(name);
        console.log(inputList);*/

        console.log("The ingredients: ", inputList)
        for(var i in inputList)
        {
            console.log("Looping the inputlist");
            console.log(inputList[i]);

            const newIngredients = {
                _id: uuid(),
                value: inputList[i]
            }

            list.push(newIngredients);
            //setItems([...items,newIngredients]);
            console.log('The LIST: ', list[i]);
        }
        

        console.log('The FULL LIST: ', list);
        setItems(list);
        console.log('This is the items: ', items);

        const newRecipe = {
            name: name,
            
            ingredient: list
        }
        
        axios.post('http://localhost:3000/create', newRecipe)
            .then(res => console.log("Axios post"))
            .catch((err)=> {
                console.log("Error")
            });

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
                {inputList.map( (form, index) => {
                    return (
                    <div key={index}>
                           <TextField //name="ingredient"     
                                      value={/*inputList.ingredient*/form}                             
                                      onChange={(e) => {handleChange(e, index)}}>
                                      
                           </TextField>
                            <IconButton disabled={inputList.length === 1} onClick={() => handleInputRemove(inputList.id)}>
                                <RemoveIcon/>
                            </IconButton>
                            <IconButton onClick={handleInputAdd}>
                                <AddButton></AddButton>
                            </IconButton>
                    </div>
                )})}
                <div>
                      <button className={classes.submit}>Submit</button>
                </div>         
            </form>
        </div>
    );
}


export default CreateRecipe;