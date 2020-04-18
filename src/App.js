import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Covid from './components/covid/Covid';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import CreateStory from './components/stoties/CreateStory';
import SingIn from './components/auth/SingIn';
import SignUp from './components/auth/SignUp';
import fire from './firebase/fire';

function App() {
  const [user, setUser] = useState({})

  const authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user)
        setUser(user)
      else
        setUser(null)
    })
  }

  const pageRander = () => {
    if (user) {
      return (
        <BrowserRouter>
          <div>
            <Navbar />
            <Switch>
              <Route exact path='/' component={Dashboard} />
              <Route path='/covid' component={Covid} />
              <Route path='/create' component={CreateStory} />
              <Route path='/signin' component={SingIn} />
              <Route path='/signup' component={SignUp} />
            </Switch>
          </div>
        </BrowserRouter>
      )
    }
    else {
      return (
        <BrowserRouter>
          <div>
            <Navbar />
            <Switch>
              <Route exact path='/' component={SingIn} />
              <Route path='/signup' component={SignUp} />
            </Switch>
          </div>
        </BrowserRouter>
      )
    }
  }

  useEffect(() => {
    authListener()
  }, [])

  return (
    pageRander()
  )
}

export default App;
