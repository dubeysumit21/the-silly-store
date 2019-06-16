import React, { Component } from 'react';
import classes from './MainPage.css';
import homepageimage from '../../assets/images/homepageimage.jpg';
import boy from '../../assets/images/boy.png';
import team from '../../assets/images/team.png';
import DrawerToggleButton from '../../components/SideDrawer/DrawerToggleButton';
import SideDrawer from '../../components/SideDrawer/SideDrawer';
import Backdrop from '../../components/Backdrop/Backdrop';
import Header from '../Header/Header';
import axios from 'axios';
import {connect} from 'react-redux';

class MainPage extends Component {

    state={
      value: {
        emailValue: '',
        emailValues: {
            required: true,
            valid: false,
        },
        emailTouched: false,
        passwordValue: '',
        passwordValues: {
            required: true,
            valid: false,
            passwordLength : 7
        },
        passwordTouched: false,
      sideDrawerOpen : false
      },
      signInValue : {
        emailValue: '',
        emailValues: {
            required: true,
            valid: false,
        },
        emailTouched: false,
        passwordValue: '',
        passwordValues: {
            required: true,
            valid: false,
            passwordLength : 6
        },
        passwordTouched: false,
      sideDrawerOpen : false
      },
      inError : null,
      outError : null
  }

  componentDidMount = () => {
    console.log(this.props.flag);
  }
    drawerToggleClickHandler = () => {
      this.setState((prevState) => {
        return {sideDrawerOpen : !prevState.sideDrawerOpen}
      })
    }
  
    backdropClickHandler = () => {
      this.setState( {sideDrawerOpen : false} );
    }

    checkValidity(value, rules) {
      let isValid =  false;
      if(rules.required){
          isValid = value.trim() !== '';
      }
      if(rules.passwordLength){
          isValid = value.length === rules.passwordLength;
      }
      return isValid;
  }

    valueChangeHandler = (event, valueIdentifier) => {
       switch(valueIdentifier){
         case 0 : let newValue = {...this.state.value};
         newValue.emailValue = event.target.value;
         newValue.emailValues.valid = this.checkValidity(newValue.emailValue, newValue.emailValues);
         newValue.emailTouched = true;
         this.setState( { value : newValue } );
         break;
         case 1 : newValue = {...this.state.value};
         newValue.passwordValue = event.target.value;
         newValue.passwordValues.valid = this.checkValidity(newValue.passwordValue, newValue.passwordValues);
         newValue.passwordTouched = true;
         this.setState( { value : newValue } );
         break;
         default : console.log("Wrong Entry");
         break;
       }
    }

    signInValueChangeHandler = (event, valueIdentifier) => {
      switch(valueIdentifier){
        case 0 : let newValue = {...this.state.signInValue};
        newValue.emailValue = event.target.value;
        newValue.emailValues.valid = this.checkValidity(newValue.emailValue, newValue.emailValues);
        newValue.emailTouched = true;
        this.setState( { signInValue : newValue } );
        break;
        case 1 : newValue = {...this.state.signInValue};
        newValue.passwordValue = event.target.value;
        newValue.passwordValues.valid = this.checkValidity(newValue.passwordValue, newValue.passwordValues);
        newValue.passwordTouched = true;
        this.setState( { signInValue : newValue } );
        break;
        default : console.log("Wrong Entry");
        break;
      }
   }

    submitDataHandler = (event) => {
      event.preventDefault();
      const signupData = {
        email: this.state.value.emailValue,
        password: this.state.value.passwordValue,
        returnSecureToken: true
      };
      axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyD_qtsbS-9kP30tAZ5k4TuTftqTkL5BHVw', signupData)
           .then(response => {
             console.log(response);
             const newValue = {...this.state.value};
             newValue.emailValue = '';
             newValue.passwordValue = '';
             this.setState( {value : newValue, outError : 'Registered Successfully, Login to Continue'} )
           })
           .catch(err => {
            const newValue = {...this.state.signInValue};
            newValue.emailValue = '';
            newValue.passwordValue = '';
            this.setState({outError : err.response.data.error.message, value : newValue});
           });
    }

