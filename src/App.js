import React from 'react';
import { Route, Redirect } from 'react-router-dom';


import './App.css'
import Cart from './cart/pages/Cart';
import Footer from './shared/components/Footer';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Grid from './shared/components/UIElements/Grid';
import MyOrders from './orders/pages/MyOrders';
import About from './about/pages/About';
import MyProfile from './MyProfile/pages/MyProfile';
import Auth from './auth/pages/Auth';
import CartProvider from './store/CartProvider';

const App = () => {
  return (
    <CartProvider>
      <Route >
        <MainNavigation />
      </Route>
      <main>
        <Route path="/meals" exact >
          <Grid />
        </Route>
        <Route path="/cart" exact>
          <Cart />
        </Route>
        <Route path="/u1/orders" >
          <MyOrders />
        </Route>
        <Route path="/about" >
          <About />
        </Route>
        <Route path="/myprofile" >
          <MyProfile />
        </Route>
        <Route path="/auth" >
          <Auth />
        </Route>
        <Route path="/">
          <Redirect to="/meals" />
        </Route>
      </main>
      <Footer />

    </CartProvider>
  );
};

export default App;
