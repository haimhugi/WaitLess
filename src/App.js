import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Cart from './orders/pages/Cart';
import Meals from './meals/pages/Meals';
import MainNavigation from './shared/components/Navigation/MainNavigation';


const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <Meals />
          </Route>
          <Route path="/cart" exact>
            <Cart />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
