import React, { useState, useContext } from 'react';
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
import CategoryContext from './store/category-context';
import LoggedInContext from './store/loggedIn-context';

const App = () => {

  const [pickedCategory, setPickedCategory] = useState('all');
  const [loggedIn, setLoggedIn] = useState(false);


  const changeCategoryHandler = newCategory => {
    setPickedCategory(newCategory);
  }

  const changeLoggedInHandler = newState => {
    setLoggedIn(newState);
  }

  const LoggedInCtx = useContext(LoggedInContext);



  return (
    <LoggedInContext.Provider value={{
      isLoggedIn: loggedIn,
      changeLoggedIn: changeLoggedInHandler
    }}>
      <CartProvider>
        <CategoryContext.Provider value={{
          pickedCategory: pickedCategory,
          changeCategory: changeCategoryHandler
        }}>
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
            <Route path="/:u1/orders" exact >
              <MyOrders />
            </Route>
            <Route path="/about" >
              <About />
            </Route>
            <Route path="/myprofile" >
              <MyProfile />
            </Route>
            {LoggedInCtx.isLoggedIn ?
              <Route path="/auth" >
                <Auth />
              </Route>
              : <Route path="/" >
                <Auth />
              </Route>}
            {LoggedInCtx.isLoggedIn ?
              <Route path="/">
                <Redirect to="/meals" />
              </Route>
              : <Route path="/">
                <Redirect to="/auth" />
              </Route>}
          </main>
          <Footer />
        </CategoryContext.Provider>
      </CartProvider>
    </LoggedInContext.Provider>
  );
};

export default App;
