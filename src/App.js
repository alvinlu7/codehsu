import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Splash from './containers/Splash/Splash';
import Home from './containers/Home/Home';


class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/home" component={Home}/>
          <Route path="/" component={Splash}/>
        </Switch>
      </div>
    );
  }
}

export default App;
