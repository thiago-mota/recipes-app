import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          component={ Login }
        />
        <Route
          path="/explore"
          component={ Explore }
        />
        <Route
          path="/explore/foods"
          component={ ExploreFoods }
        />
        <Route
          path="/explore/drinks"
          component={ ExploreDrinks }
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
