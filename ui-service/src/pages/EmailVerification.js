// src/pages/EmailVerification.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

const EmailVerification = () => {
  const { uid, token } = useParams(); // Extract UID and token from URL
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`/auth/verify/${uid}/${token}/`);
        if (response.status === 200) {
          setStatus("success");
        }
      } catch (error) {
        setStatus("error");
      }
    };

    verifyEmail();
  }, [uid, token]);

  return (
    <div className="verification-container">
      {status === "loading" && <p>Verifying your email...</p>}
      {status === "success" && (
        <p>Your email has been successfully verified! You can now log in.</p>
      )}
      {status === "error" && <p>Invalid or expired verification link.</p>}
    </div>
  );
};

export default EmailVerification;
