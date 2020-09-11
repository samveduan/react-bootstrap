import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import First from './First';
import Login from './pages/login/login';
import './App.css';

class App extends React.Component {
  render() {
    return (<BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={First} />
      </Switch>
    </BrowserRouter>)
  }
}

export default App;