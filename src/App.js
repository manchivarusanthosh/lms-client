import React, { useState,useEffect } from "react";
import { Switch } from "react-router-dom";
import "./App.css";
// import axios from "axios";
// import jwt from "jsonwebtoken";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  DefaultRoute
} from "react-router-dom";
// import history from "./history.js";

import Login from "./components/Login/Login.jsx";

function App () {
  const [data,setData] = useState({})
  const [loading,setLoading] = useState("false")
  const [pass,setPass] = useState("true")
  const [isLogin,setIsLogin] = useState("false")

  useEffect(() => {
    setData({
      id: localStorage.getItem("_id") || "",
      Account: localStorage.getItem("Account") || "",
      Name: localStorage.getItem("Name") || ""
    })
    setIsLogin(localStorage.getItem("isLogin") === "true")
  }, [])


  // console.log(isLogin)
  
  return (
    <Router>
      <Switch>
        <Route
              exact
              path="/login"
              render={() => data["Account"] == 1 ? (<Redirect to="/admin" />) : data["Account"] == 2 ? (<Redirect to="/hr"/>) : //
                  data["Account"] == 3 ? (<Redirect to="/employee" />) : (
                      <Login
                        loading={loading}
                        pass={pass}
                        // onSubmit={handleSubmit}
                      />
                    )
            }
          />
            
        
      </Switch>
    </Router>
  )
  

}

export default App;
