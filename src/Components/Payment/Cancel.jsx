import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Cancel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.error("Payment Failed ");
    const timer = setTimeout(() => {
      navigate("/"); // redirect to home after 3 seconds
    }, 1500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
      }}
    >
      <h1>Payment Failed!</h1>
      <p>Redirecting to Home page...</p>
    </div>
  );
};

export default Cancel;

