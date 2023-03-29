import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const HomeContainer = () => {
  const navigate = useNavigate();
  const goLoginPage = () => {
    navigate('/login');
  }

  return (
    <div>
      <div className='box'></div>
      <button>NAVER</button>
      <button>카카오톡</button>
      <button>Apple</button>
      <button onClick={goLoginPage}>로그인</button>
      <Link to="/join">가입하기</Link>
    </div>
  )
}

export default HomeContainer