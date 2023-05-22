import React from "react";
import { Navigate } from "react-router-dom";

export default function GuestRoute({ children }) {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) return <Navigate to="/" />;

  return <>{children}</>;
}
