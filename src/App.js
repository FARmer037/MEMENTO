import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Covid from './components/covid/Covid';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import CreateStory from './components/stoties/CreateStory';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route path='/covid' component={Covid} />
          <Route path='/create' component={CreateStory} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
