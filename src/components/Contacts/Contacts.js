import React from 'react';
import Header from '../Header/Header';
import classes from './Contacts.css';

const contacts = (props) => {
    return(
        <div className={classes.container}>
            <div className={classes.navigation}>
                <div className={classes.navigationHolder}><Header properties={props}/></div>
            </div>
        </div>
    )
}

export default contacts;