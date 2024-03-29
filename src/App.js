import React, { useState, useContext, useRef, useCallback } from 'react';
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
import { AuthContext } from './store/auth-context';
import RegisterContext from './store/register-context';
import OrderContext from './store/orders-context';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';
import ErrorModal from './shared/components/UIElements/ErrorModal';
import { useHttpClient } from "./shared/hooks/http-hook";




const App = () => {

  const { error, clearError } = useHttpClient();


  const changeStatusHandler = newStatus => {
    setOrderStatus(newStatus)
  }

  const changeCategoryHandler = newCategory => {
    setPickedCategory(newCategory);
  }

  const login = useCallback((uid, admin) => {
    setLoggedIn(true);
    setUserId(uid);
    setIsAdmin(admin);
  }, [])

  const logout = useCallback(() => {
    setLoggedIn(false);
    setUserId(null);
    setIsAdmin(false);
  }, []);

  const changeRegisterHandler = newState => {
    setRegister(newState);
  }

  const changeTablePickToTrue = useCallback(() => {
    setPickTableIsShown(true);
  }, []);

  const hideTablePick = useCallback(() => {
    setPickTableIsShown(false);
  }, []);


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
  const [userId, setUserId] = useState(false);
  const [register, setRegister] = useState(false);
  const [pickTableIsShown, setPickTableIsShown] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);



  const AuthCtx = useContext(AuthContext);


  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <AuthContext.Provider value={{
        isLoggedIn: loggedIn,
        userId: userId,
        isAdmin: isAdmin,
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
                    <MainNavigation isAdmin={isAdmin} TablePickToTrue={changeTablePickToTrue} />
                  </Route>
                  <main>
                    <div className='img'></div>
                    <div className='main-body'>
                      <Route path="/loading" exact >
                        <LoadingSpinner />
                      </Route>
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
                      {AuthCtx.isLoggedIn ?
                        <Route path="/">
                          <Redirect to="/meals" />
                        </Route>
                        : <Route path="/">
                          <Redirect to="/auth" />
                        </Route>}
                    </div>
                  </main>
                  <Footer className='footer' />
                </StatusContext.Provider>
              </CategoryContext.Provider>
            </CartProvider>
          </OrderContext.Provider>
        </RegisterContext.Provider>
      </AuthContext.Provider>
    </React.Fragment>

  );
};

export default App;
