import React, { useState,useEffect } from "react";
import { Switch } from "react-router-dom";
import "./App.css";
// import axios from "axios";
// import jwt from "jsonwebtoken";
import {
  HashRouter as Router,
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
        {/* <Route
              exact
              path="/login"
              render={(props) =>
                this.state.data["Account"] === 1 ? (
                  // <Dashboard />
                  <Redirect to="/admin" />
                ) : // <Login OnLogin={this.handleLogin}/>

                  this.state.data["Account"] === 2 ? (
                    // <Dashboard />
                    <Redirect to="/hr" />
                  ) : //
                    this.state.data["Account"] == 3 ? (
                      // <Dashboard />
                      <Redirect to="/employee" />
                    ) : (
                        <Login
                          onSubmit={this.handleSubmit}
                          loading={this.state.loading}
                          pass={this.state.pass}
                        />
                      )
              }
            /> */}
            <Route exact path="/login" data={()=>isLogin}  component={Login}/>
        
      </Switch>
    </Router>
  )
  

}

export default App;
