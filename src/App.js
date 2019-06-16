import React, { Component } from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import MainPage from '../src/components/MainPage/MainPage';
import Blogs from './components/Blogs/Blogs';
import Gallery from './components/Gallery/Gallery';
import Reviews from './components/Reviews/Reviews';
import Register from './components/Register/Register';
import About from '../src/components/About/About';
import Contacts from '../src/components/Contacts/Contacts';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path='/blogs' exact component={Blogs} />
          <Route path='/about' exact component={About} />
          <Route path='/gallery' exact component={Gallery} />
          <Route path='/reviews' exact component={Reviews} />
          <Route path='/register' exact component={Register} />
          <Route path='/contacts' exact component={Contacts} />
          <Route path='/' exact component={MainPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
