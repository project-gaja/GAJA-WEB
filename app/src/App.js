import React, { useEffect, useState } from "react";
import { Route, Routes } from 'react-router';
import Login from './pages/Login';
import Home from './pages/Home';
import Join from './pages/Join';
import PswordUpdate from './pages/PswordUpdate';
import Mypage from './pages/MyPage';
import ScheduleCreation from './pages/ScheduleCreation'; //일정등록 페이지 [순서1]
import Scheduling from './pages/Scheduling';             //일정작성 페이지 [순서2]
import { AuthContext } from "./context/auth-context";
import { useAuth } from "./hooks/auth-hook";
import PrivateRoute from "./pages/PrivateRoute";
import PublicRoute from "./pages/PublicRoute";
import Search from "./pages/Search";

/*
  1. 누구나 접근 가능
  루트 페이지

  2. 로그인한 유저만 접근 가능
  1,3 제외한 모든 페이지

  3. 로그인 하지 않은 유저만 접근 가능
  LoginPage : 로그인 페이지.
  JoinPage : 회원 가입 페이지.
*/
export default function App() {
  const [authenticate, setAuthenticate] = useState(false);

  useEffect(() => {
  }, [authenticate]) // authenticate 값이 바뀔때마다 확인
  return (
    <>
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login setAuthenticate={setAuthenticate} />} />
        <Route element={<PrivateRoute />}>
          <Route path='/join' element={<Join />} />
        </Route>
        <Route path='/pswordUpdate' element={<PswordUpdate />} />
        <Route path='/mypage' element={<Mypage />} />
        <Route path='/scheduleCreation' element={<ScheduleCreation />} />
        <Route path='/scheduling' element={<Scheduling />} />
        <Route path='/search' element={<Search />} />

      </Routes>
    </>
  );
}
