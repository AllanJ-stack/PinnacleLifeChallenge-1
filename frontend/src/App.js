import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import ProductHomeScreen from "./screens/ProductHomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import ScanScreen from "./screens/ScanScreen";
import ObjectiveScreen from "./screens/ObjectiveScreen";
import { signout } from "./actions/userActions";
import DashboardScreen from "./screens/DashboardScreen"
import BudgetSheetScreenT from "./screens/BudgetSheetScreenT";

export default function App(props) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
  };
  
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/signin">
              Pinnacle Life Challenge
            </Link>
          </div>
          <div>
          {/* {!userInfo ? (
              <div>
                <Link to="/signin">Sign In</Link>
              </div>
            ) } */}
            {userInfo && userInfo.isAdmin === "True" ? (
              <div className="dropdown">
                <Link to="#admin">
                {userInfo.username} <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                    </li>
                </ul>
              </div>
            ): userInfo && userInfo.isAdmin === "False" ? (
              <div className="dropdown">
              <Link to="#">
                {userInfo.username} <i className="fa fa-caret-down"></i>{" "}
              </Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="/objectives">My Objectives</Link>
                </li>
                <li>
                  <Link to="/products">My Products</Link>
                </li>
                <li>
                  <Link to="/purchases">My Purchases</Link>
                </li>
                <li>
                  <Link to="/cart">
                    My Cart
                    {cartItems.length > 0 && (
                      <span className="badge">{cartItems.length}</span>
                    )}
                  </Link>
                </li>
                <li>
                  <Link to="/budgetsheet">My Budget Sheet</Link>
                </li>
                <li>
                  <Link to="/" onClick={signoutHandler}>
                    Sign Out
                  </Link>
                </li>
              </ul>
            </div>
            ): (
            <Link to="/signin">Sign In</Link>
            )} 
              
          </div>
        </header>
        <main>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/products" component={ProductHomeScreen}></Route>
          <Route path="/purchases" component={ScanScreen}></Route>
          <Route path="/objectives" component={ObjectiveScreen}></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/dashboard" component={DashboardScreen}></Route>
          <Route path="/budgetsheet" component={BudgetSheetScreenT}></Route>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}
