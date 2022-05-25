import React, {useState} from "react";
import classes from "./CreateRecipe.module.css";

function CreateRecipe()
{
    const [inputList, setInputList] = 
    useState([{ingredient:''}]);

    //Handles Add button functionality
    const handleInputAdd = () => {
        setInputList([...inputList,{ingredient:""}]);
    };

    const handleInputRemove = (index) => {
        const list = [...inputList];
        list.splice(index,1);
        setInputList(list);
    }
 
    return (

        <div className={classes.create}>
            <h2 className={classes.title}>CREATE THE RECIPE!</h2>
            <form>
                <label className={classes.recipeName}>
                    Recipe Name:
                    <input className={classes.recipeIngredient}
                        type='text'
                        
                    />                 
                </label>
                <label className={classes.recipeName}>
                    Ingredient:   
                </label>
                {inputList.map((newIng,index) => (
                        <div key = {index}>  
                            <div>
                                <input className={classes.recipeIngredient}
                                        type='text'/>                            
                                <button className={classes.addBtn} onClick={handleInputAdd}>Add</button>
                            </div>
                            <div> 
                                {inputList.length > 0 && (
                                    <button className={classes.addBtn} 
                                    onClick={() => handleInputRemove(index)}> <span>Remove</span></button>
                                )}
                                    
                                
                            </div>                           
                        </div>      
                ))}          
            </form>
        </div>
    );
}


export default CreateRecipe;