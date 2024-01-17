import React from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
const Testsendline = () => {
  const location = useLocation();
  const params = useParams();

  // Access query parameters
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code");
  const state = queryParams.get("state");

  // Access route parameters (if any)
  const { someParam } = params;
  let data;
  // Your component logic here
  const PostApi = async () => {
    const response = await axios.post("http://localhost:3123/line/create", {
      code,
      state,
    });
    
  };
  return (
    <div>
      {/* Render your component content */}
      <p>Code: {code}</p>
      <p>State: {state}</p>
      <p>Route Param: {someParam}</p>
      <Button onClick={(e) => PostApi()}> testapi</Button>
    </div>
  );
};

export default Testsendline;
