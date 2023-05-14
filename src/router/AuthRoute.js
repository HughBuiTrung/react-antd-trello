import React from "react";
import { Navigate } from "react-router-dom";

export default function AuthRoute({ children }) {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) return <Navigate to="/login" />;

  return <>{children}</>;
}
