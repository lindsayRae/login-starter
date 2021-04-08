import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Activate from './pages/Activate';
import StartPassReset from './pages/StartPassReset';
import FinishPassReset from './pages/FinishPassReset';
import Home from './pages/Home';
import Contact from './pages/Contact';
import DeleteAccount from './pages/DeleteAccount';
import ChangePassword from './pages/ChangePassword';

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
          <Route path='/pass-reset' exact component={FinishPassReset} />
          <Route path='/home' exact component={Home} />
          <Route path='/contact' exact component={Contact} />
          <Route path='/delete' exact component={DeleteAccount} />
          <Route path='/change-pass' exact component={ChangePassword} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
export default App;
