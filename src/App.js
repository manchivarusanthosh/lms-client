import React, { useState,useEffect } from "react";
import { Switch } from "react-router-dom";
import "./App.css";

// import axios from "axios";
import jwt from "jsonwebtoken";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";


import history from "./history.js";
import Login from "./components/Login/Login.jsx";
import axios from "axios";

import DashboardAdmin from "./components/Admin/DashboardAdmin";
import DashboardHR from './components/HR/DashboardHR'
import DashboardEmployee from './components/Employee/DashboardEmployee'


function App () {
  const [data,setData] = useState({})
  const [loading,setLoading] = useState(false)
  const [pass,setPass] = useState("true")
  const [isLogin,setIsLogin] = useState(false)

  // const history = useHistory()
  useEffect(() => {
    setData({
      _id: localStorage.getItem("_id") || "",
      Account: localStorage.getItem("Account") || "",
      Name: localStorage.getItem("Name") || ""
    })
    setIsLogin(localStorage.getItem("isLogin") == "true")
  }, [])

  const handleSubmit = event => {
    event.preventDefault();
    // console.log("entered the funct")
    setPass(true);
    setLoading(true);
    // this.login(event.target[0].value, event.target[1].value);
    let userMail = event.target[0].value
    let userPass = event.target[1].value
    // console.log(userMail)
    // console.log(userPass)
    login(userMail,userPass)  //function call for login
    event.target.reset();
  };

  const handleLogout = event => {
    // console.log("logout");
    localStorage.clear();
    setData({
      _id: localStorage.getItem("_id") || "",
      Account: localStorage.getItem("Account") || "",
      Name: localStorage.getItem("Name") || ""
    })
    setIsLogin(localStorage.getItem("isLogin") == "true")
  };

  const login =(userMail,userPass) => {
    let bodyLogin = {
      userMail : userMail,
      userPass : userPass
    };
    // console.log(typeof(bodyLogin))

    axios.post("https://pcs-lms.herokuapp.com/login",bodyLogin)
    .then( res => {
      // console.log(decodedData.Account);
      var decodedData = jwt.decode(res.data);
      // console.log("Here is the decoded data")
      // console.log(decodedData.Account)
      // console.log(decodedData["FirstName"])
      localStorage.setItem("token", res.data);

      if (
        (res == undefined ||
          res == null ||
          decodedData.Account == undefined ||
          decodedData.Account == null) &&
        !(
          decodedData.Account == 1 ||
          decodedData.Account == 2 ||
          decodedData.Account == 3
        )
      ) {
        console.log("Login failed")
        setPass(false)
        setLoading(false)
        
      } else {
        if (decodedData.Account == 1) {
          
          setPass(true)
          setLoading(false)
          setIsLogin(true)
          
          localStorage.setItem("isLogin", true);
          localStorage.setItem("Account", 1);
          localStorage.setItem("_id", decodedData["_id"]);
          localStorage.setItem(
            "Name",
            decodedData["FirstName"] + " " + decodedData["LastName"]
          );

         
          setData({
            _id: localStorage.getItem("_id") || "",
            Account: localStorage.getItem("Account") || "",
            Name: localStorage.getItem("Name") || ""
          })
          setIsLogin(localStorage.getItem("isLogin") == "true")
          history.push("/admin/home");   
        }
        if (decodedData.Account == 2) {
          
          setPass(true)
          setLoading(false)
          setIsLogin(true)
          localStorage.setItem("isLogin", true);

          localStorage.setItem("Account", 2);
          localStorage.setItem("_id", decodedData["_id"]);
          localStorage.setItem(
            "Name",
            decodedData["FirstName"] + " " + decodedData["LastName"]
          );
          
          
          setData({
            _id: localStorage.getItem("_id") || "",
            Account: localStorage.getItem("Account") || "",
            Name: localStorage.getItem("Name") || ""
          })
          setIsLogin(localStorage.getItem("isLogin") == "true")
          history.push("/hr/home");  //default page has to add
        }
        if (decodedData.Account == 3) {
          setPass(true)
          setLoading(false)
          setIsLogin(true)
          localStorage.setItem("isLogin", true);
          localStorage.setItem("Account", 3);
          localStorage.setItem("_id", decodedData["_id"]);
          localStorage.setItem(
            "Name",
            decodedData["FirstName"] + " " + decodedData["LastName"]
          );
          // console.log("decoded id",decodedData["_id"])
         
          
          setData({
            _id: localStorage.getItem("_id") || "",
            Account: localStorage.getItem("Account") || "",
            Name: localStorage.getItem("Name") || ""
          })
          setIsLogin(localStorage.getItem("isLogin") == "true")
          history.push("/employee/" + decodedData["_id"]+ "/home");
        }
      }

    })
    .catch(err => {
      console.log(err);
      setPass(false)
      setLoading(false)
    });

  } //end of login function
  
  
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
                        onSubmit={handleSubmit}
                      />
                    )
            }
          />
          <Route
            // exact
            path="/admin"
            render={() =>
              data["Account"] == 1 ? (
                <DashboardAdmin data={data} onlogout={handleLogout} />

              ) : (
                  <Redirect to="/login" />
                )
            }
          />
          <Route
            // exact
            path="/hr"
            render={() =>
              data["Account"] == 2 ? (
                <DashboardHR
                  data={data}
                  onlogout={handleLogout}
                />
              ) : (
                  <Redirect to="/login" />
                )
            }
          />

        <Route
            // exact
            path="/employee"
            render={() =>
              data["Account"] == 3 ? (
                <DashboardEmployee
                  data={data}
                  onlogout={handleLogout}
                />
              ) : (
                  <Redirect to="/login" />
                )
            }
          />     
          <Redirect to="/login" /> 
      </Switch>
    </Router>
  )
  

}

export default App;
