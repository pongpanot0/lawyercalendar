import React from "react";
import "./Signin.scss";
import apiService from "../Shared/Apiserver";

import { useNavigate, useParams } from "react-router-dom";
const Sign = () => {
  const { id } = useParams();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const postData = async () => {
    try {
      const reponse = await apiService.signin(username, password, id);
      if (reponse.status == 200) {
        localStorage.setItem("token", reponse.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="body">
      <div class="login-wrap">
        <div class="container2" id="container">
          <div class="form-container sign-up-container">
            <form action="#">
              <h1>Create Account</h1>
              <div class="social-container">
                <a href="#" class="social">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#" class="social">
                  <i class="fab fa-google-plus-g"></i>
                </a>
                <a href="#" class="social">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </div>
              <span>or use your email for registration</span>
              <input type="text" placeholder="Name" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button>Sign Up</button>
            </form>
          </div>
          <div class="form-container sign-in-container">
            <div className="form">
              <h1>Register</h1>
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
              />
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />

              <button onClick={(e) => postData()}>Sign In</button>
            </div>
          </div>
          <div class="overlay-container">
            <div class="overlay">
              <div class="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button class="ghost" id="signIn">
                  Sign In
                </button>
              </div>
              <div class="overlay-panel overlay-right">
                <h1>Hello!</h1>
                <p>Enter your personal details and start journey with us</p>
                {/*   <button class="ghost" id="signUp">
                  Sign Up
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sign;
