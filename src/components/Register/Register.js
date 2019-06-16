import React, { Component } from 'react';
import Header from '../Header/Header';
import classes from './Register.css';
import {connect} from 'react-redux';
import axios from 'axios';
import Spinner from '../../UI/Spinner/Spinner';

class Register extends Component{

    state = {
        value:{
            nameValue : null,
            hobbyValue : null,
            addressValue : null,
            educationValue : null
        },
        loading: false,
        flagText : null
    }

    valueChangeHandler = (event, valueIdentifier) => {
        switch(valueIdentifier){
            case 0: let newValue = {...this.state.value};
            newValue.nameValue = event.target.value;
            this.setState({ value : newValue });
            break;
            case 1: newValue = {...this.state.value};
            newValue.hobbyValue = event.target.value;
            this.setState({ value : newValue });
            break;
            case 2: newValue = {...this.state.value};
            newValue.addressValue = event.target.value;
            this.setState({ value : newValue });
            break;
            case 3
            : newValue = {...this.state.value};
            newValue.educationValue = event.target.value;
            this.setState({ value : newValue });
            break;
            default: console.log('Wrong Entry');
            break;
        }
    }

    submitDataHandler = (event) => {
        event.preventDefault();
        this.setState(prevState => {
            return { loading : !prevState.loading}
        });
        const info = this.state.value;
        axios.post('https://login-logout-6966f.firebaseio.com/.json', info)
             .then(response => {
                 console.log(response.data);
                 const newValue = {...this.state.value};
                 newValue.nameValue = null;
                 newValue.hobbyValue = null;
                 newValue.addressValue = null;
                 newValue.educationValue = null;
                 this.setState( { loading : false, value : newValue, flagText : 'Your Response Has Been Recorded'})
             });
    }

    buttonHandler = () => {
        {
            return true;
        }
    }


    render(){
        let formContent = null;
        if(this.props.userName){
            formContent = (
                <div className={classes.heading}>
                    <h4>Hello, We would like to know more about you.</h4>
                    <form className={classes.formClass} onSubmit = {this.submitDataHandler}>
                        <input className={classes.formItems} 
                                onChange={(event) => this.valueChangeHandler(event, 0)} 
                                type="text"
                                value={this.state.value.nameValue} 
                                placeholder="Your Name" />
                        <input className={classes.formItems} 
                                onChange={(event) => this.valueChangeHandler(event, 1)} 
                                type="text"
                                value={this.state.value.hobbyValue} 
                                placeholder="Your Hobbies" />
                        <input className={classes.formItems} 
                                onChange={(event) => this.valueChangeHandler(event, 2)} 
                                type="text" 
                                value={this.state.value.addressValue}
                                placeholder="Your Address" />
                        <input className={classes.formItems} 
                                onChange={(event) => this.valueChangeHandler(event, 3)} 
                                type="text" 
                                value={this.state.value.educationValue}
                                placeholder="Highest Education" />
                        <button className={classes.btn} disabled = {() => this.buttonHandler()}>Submit</button>  
                        <p>{this.state.flagText}</p>
                    </form>
                </div>
            )
        }
        else {
            formContent = <h4 className={classes.heading}>Please Sign In to Continue!</h4>
        }
        let formElement = (
            <div className={classes.container}>
                <div className={classes.navigation}>
                    <div className={classes.navigationHolder}><Header properties={this.props} /></div>
                </div>
                {formContent}
            </div>
        );
        if(this.state.loading){
            formElement = <Spinner />
        }
        return(
            <div>
                {formElement}
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

export default connect(mapStateToProps)(Register);