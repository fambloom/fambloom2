import './App.css';
import React, { Component } from "react";
import { Switch, Route, Router } from "react-router-dom";
import history from './history';
import MyNavbar from './components/MyNavbar';
import PersonList from './components/PersonList';
import Home from './pages/Home'
import Statistics from './pages/Statistics'
import FamilyNode from './components/FamilyNode'
import PersonTreeView from './components/PersonView'


// import SignUpCreate from './pages/SignUpCreate'
// import SignUpJoin from './pages/SignUpJoin'
// import Step2Create from './pages/Step2Create'
// import Step2Join from './pages/Step2Join'
// import Step2View from './pages/Step2View'

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'


class App extends Component {
  
  render() {
    return (
        <Router history={history}>
        <MyNavbar/>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/statistics">
            <Statistics/>
          </Route>
           <Route exact path="/person_list">
            <PersonList/>
          </Route>
           <Route exact path="/treenode">
            <FamilyNode/>
          </Route>
          <Route exact path="/statistics">
            <Statistics/>
          </Route>
          <Route exact path="/persontreeview">
            <PersonTreeView/>
          </Route>
          <Route exact path="/treeview">
            <TreeView/>
          </Route>
          {/*
          <Route path="/signupjoin">
          <SignUpJoin/>
          </Route>
          <Route path="/step2create">
          <Step2Create/>
          </Route>
          <Route path="/step2join">
          <Step2Join/>
          </Route>
          <Route path="/step2view">
          <Step2View/>
          </Route> */}
        </Switch>
        </Router>
    );
  }
}

export default App;