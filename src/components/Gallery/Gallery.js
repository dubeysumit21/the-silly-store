import React from 'react';
import Header from '../Header/Header';
import classes from './Gallery.css';

const gallery = (props) => {
    return(
        <div className={classes.container}>
            <div className={classes.navigation}>
                <div className={classes.navigationHolder}><Header properties={props}/></div>
            </div>
        </div>
    )
}

export default gallery;