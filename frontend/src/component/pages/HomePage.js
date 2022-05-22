import React from 'react';
import styled from "styled-components";
import {Link, useNavigate} from 'react-router-dom';
import classes from './HomePage.module.css';


const Button = styled.button`
    background-color: black;
    color: white;
    font-size: 20px;
    display:block;
    margin: 0 auto;
;`





function  HomePage(){
    const navigate = useNavigate(); 
    return(
        <div>

            <div className={classes.recipe}>
                <h1>Recipe Book</h1>
            </div>
                
            <div className={classes.centered}>
                <Link className={classes.link} to='main'>Recipes</Link>
            </div>
        </div>
    )

    
}

export default HomePage;