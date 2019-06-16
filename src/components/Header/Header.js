import React, { Component } from 'react';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import SideDrawer from '../SideDrawer/SideDrawer';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Header.css';
import {connect} from 'react-redux';

class Header extends Component{

    state={
        drawerOpen: false
    }

    componentDidMount = (props) => {
      console.log(this.props.userName);
    }

    drawerHandler = () => {
        this.setState((prevState) => {
            return {drawerOpen : !prevState.drawerOpen}
          })
    }
    backdropClickHandler = () => {
        this.setState( {drawerOpen : false} );
    }

    nextPageHandler = () => {
      this.props.properties.history.push('/');
    }

    render(){
        let backdrop;
        if(this.state.drawerOpen){
        backdrop=<Backdrop clicked={this.backdropClickHandler}/>
        }
        let logOutData = false;
        if(this.props.userName){
          logOutData = !logOutData;
        }
        return(
            <div>
                <nav className={classes.toolbar_navigation}>
                      <div>
                        <DrawerToggleButton clicked={this.drawerHandler}/>
                      </div>
                      <div className={classes.toolbar_logo}><a href="/">The Silly Store</a></div>
                      <div className={classes.spacer} />
                      <div className={classes.toolbar_navigation_items}>
                        <ul>
                          <li style={{fontSize: '20px', color: 'white'}}>{this.props.userName}</li>
                          <li><a onClick={() => this.props.properties.history.push('/about')}>About Us</a></li>
                          <li><a onClick={() => this.props.properties.history.push('/gallery')}>Gallery</a></li>
                          <li><a onClick={() => this.props.properties.history.push('/reviews')}>Reviews</a></li>
                          <li><a onClick={() => this.props.properties.history.push('/blogs')}>Blogs</a></li>
                          <li><a onClick={() => this.props.properties.history.push('/register')}>Register</a></li>
                          <li><a onClick={() => this.props.properties.history.push('/contacts')}>Contact Us</a></li>
                          {logOutData ? <li onClick = {()=>{this.props.logOutHandler(); this.nextPageHandler()}} style={{fontSize: '20px', color: 'white', cursor: 'pointer'}}>Sign Out</li> : <li onClick = {() => this.props.properties.history.push('/')} style={{fontSize: '20px', color: 'white', cursor: 'pointer'}}>Sign In</li>}
                        </ul>
                      </div>
                </nav>
                <SideDrawer show={this.state.drawerOpen} routing={this.props.properties}/>
                {backdrop}
            </div>
        )
    }
}

const mapStateToProps = state => {
  return {
    userName : state.userName,
    userId : state.userId
  }
}
const mapDispatchToProps = dispatch => {
  return {
    logOutHandler : (email, id) => dispatch({type: 1, email : null, id : null, flag : true})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);