    receiveDataHandler = (event) => {
      event.preventDefault();
      const signinData = {
        email: this.state.signInValue.emailValue,
        password: this.state.signInValue.passwordValue,
        returnSecureToken: true
      };
      axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyD_qtsbS-9kP30tAZ5k4TuTftqTkL5BHVw', signinData)
           .then(response => {
             console.log(response);
             this.props.userNameHandler(response.data.email, response.data.idToken);
             const newValue = {...this.state.signInValue};
             newValue.emailValue = '';
             newValue.passwordValue = '';
             this.setState( {signInValue : newValue} );
             this.props.history.push('/about');
           })
           .catch(err => {
            const newValue = {...this.state.signInValue};
            newValue.emailValue = '';
            newValue.passwordValue = '';
            this.setState({inError : err.response.data.error.message, signInValue : newValue});
           });
    }
  
    render() {
      const inEmailClass = [classes.forminput]; const inPassClass = [classes.forminput];
      const upEmailClass = [classes.forminput]; const upPassClass = [classes.forminput];
      if(!this.state.value.emailValues.valid && this.state.value.emailTouched){
        upEmailClass.push(classes.red);
      }
      if(!this.state.value.passwordValues.valid && this.state.value.passwordTouched){
        upPassClass.push(classes.red);
      }
      if(!this.state.signInValue.emailValues.valid && this.state.signInValue.emailTouched){
        inEmailClass.push(classes.red);
      }
      if(!this.state.signInValue.passwordValues.valid && this.state.signInValue.passwordTouched){
        inPassClass.push(classes.red);
      }
      let backdrop;
      if(this.state.sideDrawerOpen){
        backdrop=<Backdrop clicked={this.backdropClickHandler}/>
      }
      return (
        <div style={{height: '100%'}}>
            <body>
                <img className={classes.image} src={homepageimage} alt="backgroundimage" />
                <div className={classes.wrapper}>
                  <div className={classes.header}><Header properties={this.props}/></div>
                  <div className={classes.signin}>
                  <div className={classes.signupbox}>
                      <p className={[classes.animated, classes.fadeIn].join(' ')}>Already a Member? Sign In.</p>
                      {this.props.flag ? <p>Logged Out Successfully</p> : null}
                      <div className={classes.signupform}>
                        <img style={{ width: '50px', marginTop: '15px'}} src={team} alt="boy" />
                        <p style={{color: '#FE948F'}}>SIGN IN</p>
                        <form onSubmit={this.receiveDataHandler}>
                          <input className={inEmailClass.join(' ')} 
                                  type="email"
                                  value={this.state.signInValue.emailValue}
                                  onChange={(event) => this.signInValueChangeHandler(event, 0)}
                                  placeholder="Your Mail" />
                          <input className={inPassClass.join(' ')}
                                  type="password" 
                                  value={this.state.signInValue.passwordValue}
                                  onChange={(event) => this.signInValueChangeHandler(event, 1)}
                                  placeholder="Your Password" />
                          <button className={[classes.forminput, classes.formbutton].join(' ')}>Submit</button>
                        </form>
                        <div>{this.state.inError}</div>
                      </div>
                    </div>
                  </div>
                  <div className={classes.signup}>
                    <div className={classes.signupbox}>
                      <p className={[classes.animated, classes.fadeIn, classes.formtext].join(' ')}>Not a Member? Give in your Details.</p>
                      <div className={[classes.signupform, classes.animated, classes.fadeIn].join(' ')}>
                        <img style={{ width: '50px', marginTop: '15px'}} src={boy} alt="boy" />
                        <p style={{color: '#FE948F'}}>SIGN UP</p>
                        <form onSubmit={this.submitDataHandler}>
                          <input className={upEmailClass.join(' ')} 
                                type="email" 
                                placeholder="Your Mail" 
                                value={this.state.value.emailValue} 
                                onChange={(event) => this.valueChangeHandler(event, 0)}/>
                          <input className={upPassClass.join(' ')} 
                                type="password" 
                                placeholder="Your Password" 
                                value={this.state.value.passwordValue}
                                onChange={(event) => this.valueChangeHandler(event, 1)}/>
                          <div><p style={{fontSize: '15px'}}>Password should be 6 characters long.</p></div>
                          <button className={[classes.forminput, classes.formbutton].join(' ')}>Submit</button>
                        </form>
                        <div>{this.state.outError}</div>
                      </div>
                    </div>
                  </div>
                  <div className={classes.footer}>
                    <div className={classes.footercontents}>
                      <p style={{color: '#FE948F'}}> &#169; The Silly Store. All Rights Reserved</p>    
                    </div>
                  </div>
                </div>
            </body>
        </div>
      );
    }
  }

  const mapStateToProps = state => {
    return {
      flag : state.logOutFlagger
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      userNameHandler : (email, id) => dispatch({type: 1, email : email, id : id})
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(MainPage);