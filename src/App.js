import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './pages/Login';
import RecipeesList from './pages/RecipeesList';
import RecipeDetails from './pages/RecipeDetails';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import Profile from './pages/Profile';
import RecipeInProgress from './pages/RecipeInProgress';
import RecipeDetailsProvider from './context/RecipeDetailsProvider';
import ExploreIngredients from './pages/ExploreIngredients';
import ExploreNationality from './pages/ExploreNationality';
import NotFound from './components/NotFound';

function App() {
  return (
    <Provider>
      <Switch>
        <Route
          exact
          path="/"
          component={ Login }
        />
        <Route
          exact
          path="/profile"
          component={ Profile }
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
          path="/explore/foods/ingredients"
          component={ ExploreIngredients }
        />
        <Route
          exact
          path="/explore/foods/nationalities"
          component={ ExploreNationality }
        />
        <Route
          exact
          path="/explore/drinks"
          component={ ExploreDrinks }
        />
        <Route
          exact
          path="/drinks/:id/in-progress"
          component={ RecipeInProgress }
        />
        <Route
          exact
          path="/foods/:id/in-progress"
          component={ RecipeInProgress }
        />
        <Route
          exact
          path="/explore/drinks/ingredients"
          component={ ExploreIngredients }
        />
        <RecipeDetailsProvider>
          <Route
            exact
            path="/foods/:id"
            component={ RecipeDetails }
          />
          <Route
            exact
            path="/drinks/:id"
            component={ RecipeDetails }
          />
        </RecipeDetailsProvider>
        <Route
          path="*"
          component={ NotFound }
        />
      </Switch>
    </Provider>
  );
}

export default App;
