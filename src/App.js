import React, { useState, useContext, useEffect, useRef, useCallback } from 'react';
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
import OrderManagement from './orderManagement/pages/OrderManagement';

import TablePick from './meals/components/TablePick';

import CartProvider from './store/CartProvider';
import CategoryContext from './store/category-context';
import StatusContext from './store/status-context';
import LoggedInContext from './store/loggedIn-context';
import RegisterContext from './store/register-context';
import OrderContext from './store/orders-context';
import CartContext from './store/cart-context';


const App = () => {


  const cartCtx = useContext(CartContext);

  const changeStatusHandler = newStatus => {
    console.log('clicked and get' + newStatus);
    setOrderStatus(newStatus)
  }

  const changeCategoryHandler = newCategory => {
    setPickedCategory(newCategory);
  }

  const login = useCallback(uid => {
    setLoggedIn(true);
    setUserId(uid);
  }, [])

  const logout = useCallback(() => {
    setLoggedIn(false);
    setUserId(null);
  }, []);

  const changeRegisterHandler = newState => {
    setRegister(newState);
  }

  const changeTablePickToTrue = () => {
    setPickTableIsShown(true);
  };
  const hideTablePick = () => {
    setPickTableIsShown(false);
  };

  const isAdminToTrue = () => {
    setIsAdmin(true);
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
  const [pickedOrderStatus, setOrderStatus] = useState('in preparation');
  const [loggedIn, setLoggedIn] = useState(false);
  const [register, setRegister] = useState(false);
  const [pickTableIsShown, setPickTableIsShown] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState(false);


  /*
    useEffect(() => {
      console.log('this is cartCtx in app after changed' + JSON.stringify(cartCtx));
    }, [cartCtx]);
  
    useEffect(() => {
      console.log('this is pickTableIsShown in app after changed ' + JSON.stringify(pickTableIsShown));
    }, [pickTableIsShown]);
  
  */
  useEffect(() => {
    console.log('this is pickedOrderStatus in app after changed ' + JSON.stringify(pickedOrderStatus));
  }, [pickedOrderStatus]);



  const LoggedInCtx = useContext(LoggedInContext);


  return (
    <LoggedInContext.Provider value={{
      isLoggedIn: loggedIn,
      changeToLoggedIn: login,
      changeToLoggedOut: logout
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
              <StatusContext.Provider value={{
                pickedOrderStatus: pickedOrderStatus,
                changeStatus: changeStatusHandler
              }}>
                <Route >
                  <MainNavigation isAdmin={isAdmin} onLogout={changeTablePickToTrue} />
                </Route>
                <main>
                  <Route path="/meals" exact >
                    <Grid isAdmin={isAdmin} />
                    {pickTableIsShown && !isAdmin && <TablePick onClose={hideTablePick} />}
                  </Route>
                  {!isAdmin && <Route path="/cart" exact>
                    <Cart />
                  </Route>}
                  {!isAdmin && <Route path="/:u1/orders" exact >
                    <MyOrders />
                  </Route>}
                  {!isAdmin && <Route path="/about" >
                    <About />
                  </Route>}
                  {!isAdmin && <Route path="/myProfile" >
                    <MyProfile />
                  </Route>}
                  {isAdmin && <Route path="/OrderManagement" >
                    <OrderManagement />
                  </Route>}
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
              </StatusContext.Provider>
            </CategoryContext.Provider>
          </CartProvider>
        </OrderContext.Provider>
      </RegisterContext.Provider>
    </LoggedInContext.Provider>

  );
};

export default App;
