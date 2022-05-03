import React, { useState, useContext, useEffect, useRef } from 'react';
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
import OrderContext from './store/orders-context';
import CartContext from './store/cart-context';

const App = () => {


  const cartCtx = useContext(CartContext);



  const changeCategoryHandler = newCategory => {
    setPickedCategory(newCategory);
  }

  const changeLoggedInHandler = newState => {
    setLoggedIn(newState);
  }


  const addNewOrderHandler = newOrder => {
    let newOrders = [...ordersList.current];
    newOrders.push(newOrder);
    ordersList.current = newOrders;
  }

  let ordersList = useRef([{
    orderId: 'o1',
    date: '',
    totalPayed: 0,
    mealsAmount: 0,
    mealsList: [],
    addOrder: addNewOrderHandler,
  }]);


  const [pickedCategory, setPickedCategory] = useState('הכל');
  const [loggedIn, setLoggedIn] = useState(false);




  useEffect(() => {
    console.log('this is cartCtx in app after changed' + JSON.stringify(cartCtx));
  }, [cartCtx]);




  const LoggedInCtx = useContext(LoggedInContext);



  return (
    <LoggedInContext.Provider value={{
      isLoggedIn: loggedIn,
      changeLoggedIn: changeLoggedInHandler
    }}>
      <OrderContext.Provider
        value={{
          ordersList: ordersList
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
                : <Route path="/auth" >
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
      </OrderContext.Provider>
    </LoggedInContext.Provider>
  );
};

export default App;
