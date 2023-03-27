import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Join = () => {
  return (
    <>
      <h1>회원가입</h1>
      <input placeholder='이메일' />
      <button>이메일 인증하기</button>
      <input placeholder='인증코드' />
      <button>확인</button>
      <Link>인증코드 재전송</Link>
      <input placeholder='비밀번호' />
      <input placeholder='비밀번호 확인' />
      <button>확인</button>
      <input placeholder='이름' />
      <button>가입하기</button>
    </>
  )
}

export default Join