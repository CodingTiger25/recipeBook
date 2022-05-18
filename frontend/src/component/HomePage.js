import React from 'react';
import styled from "styled-components";

const Button = styled.button`
    background-color: black;
    color: white;
    font-size: 20px;
    display:block;
    margin: 0 auto;
;`
function  HomePage(){
    return(
        <div>

            <div id="recipe">
                <h1>Recipe Book</h1>
            </div>
                
            <div>
                <Button>Recipes</Button>
            </div>
        </div>
    )

    
}

export default HomePage;