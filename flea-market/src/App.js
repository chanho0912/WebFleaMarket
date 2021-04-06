import './App.css';
import React, {useEffect} from "react";
import Header from './Header';
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Checkout from './Checkout';
import Login from './Login';
import {firebaseApp} from "./firebase";
import {useStateValue} from "./StateProvider";
import Payment from "./Payment";
import {loadStripe} from "@stripe/stripe-js"
import {Elements} from "@stripe/react-stripe-js"
import Upload from './Upload';
import Signin from './Signin';
import Admin from './Admin';
import UserProduct from './UserProduct';
import Search from './Search';
import Orders from './Orders';

const promise = loadStripe('pk_test_51I0UO8Lw6nGqbpu3EGwWCODW0eo1y30gJT6xzqK21upOZ9b4QIRvxQBMElceXq4u05S1QqJr3xeZAL2b2j2SZT9600isLM2IPu');
const auth = firebaseApp.auth();

function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged(authUser =>{
      console.log('The user is >>>', authUser);

      if (authUser){

        dispatch({
          type: 'SET_USER',
          user: authUser,
        })
      }else{
        // user logged out
        dispatch({
          type: 'SET_USER',
          user: null,
        })
      }
    })
  }, [])

  return (
    // BEM
    <Router>
      <div className="app">
        <Switch>
          <Route path="/search">
            <Header />
            <Search />
          </Route>

          <Route path="/orders">
            <Header />
            <Orders />
          </Route>

          <Route path="/login">
            <Login />
          </Route>
          
          <Route path="/signin">
            <Signin />
          </Route>
          
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
                   
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>

          <Route path="/upload">
            <Header />
            <Upload />
          </Route>
          
          
          <Route path="/product">
            <Header />
            <UserProduct />
          </Route>
          
          {auth.currentUser?.email == "chanho0912@naver.com" && 
          <Route path="/admin">
            <Header/>
            <Admin />
          </Route>} 

          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
