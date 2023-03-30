import React from "react";
import { Navigate, Route, Routes } from 'react-router';
import Login from './pages/Login';
import Home from './pages/Home';
import Join from './pages/Join';
import PswordUpdate from './pages/PswordUpdate';
import Mypage from './pages/MyPage';
import ScheduleCreation from './component/ScheduleCreation';

export default function App() {
  const userId = 'admin';
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/join' element={<Join />} />
        <Route path='/pswordUpdate' element={<PswordUpdate />} />
        <Route path='/mypage' element={<Mypage />} />
        <Route path='/ScheduleCreation' element={<ScheduleCreation />} />
      </Routes>
    </>
  );
}
