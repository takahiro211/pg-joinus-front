import React, { FC } from "react";
import "../App.css";
import { Navigate } from "react-router-dom";
import { GetAuthState } from "../utils/Util";

type Props = {
  children?: React.ReactNode;
};

const CheckGuest: FC<Props> = ({ children }) => {
  // ログイン状態をクッキーから取得
  return GetAuthState() ? (
    <>
      <Navigate to="/mypage" />
    </>
  ) : (
    <>{children}</>
  );
};

export default CheckGuest;
