import React from 'react';
import classes from './SideDrawer.css';

const sideDrawer = (props) => {
    let drawerClasses = [classes.sideDrawer];
    if(props.show){
        drawerClasses = [classes.sideDrawer, classes.open];
    }
    return(
        <nav className={drawerClasses.join(' ')}>
            <ul>
                <li><a onClick={() => props.routing.history.push('/about')}>About Us</a></li>
                <li><a onClick={() => props.routing.history.push('/gallery')}>Gallery</a></li>
                <li><a onClick={() => props.routing.history.push('/reviews')}>Reviews</a></li>
                <li><a onClick={() => props.routing.history.push('/blogs')}>Blogs</a></li>
                <li><a onClick={() => props.routing.history.push('/register')}>Register</a></li>
                <li><a onClick={() => props.routing.history.push('/contacts')}>Contact Us</a></li>
            </ul>
        </nav>
    )
}

export default sideDrawer;