import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";

import "./default.scss";
import { auth, handleUserProfile } from "./firebase/utils";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Recovery from "./pages/Recovery";
import Registration from "./pages/Registration";
const App=()=> {
  //auth olduqda
  const [initialState, setInitialState] = useState({
    currentUser: null,
  });

  

  useEffect(() => {
    //login olmamisdan evvel statedeki currentUser nulldu login oldugda object qaytarir hansiki orda gmail melumatlari  var
    let authListener = null;
    authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        console.log(userAuth);
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          setInitialState({
            currentUser: {
              id: snapshot.id,
              photoURL:userAuth.photoURL,
              ...snapshot.data(),
            },
          });
        });
      }

      setInitialState({
        ...initialState,
      });
    });
  }, []);

  console.log(initialState);

  return (
    <div className="App">
      {/* Header-a props kimi gondermek */}
      <Header user={initialState.currentUser} />
      <div className="main">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/registration">
          {initialState.currentUser ? <Redirect to="/" /> : <Registration />}
          </Route>
          <Route path="/login">
            {/* eger login olubsa ana sehifye qayitmasi ucun redirect */}
            {initialState.currentUser ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route path="/recovery" component={Recovery}/>
        </Switch>
      </div>

      <Footer />
    </div>
  );
}

export default App;
