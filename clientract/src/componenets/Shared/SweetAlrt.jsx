// SweetAlert.js
import React, { useEffect } from 'react';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

const SweetAlert = ({ text, path }) => {
  const history = useNavigate();

  useEffect(() => {
    if (text && path) {
        
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text,
        confirmButtonText: 'OK',
      }).then((res) => {
        console.log(res.isConfirmed);
        if(res.isConfirmed == true){
            history(path);
        }
     
      });
    }
  }, [text, path, history]);

  return null; // This component doesn't render anything, it just handles the SweetAlert logic.
};

export default SweetAlert;
