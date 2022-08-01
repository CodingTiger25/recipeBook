import React, {useState} from "react";
import classes from "./CreateRecipe.module.css";
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import AddButton from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import axios from 'axios';



function CreateRecipe()
{
    const [name, setName] = useState([]);
    const [inputList, setInputList] = useState([{ingredient:' '}]);
    
    //Handles Add button functionality
    const handleInputAdd = () => {

        let object = {
            ingredient: ''
        }

        setInputList([...inputList,object]);
    };

    const handleInputRemove = (index) => {
        const list = [...inputList];
        list.splice(index,1);
        setInputList(list);
    }

    const handleChange = (event, index) => {
        let data = [...inputList];
        data[index].ingredient = event.target.value;
        setInputList(data);

        /*setInputList((prev) => {
         return prev.map((item,i) => {
                if(i !== index) {
                    return item;
                }

            return{
                ...item,
                [event.target.ingredient]: event.target.value,
            };    
            });
        });*/



    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name);
        console.log(inputList);

        const newRecipe = {
            name: name,
            ingredient: inputList
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
                           <TextField name="ingredient"     
                                      value={inputList.ingredient}                             
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