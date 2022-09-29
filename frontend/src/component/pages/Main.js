import React, { useEffect, useState } from 'react';
import classes from './Main.module.css';
import {  Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';




 function Main(){

    const url = 'http://localhost:3000/main';
    const [foodRecipe, setFoodRecipe] = useState([]);

    useEffect(() => {
        axios.get(url).then(res => {
            const items = res.data;
            setFoodRecipe((items));   
            console.log(items);       
        })
    }, [])

    const deleteRecipe = (id, e) => {
       
        e.preventDefault();

        axios.delete(`http://localhost:3000/main/${id}`)
        .then(
            res => {console.log("Deleted ", res); 
                    window.location.reload()})
            .catch(err => console.log("Deleted " + console.error));         
    }

    const editRecipe = (id) => {

        
    }

    function displayItems(list) {

            return list.map((d)  => (
                <div key={d._id}>
                    <h2>{d.name}</h2>
                    <h5>Ingredients</h5>
                    <ul> {d.ingredient.map((y) =>(<li>{y.value}</li> ))}</ul>
                    <h5 className={classes.directions}>Directions</h5>
                    <ol>{d.directions.map((u) => <li>{u.value}</li>)}</ol>
                    <img src={`./RecipeImages/${d.recipeImage}`}/>
                    < Link to = {`/update/${d._id}`}>Edit</Link>
                    <button type="submit" onClick={(e) => deleteRecipe(d._id, e)}>Delete</button>
                </div>
            ));

    };   
    

        return (
            <div>
                <div className={classes.navCen}>
                    <Nav className={classes.navs}>
                        <h1 className={classes.header}>Your Recipes</h1>
                        <Nav.Item>
                            <Link to='/create'>Add Recipe</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="Removing recipe">Remove Recipe</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
                    
                <div className={classes.foodIng}>
                    <div>
                        {displayItems(foodRecipe)}
                    </div>             
                </div>          
            </div>
                      
        )
}

export default Main;
