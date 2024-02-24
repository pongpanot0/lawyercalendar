import React from "react";
import "./CreateSendUser.scss";
import apiService from "../../Shared/Apiserver";
import SweetAlert from "../../Shared/SweetAlrt";
const CreateSendUser = () => {
  const [employee_firstname, setemployee_firstname] = React.useState("");
  const [employee_lastname, setemployee_lastname] = React.useState("");
  const [employee_phone, setemployee_phone] = React.useState("");
  const [employee_email, setemployee_email] = React.useState("");

  const postData = async () => {
    try {
      const data = {
        employee_firstname: employee_firstname,
        employee_lastname: employee_lastname,
        employee_role: 1,
        employee_phone: employee_phone,
        employee_email: employee_email,
      };
      const response = await apiService.createEmployee(data);
      setShowSweetAlert(true);
    } catch (error) {
      console.log(error.message);
    }
  };
  const [showSweetAlert, setShowSweetAlert] = React.useState(false);
  return (
    <div className="body">
      <div class="login-wrap">
        {showSweetAlert && (
          <SweetAlert
            text="ระบบได้ทำการส่งอีเมลไปให้คุณ เพื่อสร้าง Username และ Password"
            path="/login"
          />
        )}
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
              <h1>Create Account</h1>
              <input
                type="text"
                onChange={(e) => setemployee_firstname(e.target.value)}
                placeholder="ชื่อจริง"
              />
              <input
                type="text"
                onChange={(e) => setemployee_lastname(e.target.value)}
                placeholder="นามสกุล"
              />
              <input
                type="text"
                onChange={(e) => setemployee_email(e.target.value)}
                placeholder="อีเมล์"
              />
              <input
                type="text"
                onChange={(e) => setemployee_phone(e.target.value)}
                placeholder="เบอร์โทรศัพท์"
              />
              <button onClick={(e) => postData()}>Sign In</button>
            </div>
          </div>
          <div class="overlay-container">
            <div class="overlay">
              <div class="overlay-panel overlay-left">
                <h1>Welcome</h1>
                <p>Fill in your information to register Create User</p>
                <button class="ghost" id="signIn">
                  Sign In
                </button>
              </div>
              <div class="overlay-panel overlay-right">
                <h1>Welcome</h1>
                <p>Fill in your information to register Create User</p>
                {/*     <button class="ghost" id="signUp">
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

export default CreateSendUser;
