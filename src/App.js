import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import FoodsMain from './pages/FoodsMain';

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
          exact
          path="/foods"
          component={ FoodsMain }
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
