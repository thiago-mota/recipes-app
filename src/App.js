import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Provider from './context/Provider';
import Login from './pages/Login';
import SearchDrinkBar from './components/SearchDrinkBar';

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
          <SearchDrinkBar />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
