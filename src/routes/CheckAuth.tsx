import React, { FC } from "react";
import "../App.css";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

type Props = {
  children?: React.ReactNode;
};

const CheckAuth: FC<Props> = ({ children }) => {
  // ログイン状態をクッキーから取得
  const [cookies] = useCookies(["XSRF-TOKEN"]);
  console.log("これはリターンの直前", cookies["XSRF-TOKEN"]);
  return cookies["XSRF-TOKEN"] ? (
    <>{children}</>
  ) : (
    <>
      <Navigate to="/sign-in" />
    </>
  );
};

export default CheckAuth;
