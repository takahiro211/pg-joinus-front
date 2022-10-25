import React, { FC } from "react";
import "../App.css";
import { Navigate } from "react-router-dom";
import { GetAuthState } from "../utils/Util";

type Props = {
  children?: React.ReactNode;
};

const CheckAuth: FC<Props> = ({ children }) => {
  // ログイン状態をクッキーから取得
  console.log("これはリターンの直前", GetAuthState());
  return GetAuthState() ? (
    <>{children}</>
  ) : (
    <>
      <Navigate to="/sign-in" />
    </>
  );
};

export default CheckAuth;
