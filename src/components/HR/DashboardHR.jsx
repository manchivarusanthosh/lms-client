import React, { useState } from "react";
import "./DashboardHR.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Switch } from "react-router";
import { Redirect } from "react-router-dom";


// import Role from "../Role.jsx";
import NavBar from "../NavBar.jsx";

//components hr
import HRHome from "./HRHome";
import Holidays from "../Holidays/Holidays";




import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faUser,
  faHome,
  faPenFancy,
  faUmbrellaBeach,
} from "@fortawesome/free-solid-svg-icons";


import LeaveApplicationHR from "./LeaveApplicationHR";
import Profile from "../Profile/Profile";
import EmployeesListTable from "./EmployeesListTable";

function DashboardAdmin(props) {
  //   state = {
  //     redirect: true,  
  //     checked: true 
  //   };

  const [redirect, setRedirect] = useState(true)
  const [checked, setChecked] = useState(true)
  console.log("starting value", checked)

  const handleChange = (checked) => {
    console.log("switch");
    console.log("Start:", checked)
    if (checked === true) {
      console.log("if statement")
      document.getElementById("sidebar").setAttribute("class", "display-block");
    }
    else {
      console.log("in else:", checked)
      document.getElementById("sidebar").setAttribute("class", "display-none");
    }
    console.log("after else:", checked)
    setChecked(checked)
    console.log("End:", checked)
  }


  return (
    <Router>
      <div id="outer-main-div">
        <div id="outer-nav">
          <NavBar loginInfo={props.data} checked={checked} handleChange={handleChange} onlogout={props.onlogout} />
        </div>

        <div id="main-non-nav">
          <div id="sidebar">
            <div id="sidebar-top-content" />
            {/* <div id="main-title">
                <FontAwesomeIcon icon={faUsersCog} className="sidebar-icon" />
                HR
              </div> */}
            <ul className="navbar-ul">

              <li>
                <Link to="/hr/home">
                  <FontAwesomeIcon icon={faHome} className="sidebar-icon" />
                  Home
                </Link>
              </li>

              <li>
                <Link to="/hr/leave-application-hr">
                  <FontAwesomeIcon icon={faPenFancy} className="sidebar-icon" />
                  Leaves
                </Link>
              </li>

              <li>
                <Link to="/hr/holidays">
                  <FontAwesomeIcon
                    icon={faUmbrellaBeach}
                    className="sidebar-icon"
                  />
                  Holidays
                </Link>
              </li>

              <li>
                <Link to="/hr/all-emp-details">
                  <FontAwesomeIcon
                    icon={faUsers}
                    className="sidebar-icon"
                  />
                  Employees
                </Link>
              </li>

              <li>
                {/* HR is treated as EMPLOYEE so the ROUTE will be employee/:id/profile */}
                <Link to={"/employee/" + props.data["_id"] + "/profile"}>
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

              {/* HR Home Route */}
              <Route exact path="/hr" component={HRHome}/>
              
              <Route  path="/hr/home" component={HRHome} />

              {/* HR Leave Application */}
              <Route path="/hr/leave-application-hr" exact component={LeaveApplicationHR} />

              {/* Holidays Route */}
              <Route path="/hr/holidays" component={Holidays} />

              {/* Profile Route */}
              <Route exact path="/employee/:id/profile"
                render={() =>
                  <Profile data={props.data} back={false} />
                } />

                {/* Employees Route */}
              <Route Path="hr/all-emp-details" exact component={EmployeesListTable} />

              
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );

}

export default DashboardAdmin;
