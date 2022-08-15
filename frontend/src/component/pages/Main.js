import React, { useEffect, useState } from 'react';
import classes from './Main.module.css';
import {  Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';



 function Main(){

    const url = 'http://localhost:3000/main/62fa13de63acff90fc88ef1b';
    const [foodRecipe, setFoodRecipe] = useState([]);


    useEffect(() => {
        axios.get(url).then(res => {
            setFoodRecipe((res.data));
           
            //console.log(foodRecipe)
        })
    }, [])

    let items =  foodRecipe.ingredient;
    
    
    //const lineItem = JSON.parse(items);
    /*const listItems = JSON.parse(items);*/
    //JSON.parse(items);

    console.log(items)


   // const list = JSON.parse(JSON.stringify(items));

   // console.log(list);
 
    console.log(Array.isArray(items));
    //console.log(JSON.parse(items));

 

    

        return (
            <div>
                <div className={classes.navCen}>
                    <Nav className={classes.navs}>
                        <Nav.Item>
                            <Link to='/create'>Add Recipe</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="Removing recipe">Remove Recipe</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
                    
                <div>
                    <h1 className={classes.header}>Recipes are here</h1>
                    <p> {foodRecipe.name}</p>
                    <div>
                        <ul>     
                            {items && items.map((d) => {
                                return (
                                  <li key = {d._id}>{d.value}</li>  
                                );
                            })}                  
                        </ul>
                    </div>
                
                </div>
                
            </div>
            
            
        )
}

export default Main;
