import React from 'react'
import { Link } from 'react-router-dom';

const Login = () => {

  return (
    <>
      <h1>BOX</h1>
      <input placeholder='이메일' />
      <input placeholder='비밀번호' />
      <button>로그인</button>
      <Link to="/pswordUpdate">비밀번호 재설정</Link>
      <Link to="/join">가입하기</Link>
    </>
  )
}

export default Login