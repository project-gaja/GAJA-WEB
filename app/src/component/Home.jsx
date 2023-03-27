import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const goLoginPage = () => {
    navigate('/login');
  }

  return (
    <>
      <h1>BOX</h1>
      <button>NAVER</button>
      <button>카카오톡</button>
      <button>Apple</button>
      <button onClick={goLoginPage}>로그인</button>
      <Link to="/join">가입하기</Link>
    </>
  )
}

export default Home