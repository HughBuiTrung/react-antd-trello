import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function AuthRoute({ children }) {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  console.log("accessToken: ", accessToken);
  // call api to check accessToken
  useEffect(() => {
    const checkAccessToken = async () => {
      const response = await fetch(
        " https://tony-auth-express-cmylpcdza-nhattruong1811-gmailcom.vercel.app/api/auth",
        {
          method: "POST",
          headers: {
            "x-auth-token": accessToken,
          },
        }
      );
      const data = await response.json();
      if (!data.isSuccess) {
        window.localStorage.removeItem("accessToken");
        navigate("/login");
        return;
      }
      navigate("/");
    };
    checkAccessToken();
  }, []);
  if (!accessToken) return <Navigate to="/login" />;

  return <>{children}</>;
}
