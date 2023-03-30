import React from 'react'
import { Link } from 'react-router-dom';

const PswordUpdate = () => {
  return (
    <>
      <h1>비밀번호 재설정</h1>
      <p>가입한 이메일 주소를 입력해주세요.</p>
      <input placeholder='이메일' />
      <button>이메일 인증하기</button>
      <input placeholder='인증코드' />
      <button>확인</button>
      <Link>인증코드 재전송</Link>
      <input placeholder='비밀번호' />
      <input placeholder='비밀번호 확인' />
      <button>확인</button>
    </>
  )
}

export default PswordUpdate