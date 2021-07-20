import React from 'react'
import "./Login.css";
import { ScaleLoader } from "react-spinners";
import { css } from "@emotion/core";
import pcs_logo from "../Images/pcs_logo.png"
import home_page from "../Images/home_page.svg"
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Login(props) {
    // const {loading,pass} = props 
    
    // console.log(loading)
    return (
        <div>
        <div className="container" styles={{ backgroundImage:`url(${home_page})` }}>
          {/* <img src={home_page} alt="bg"/> */}
          <div id="main-outer-div">
            <div id="logo-div">   
              <img id="logo-img" src={pcs_logo} alt="LOGO" />
            </div>
            <div id="title-div">
              <h4 className="title">Sign in</h4>
            </div>

            <div id="outer-login-form-div">
              <form action="" method="" >
                
                  <input className="login-form-input"
                    type="text"
                    placeholder="Email"
                    required="required"
                    name="Username"
                  />
                
                  <input className="login-form-input"
                    type="password"
                    placeholder="Password"
                    required="required"
                  />
                  <input className="login-form-input"
                    type="submit"
                    value="Sign in"
                    id="submitBtn"
                  />
                {/* {!this.props.pass ? (
                  <p className="alert">Invalid UserName or Password</p>
                ) : (
                  ""
                )} */}
              </form>
            </div>

            <div className="loading">
              <ScaleLoader
                css={override}
                sizeUnit={"px"}
                size={150}
                color={"#123abc"}
                loading={props.loading}
              />
            </div>
          </div>
        </div>
      </div>
    )
}

export default Login
