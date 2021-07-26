import React from 'react'
import "./Login.css";
import { ScaleLoader } from "react-spinners";
import { css } from "@emotion/core";
import pcs_logo from "../Images/pcs_logo.png"
import home_page from "../Images/home_page.svg"
import press_play from "../Images/press_play.svg"

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
// { backgroundImage:`url(${home_page})` }
function Login(props) {
  // const {loading,pass} = props 

  // console.log(loading)
  return (
    <>
      <div className="container">
        <div className="forms-container">
          <div className="signin-signup">
            <form className="sign-in-form" action="" method="" onSubmit={props.onSubmit} >
              <div id="logo-div">
                <img id="logo-img" src={pcs_logo} alt="LOGO" />
              </div>
              {/* <h2 className="title">Log In</h2> */}
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input className="login-form-input"
                  type="text"
                  placeholder="Email"
                  required="required"
                  name="Username"
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input className="login-form-input"
                  type="password"
                  placeholder="Password"
                  required="required"
                />
              </div>
              <a href="#">Forgot password?</a>
              <input className="login-form-input"
                className="button"
                type="submit"
                value="Sign in"
                id="signInBtn"
              />



              {/* {!this.props.pass ? (
                <p className="alert">Invalid UserName or Password</p>
              ) : (
                ""
              )} */}
            </form>
            <form className="sign-up-form" action="" method="" onSubmit={props.onSubmit} >
              <div id="logo-div">
                <img id="logo-img" src={pcs_logo} alt="LOGO" />
              </div>
              {/* <h2 className="title">Log In</h2> */}
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input className="login-form-input"
                  type="text"
                  placeholder="Email"
                  required="required"
                  name="Username"
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input className="login-form-input"
                  type="password"
                  placeholder="Password"
                  required="required"
                />
              </div>
              <input className="login-form-input"
                className="button"
                type="submit"
                value="Sign Up"
                id="signUpBtn"
              />



              {/* {!this.props.pass ? (
                <p className="alert">Invalid UserName or Password</p>
              ) : (
                ""
              )} */}
            </form>
          </div>
        </div>
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              {/* <h3>One of us??</h3> */}
              {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum culpa sint mollitia incidunt molestias expedita, tempore sequi doloremque deserunt temporibus, eius repellat optio, error esse fuga aut veniam illum aperiam.</p> */}
              {/* <button className="button transparent" id="sign-in-button">Sign Up</button> */}
            </div>
            <img src={home_page} className="image" alt="home bg" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us??</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum culpa sint mollitia incidunt molestias expedita, tempore sequi doloremque deserunt temporibus, eius repellat optio, error esse fuga aut veniam illum aperiam.</p>
              <button className="button transparent" id="sign-up  -button">Sign Up</button>
            </div>
            <img src={press_play } className="image" alt="home bg" />
          </div>
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







    </>
  )
}

export default Login
