import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './pages/Login';
import RecipeesList from './pages/RecipeesList';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';

function App() {
  return (

    <BrowserRouter>
      <Provider>
        <Switch>
          <Route
            exact
            path="/"
            component={ Login }
          />
          <Route
            exact
            path="/foods"
            component={ RecipeesList }
          />
          <Route
            exact
            path="/drinks"
            component={ RecipeesList }
          />
          <Route
            exact
            path="/explore"
            component={ Explore }
          />
          <Route
            exact
            path="/explore/foods"
            component={ ExploreFoods }
          />
          <Route
            exact
            path="/explore/drinks"
            component={ ExploreDrinks }
          />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
