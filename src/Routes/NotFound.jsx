import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Kembali ke halaman sebelumnya
  };

  return (
    <>
      <h1>404 | Not Found</h1>
      <button data-testid="back" onClick={handleGoBack}>
        Back
      </button>
    </>
  );
};

export default NotFound;
