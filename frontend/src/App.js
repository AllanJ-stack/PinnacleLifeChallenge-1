import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import ProductHomeScreen from './screens/ProductHomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import ScanScreen from './screens/ScanScreen';
import ObjectiveScreen from './screens/ObjectiveScreen'
import { signout } from './actions/userActions';


function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  console.log(userInfo);

  
  const signoutHandler = () => {
    dispatch(signout());
  };


    
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
          <Link className="brand" to="/">
              Pinnacle Life Challenge
          </Link>
          
          </div>
          
          <div>
            <Link to="/objectives">My Objectives</Link>
            <Link to="/products">My Products</Link>
            <Link to="/purchases">My Purchases</Link>
            <Link to="/cart">
              My Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            <Link to="/budgetsheet">My Budget Sheet</Link>
            
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.username} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  {userInfo.username} <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                </ul>
              </div>
            )}
 
            
          </div>
        </header>
        <main>
        <Route path="/cart/:id?" component={CartScreen}></Route>
        <Route path="/product/:id" component={ProductScreen}></Route>
        <Route path="/products" component={ ProductHomeScreen}></Route>
        <Route path="/purchases" component={ ScanScreen }></Route>
        <Route path="/objectives" component={ ObjectiveScreen }></Route>
       <Route path="/signin" component={SigninScreen}></Route>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
