import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Cart from './orders/pages/Cart';
import Meals from './meals/pages/Meals';


const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Meals />
        </Route>
        <Route path="/cart" exact>
          <Cart />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
