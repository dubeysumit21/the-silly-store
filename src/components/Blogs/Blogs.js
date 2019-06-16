import React, {Component} from 'react';
import Header from '../Header/Header';
import classes from './Blogs.css';

class Blogs extends Component{
    render(){
        return(
            <div >
                <div className={classes.navigation}>
                    <div className={classes.navigationHolder}><Header properties={this.props}/></div>
                    <div className={classes.imageLoader}></div>
                </div>
            </div>
        )
    }
}

export default Blogs;