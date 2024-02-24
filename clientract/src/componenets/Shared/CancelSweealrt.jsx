// SweetAlert.js
import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CancelSweetAlert = ({ text, path }) => {
  useEffect(() => {
    if (text) {
      Swal.fire({
        icon: "error",
        title: "เกิดบางอย่างผิดพลาด",
        text,
        confirmButtonText: "OK",
      }).then((res) => {});
    }
  }, [text, path]);

  return null; // This component doesn't render anything, it just handles the SweetAlert logic.
};

export default CancelSweetAlert;
