import React, { useRef, useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import styled from "styled-components";
import '../styles/button.css';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
import com from '../common/common';

let random = '';

const Join = () => {
  const InputBox = styled.input`
    width: 100%;
    height: 50px;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    background-color: #f8f8f8;
    font-size: 16px;
  `;

  const [loading, setLoading] = useState(false);
  const [sendCheck, setSendCheck] = useState(false);
  const [email, setEmail] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [isEmail, setIsEmail] = useState(false);


  // 이메일 인증코드 발송
  const sendEmail = async () => {
    if (!isEmail) return;

    random = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
    setLoading(true);

    const url = 'http://localhost:3001/send-email';
    const data = {
      email: { email },
      code: random
    }
    let result = await com.axiosReq(url, 'POST', data);
    console.log("result", JSON.stringify(result));

    setEmailMessage('');
    setSendCheck(true);
    setLoading(false);
    setEmail('');
  };

  // 인증코드 유효성체크
  const checkCode = async (e) => {
    const inputCode = document.getElementById('email').value;
    if (inputCode === random) {
      styleChange();
      setEmailMessage('인증성공!');
      return;
    }
    setEmailMessage('인증번호가 틀렸어요! 다시 확인해주세요 ㅜ ㅜ');
  };

  // 이메일 유효성체크
  const emailCheck = useCallback((e) => {
    const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    const emailCurrent = e.target.value;

    setEmail(emailCurrent);
    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage('이메일 형식이 틀렸어요! 다시 확인해주세요 ㅜ ㅜ')
      setIsEmail(false);
    } else {
      setEmailMessage('올바른 이메일 형식이에요 : )')
      setIsEmail(true);
    }
  }, [])

  const styleChange = () => {
    const container1 = document.querySelector(".container-1");
    const container2 = document.querySelector(".container-2");
    container1.style.display = 'none';
    container2.style.display = 'block';
  };

  return (
    <>
      <Container className='container-1'>
        <Row>
          <h3>회원가입</h3>
        </Row>
        < Row >
          <InputBox type="text" id='email' onBlur={(e) => emailCheck(e)} defaultValue={email} />
          {email.length > 0 && <span className={`message ${isEmail ? 'success' : 'error'}`}>{emailMessage}</span>}
        </Row>
        <Row>
          {loading ? <ClipLoader color='f88c6b' loading={loading} size={20} /> :
            sendCheck ? <button className='login-button-version2' onClick={(e) => checkCode(e)}>확인</button>
              : <button className='login-button-version2' onClick={(e) => sendEmail(e)}>이메일 인증하기</button>
          }
        </Row>
        <Row>
          <Link to="/join">{sendCheck ? '인증코드 재전송' : ''}</Link>
        </Row>
      </Container>
      <Container className='container-2' style={{ display: 'none' }}>
        <Row>
          <h3>회원가입</h3>
        </Row>
        < Row >
          <InputBox type="password" placeholder='비밀번호' />
        </Row>
        < Row >
          <InputBox type="password" placeholder='비밀번호 확인' />
        </Row>
        <Row>
          <button className='login-button-version2' onClick={(e) => checkCode(e)}>확인</button>
        </Row>
      </Container>
    </>
  )
}

export default Join