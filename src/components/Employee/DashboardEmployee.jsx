import React, { useState } from "react";
import "./DashboardEmployee.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
// import { Switch } from "react-router";
// import { Redirect } from "react-router-dom";


// import Role from "../Role.jsx";
import NavBar from "../NavBar.jsx";

//components
import Employeehome from "./Employeehome";


import LeaveApplicationEmp from "./LeaveApplicationEmp";
import axios from "axios";
import Holidays from "../Holidays/Holidays";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHome,
  faPenFancy,
  faUmbrellaBeach,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import Profile from "../Profile/Profile";

// function RoleAdminF() {
//   return <Role />;
// }

function DashboardAdmin(props) {
//   state = {
//     redirect: true,
//     checked: true 
//   };
    // console.log("Value of props",props)
    // console.log("value of data in props",props.data)
    // console.log("value of id in data in props _id",props.data["_id"])

    // console.log("value of id in data in props",props.data["id"])

    const [redirect, setRedirect] = useState(true)
    const [checked, setChecked] = useState(true)

    // console.log("starting value",checked)
    const handleChange=(checked)=> {
    // console.log("switch");
    // console.log("Start:",checked)
    if(checked===true){
        // console.log("if statement") 
      document.getElementById("sidebar").setAttribute("class", "display-block");
    }
    else{
        // console.log("in else:",checked)
        document.getElementById("sidebar").setAttribute("class", "display-none");
    }   
    // console.log("after else:",checked)
    setChecked(checked)
    // console.log("End:",checked)
  }

  useEffect(()=>{
    getLeaveBalance()
  })



  // function to load leave Balance when dashboard is loaded
  function getLeaveBalance(){
    axios.get("https://pcs-lms.herokuapp.com/leave-application-emp/"+ props.data["_id"]+ "/leave-balance",{
      headers:{
        authorization:localStorage.getItem("token") || ""
      }
    })
    .then(res=>{
      // console.log("Leave balance")
      // console.log("res",res.data.leaveBalance)
      localStorage.setItem("leaveBalance",res.data.leaveBalance)
    })
    .catch(err =>{
      console.log("err",err)
    })
  }

  
    return (
     
      <Router>
        <div id="outer-main-div">
          <div id="outer-nav">
            <NavBar loginInfo={props.data} checked={checked} handleChange={handleChange} onlogout={props.onlogout}/>
          </div>

         <div id="main-non-nav">
            <div id="sidebar">
              <div id="sidebar-top-content" />
              <div id="main-title">
                {/* <FontAwesomeIcon icon={faUsersCog} className="sidebar-icon" /> */}
                
              </div>
              <ul className="navbar-ul">
                <li className="active">
                  <Link to= { "/employee/" + props.data["_id"] + "/home"}>
                    <FontAwesomeIcon icon={faHome} className="sidebar-icon" /> 
                    Home 
                  </Link> 
                </li>
                <li>
                  <Link to={ "/employee/"+ props.data["_id"]+ "/leave-application-emp"}>
                    <FontAwesomeIcon icon={faPenFancy} className="sidebar-icon" /> 
                    Leave 
                  </Link> 
                </li>
                <li>
                  <Link to={ "/employee/"+ props.data["_id"]+ "/holidays"}>
                    <FontAwesomeIcon icon={faUmbrellaBeach} className="sidebar-icon" /> 
                    Holidays  
                  </Link> 
                </li>
                <li>
                  <Link to={ "/employee/"+ props.data["_id"] +"/profile"}>
                    <FontAwesomeIcon
                      icon={faUser}
                      className="sidebar-icon"
                    /> 
                    Profile 
                  </Link> 
                </li>
              </ul>
            </div>
           
            <div id="main-area">
              <div id="sidebar-top-content" />
                <Switch>

                {/* Default Route on login */}
                <Route exact path="/employee" 
                  render={()=>
                    <Employeehome data={props.data} leaveBalance={localStorage.getItem("leaveBalance")} back={false}/>
                  }/>

                  {/* Home Route */}
                  <Route exact path="/employee/:id/home" 
                  render={()=>
                    <Employeehome data={props.data} leaveBalance={localStorage.getItem("leaveBalance")} back={false}/>
                  }/>

                {/* Leave Application Route */}
                  <Route exact path="/employee/:id/leave-application-emp"
                    render={() => <LeaveApplicationEmp data={props.data} />}
                  />

                {/* Holidays Route */}
                <Route path="/employee/:id/holidays" component={Holidays}/>

                {/* Profile Route */}
                <Route exact path="/employee/:id/profile" 
                  render={()=>
                    <Profile data={props.data} back={false}/>
                  }/>

                </Switch>
            </div>
          </div> 
        </div> 
      </Router>
    );
  
}

export default DashboardAdmin;
