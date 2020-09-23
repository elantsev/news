import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Home from './components/home/Home';
import News from './components/news/News';
import Settings from './components/settings/Settings';

function App () {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/news" component={News}/>
      
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
