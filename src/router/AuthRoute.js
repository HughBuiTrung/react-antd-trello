import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function AuthRoute({ children }) {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  // call api to check access token
  React.useEffect(() => {
    const checkAccessToken = async () => {
      const response = await fetch(
        "https://tony-auth-express-cmylpcdza-nhattruong1811-gmailcom.vercel.app/api/auth",
        {
          method: "POST",
          headers: {
            'x-auth-token': accessToken,
          },
        }
      );

      const data = await response.json();
      if (!data.isSuccess) {
        window.localStorage.removeItem('accessToken');
        navigate('/login');
        return;
      }
       navigate('/');
    };

    checkAccessToken();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!accessToken) return <Navigate to="/login" />;

  return <>{children}</>;
}
