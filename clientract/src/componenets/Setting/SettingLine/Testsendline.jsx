import React from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import apiService from "../../Shared/Apiserver";
import { useNavigate } from "react-router-dom";
import "./Testsendline.css";
const Testsendline = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Access query parameters
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code");
  const state = queryParams.get("state");

  // Access route parameters (if any)

  // Your component logic here
  const PostApi = async () => {
    try {
      const response = await apiService.createLine(code, state);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  React.useEffect(() => {
    PostApi();
  }, []);
  return (
    <div className="body">
      <div className="card">
        <div
          style={{
            borderRadius: "200px",
            height: "200px",
            width: "200px",
            background: "#F8FAF5",
            margin: "0 auto",
          }}
        >
          <i class="checkmark i">✓</i>
        </div>
        <h1 className="h1">Success</h1>
        <p className="p">
          We received your purchase request;
          <br /> we'll be in touch shortly!
        </p>
      </div>
    </div>
  );
};

export default Testsendline;
