import React, {useEffect, useState} from "react";
import classes from "./CreateRecipe.module.css";
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import AddButton from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import uuid from "react-uuid";
import { useParams } from "react-router-dom";
//import { Navigate } from "react-router-dom";




function EditRecipe()
{
    const [name, setName] = useState([]);
    const [inputList, setInputList] = useState(['']);
    const [items, setItems] = useState([]);
    const [directions, setDirections] = useState(['']);
    const [theDirections, setTheDirections] = useState([]);
    const [fileData, setFileData] = useState();

    const list = [...items];
    const steps = [...theDirections];


    const {id} = useParams();

   useEffect(() => {
        axios.get(`http://localhost:3000/update/${id}`).then(
            res => {
                setName(res.data.name);
                setInputList(res.data.ingredient);
                const items = Object.values(res.data.ingredient);

                /*for(var i in res.data.ingredient)
                {
                    handleInputAddCurr(i.valueOf)
                }*/

                return items.map((d) => {

                    handleInputAddCurr(d.value)
                })
            }
        )
   })

   const handleInputAddCurr = (needs) => {
    const object = [...inputList,[needs]]
    setInputList(object);
};
    
    //Handles Add button functionality
    const handleInputAdd = () => {
        const object = [...inputList,['']]
        setInputList(object);
    };

    const handleInputRemove = (index) => {
        const list = [...inputList];
        list.splice(index,1);
        setInputList(list);
    }

    const handleChange = (event, index) => {
        let data = [...inputList];
        data[index] = event.target.value;
        setInputList(data);
    };

    // Functions for directions input
    const handleDirectionAdd = () => {
        const object = [...directions,['']]
        setDirections(object);
    };

    const handleDirectionRemove = (index) => {
        const list = [...directions];
        list.splice(index,1);
        setDirections(list);
    }

    const handleDChange = (event, index) => {
        let data = [...directions];
        data[index] = event.target.value;
        setDirections(data);
    };

    //Function for image adding
    const onChangeFile = e => {
        setFileData(e.target.files[0]);
    }

    
    const handleSubmit = (event) => {
        event.preventDefault();

        //Setting the ingredients
        for(var i in inputList)
        {
            const newIngredients = {
                _id: uuid(),
                value: inputList[i]
            }
            list.push(newIngredients);          
        }
        setItems(list);

        //Setting the directions
        for(var j in directions)
        {
            const newDirections = {
                _id: uuid(),
                value: directions[j]
            }
            steps.push(newDirections);          
        }

        setTheDirections(steps);


        const formData = new FormData();

        formData.append("name",name);
        formData.append("ingredient",JSON.stringify(list));
        formData.append("directions",JSON.stringify(steps));
        formData.append("recipeImage",fileData);

        /*const newRecipe = {
            name: name,          
            ingredient: list,
            directions: steps
        }*/
        
        axios.post('http://localhost:3000/create', formData)
            .then(res => console.log("Axios post"))
            .catch((err)=> {
                console.log(console.error);
            });

        alert(`Your recipe ${name} has been created!!!`);
        window.location.replace("/main");
        //Navigate('/main');
        
    }

    return (
        <div className={classes.create}>
            <h2 className={classes.title}>EDIT YOUR RECIPE!</h2>
            <form onSubmit={handleSubmit} action="/main" method="POST" encType="multipart/form-data">
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
                           <TextField    
                                      value={form}                             
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

                <label className={classes.recipeName}>
                    Directions: 
                </label>
                
                {directions.map( (f,i) => {
                    return (
                        <div key={i}>
                           <TextField    
                                      value={f}                             
                                      onChange={(e) => {handleDChange(e, i)}}>
                                      
                           </TextField>
                            <IconButton disabled={directions.length === 1} onClick={() => handleDirectionRemove(directions.id)}>
                                <RemoveIcon/>
                            </IconButton>
                            <IconButton onClick={handleDirectionAdd}>
                                <AddButton></AddButton>
                            </IconButton>
                    </div>          
                )})}
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