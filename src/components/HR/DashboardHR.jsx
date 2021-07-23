import React, { useState } from "react";
import "./DashboardHR.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Switch } from "react-router";
import { Redirect } from "react-router-dom";


// import Role from "../Role.jsx";
import NavBar from "../NavBar.jsx";

//components hr
import HRHome from "./HRHome";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsersCog,
  faUsers,
  faChair,
  faBuilding,
  faDollarSign,
  faTasks
} from "@fortawesome/free-solid-svg-icons";
import LeaveApplicationHR from "./LeaveApplicationHR";

// function RoleAdminF() {
//   return <Role />;
// }

function DashboardAdmin(props) {
//   state = {
//     redirect: true,
//     checked: true 
//   };
  
    const [redirect, setRedirect] = useState(true)
    const [checked, setChecked] = useState(true)
    console.log("starting value",checked)
    
    const handleChange=(checked)=> {
    console.log("switch");
    console.log("Start:",checked)
    if(checked===true){
        console.log("if statement") 
      document.getElementById("sidebar").setAttribute("class", "display-block");
    }
    else{
        console.log("in else:",checked)
        document.getElementById("sidebar").setAttribute("class", "display-none");
    }   
    console.log("after else:",checked)
    setChecked(checked)
    console.log("End:",checked)
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
                <FontAwesomeIcon icon={faUsersCog} className="sidebar-icon" />
                HR
              </div>
              <ul className="navbar-ul">
                <li>
                  <Link to="/hr/home">
                    <FontAwesomeIcon icon={faUsers} className="sidebar-icon" /> 
                    Home 
                  </Link> 
                </li>
                <li>
                  <Link to="/hr/leave-application-hr">
                    <FontAwesomeIcon icon={faChair} className="sidebar-icon" /> 
                    Leave Application 
                  </Link> 
                </li>
                <li>
                  <Link to="/hr/holidays">
                    <FontAwesomeIcon
                      icon={faBuilding}
                      className="sidebar-icon"
                    /> 
                    Holidays 
                  </Link> 
                </li>
                <li>
                  <Link to="/hr/profile">
                    <FontAwesomeIcon
                      icon={faDollarSign}
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
                  <Route path="/hr/home" exact component={HRHome}/>
                  <Route path="/hr/leave-application-hr" exact component={LeaveApplicationHR}/>
                </Switch>
            </div>
          </div> 
        </div> 
      </Router>
    );
  
}

export default DashboardAdmin;
