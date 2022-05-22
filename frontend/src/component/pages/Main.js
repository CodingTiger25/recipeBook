import React from 'react';
import styled from "styled-components";
import classes from './Main.module.css';
import { NavLink, Nav} from 'react-bootstrap';

function Main(){

    return (
        <div>
            <div className={classes.navCen}>
                <Nav className={classes.navs} onSelect={(select) => alert(`${select}`)}>
                    <Nav.Item>
                        <Nav.Link eventKey="Adding recipe">Add Recipe</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="Removing recipe">Remove Recipe</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
                
            <div>
                <h1 className={classes.header}>Recipes are here</h1>
            </div>
            
        </div>
        
        
    )
}

export default Main;
