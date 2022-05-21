import React from 'react';
import styled from "styled-components";
import {Link, useNavigate} from 'react-router-dom';


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

            <div id="recipe">
                <h1>Recipe Book</h1>
            </div>
                
            <div>
                <Button onClick={navigate('/main')}>Recipes</Button>
            </div>
        </div>
    )

    
}

export default HomePage;