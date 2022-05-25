import React from 'react';
import classes from './Main.module.css';
import { NavLink, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';



function Main(){

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
            </div>
            
        </div>
        
        
    )
}

export default Main;
