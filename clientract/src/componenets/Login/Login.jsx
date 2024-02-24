import React from "react";
import "./Login.scss";
import apiService from "../Shared/Apiserver";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, useParams } from "react-router-dom";
const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const postData = async () => {
    try {
      const reponse = await apiService.login(username, password);

      if (reponse.status == 200) {
        localStorage.setItem("token", reponse.token);
        navigate("/");
      } else {
        setOpen(true);
      }
    } catch (error) {
      console.log({ data: error.message });
    }
  };
  const [open, setOpen] = React.useState(false);
  const [isRightPanelActive, setIsRightPanelActive] = React.useState(false);

  const handleSignUpButtonClick = () => {
    navigate("/createusers");
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        ยืนยัน
      </Button>
      <IconButton
        size="large"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <div className="body">
      <div class="login-wrap">
        <div class="container2" id="container">
          <Snackbar
            open={open}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Username หรือ Password ผิดพลาด"
            action={action}
          />
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
              <h1>Sign in</h1>

              <span>or use your account</span>
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Email"
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
                <p>Enter you Username and Password To Continue</p>
                <button
                  onClick={handleSignUpButtonClick}
                  class="ghost"
                  id="signUp"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
