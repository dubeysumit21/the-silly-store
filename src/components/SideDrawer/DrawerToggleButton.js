import React from 'react';
import classes from './DrawerToggleButton.css';

const drawerToggleButton = (props) => {
    return(
        <button className={classes.toggle_button} onClick={props.clicked}>
            <div className={classes.toggle_button_line}/>
            <div className={classes.toggle_button_line}/>
            <div className={classes.toggle_button_line}/>
        </button>
    )
}

export default drawerToggleButton;