import './App.css';
import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MyNavbar from './components/MyNavbar';
import PersonList from './components/PersonList';
import Home from './pages/Home'
import Statistics from './pages/Statistics'
import FamilyNode from './components/FamilyNode'
import TreeView from './pages/TreeView'
import PersonView from './components/PersonView'


// import SignUpCreate from './pages/SignUpCreate'
// import SignUpJoin from './pages/SignUpJoin'
// import Step2Create from './pages/Step2Create'
// import Step2Join from './pages/Step2Join'
// import Step2View from './pages/Step2View'


class App extends Component {
  
  render() {
    return (
      <div>
        <BrowserRouter>
        <MyNavbar/>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/statistics">
            <Statistics/>
          </Route>
           <Route path="/person_list">
            <PersonList/>
          </Route>
           <Route path="/treenode">
            <FamilyNode/>
          </Route>
          <Route path="/statistics">
            <Statistics/>
          </Route>
          <Route path="/treeview">
            <TreeView/>
          </Route>
          <Route path="/personview">
            <PersonView/>
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
        </BrowserRouter>
      </div>
    );
  }
}

export default App;