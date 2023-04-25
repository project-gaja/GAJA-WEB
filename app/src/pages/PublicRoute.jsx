import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

// 로그인 유저만 접근 가능
// 비로그인 유저 접근 불가
const PublicRoute = () => {
  //const auth = useContext(AuthContext);

  if (1 == 1) {
    alert("로그인이 필요한 기능입니다.");
  }

  return <Navigate to="/" />;
};

export default PublicRoute;