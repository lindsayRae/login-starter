import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Activate from './pages/Activate';
import StartPassReset from './pages/StartPassReset';
import FinishPassReset from './pages/FinishPassReset';
import Home from './pages/Home';

import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <div className='App-header'>
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/signup' exact component={Signup} />
          <Route path='/activate' exact component={Activate} />
          <Route path='/forgotpass' exact component={StartPassReset} />
          <Route path='/reset-pass' exact component={FinishPassReset} />
          <Route path='/home' exact component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
export default App;
