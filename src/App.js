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

import TablePick from './meals/components/TablePick';

import CartProvider from './store/CartProvider';
import CategoryContext from './store/category-context';
import LoggedInContext from './store/loggedIn-context';
import RegisterContext from './store/register-context';
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

  const changeRegisterHandler = newState => {
    setRegister(newState);
  }

  const changeTablePickToTrue = () => {
    setPickTableIsShown(true);
  };
  const hideTablePick = () => {
    setPickTableIsShown(false);
  };


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
  const [register, setRegister] = useState(false);
  const [pickTableIsShown, setPickTableIsShown] = useState(true);








  useEffect(() => {
    console.log('this is cartCtx in app after changed' + JSON.stringify(cartCtx));
  }, [cartCtx]);

  useEffect(() => {
    console.log('this is pickTableIsShown in app after changed ' + JSON.stringify(pickTableIsShown));
  }, [pickTableIsShown]);





  const LoggedInCtx = useContext(LoggedInContext);


  return (
    <LoggedInContext.Provider value={{
      isLoggedIn: loggedIn,
      changeLoggedIn: changeLoggedInHandler
    }}>
      <RegisterContext.Provider value={{
        wantRegister: register,
        changeRegister: changeRegisterHandler
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
                <MainNavigation onLogout={changeTablePickToTrue} />
              </Route>
              <main>
                <Route path="/meals" exact >
                  <Grid />
                  {pickTableIsShown && <TablePick onClose={hideTablePick} />}
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
                <Route path="/auth" >
                  <Auth />
                </Route>
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
      </RegisterContext.Provider>
    </LoggedInContext.Provider>

  );
};

export default App;
