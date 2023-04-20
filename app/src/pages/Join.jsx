import React, { useRef, useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import styled from "styled-components";
import '../styles/button.css';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
import com from '../common/common';

let g_random = '';

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

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState('')
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('')

  const [userName, setUserName] = useState('');
  const [nameMessage, setNameMessage] = useState('');
  const [isName, setIsName] = useState(false);

  // 이메일 인증코드 발송
  const sendEmail = async () => {
    if (!isEmail) return;

    g_random = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
    setLoading(true);

    const url = 'http://localhost:3001/send-email';
    const data = {
      email: { email },
      code: g_random
    }
    let result = await com.axiosReq(url, 'POST', data);
    console.log("result", JSON.stringify(result));

    setEmailMessage('');
    setSendCheck(true);
    setLoading(false);
    setEmail('');
  };

  // 회원가입
  const register = async () => {
    setLoading(true);

    const url = 'http://localhost:3001/register';
    const data = {
      email: document.getElementById('email').value,
      psword: document.getElementById('psword').value,
      userName: document.getElementById('userName').value,
    }
    let result = await com.axiosReq(url, 'POST', data);
    console.log("result", JSON.stringify(result));

    setLoading(false);
  };

  // 인증코드 유효성체크
  const checkCode = async (e) => {
    const inputCode = document.getElementById('email').value;
    if (inputCode === g_random) {
      setEmailMessage('인증성공!');
      styleChange('code');
      return;
    }
    setEmailMessage('인증번호가 틀렸어요! 다시 확인해주세요 ㅜ ㅜ');
  };

  // 비밀번호 유효성체크
  const checkPassword = async (e) => {
    // TO-DO 확인 버튼 클릭시 확인
    styleChange('password');
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

  // 비밀번호 유효성체크
  const passwordCheck = useCallback((e) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    const passwordCurrent = e.target.value
    setPassword(passwordCurrent)

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!')
      setIsPassword(false)
    } else {
      setPasswordMessage('안전한 비밀번호에요 : )')
      setIsPassword(true)
    }
  }, [])

  // 비밀번호 확인 유효성체크
  const passwordConfirmCheck = useCallback((e) => {
    const passwordConfirmCurrent = e.target.value;
    setPasswordConfirm(passwordConfirmCurrent);

    if (password === passwordConfirmCurrent) {
      setPasswordConfirmMessage('비밀번호를 똑같이 입력했어요 : )')
      setIsPasswordConfirm(true)
    } else {
      setPasswordConfirmMessage('비밀번호가 틀려요. 다시 확인해주세요 ㅜ ㅜ')
      setIsPasswordConfirm(false)
    }
  }, [password])

  // 유저명 유효성체크
  const userNameCheck = async (e) => {
    setUserName(e.target.value)
    if (e.target.value.length < 2 || e.target.value.length > 5) {
      setNameMessage('2글자 이상 5글자 미만으로 입력해주세요.')
      setIsName(false)
    } else {
      setNameMessage('올바른 이름 형식입니다 :)')
      setIsName(true)
    }
  };

  // container show hide function
  const styleChange = (param) => {
    const container1 = document.querySelector(".container-1");
    const container2 = document.querySelector(".container-2");
    const container3 = document.querySelector(".container-3");
    if (param === 'code') {
      container1.style.display = 'none';
      container2.style.display = 'block';
      return;
    }
    container2.style.display = 'none';
    container3.style.display = 'block';
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
          <InputBox type="password" id='psword' placeholder='비밀번호' onBlur={(e) => passwordCheck(e)} defaultValue={password} />
          {password.length > 0 && <span className={`message ${isPassword ? 'success' : 'error'}`}>{passwordMessage}</span>}
        </Row>
        < Row >
          <InputBox type="password" placeholder='비밀번호 확인' onBlur={(e) => passwordConfirmCheck(e)} defaultValue={passwordConfirm} />
          {passwordConfirm.length > 0 && <span className={`message ${isPasswordConfirm ? 'success' : 'error'}`}>{passwordConfirmMessage}</span>}
        </Row>
        <Row>
          <button className='login-button-version2' onClick={(e) => checkPassword(e)}>확인</button>
        </Row>
      </Container>
      <Container className='container-3' style={{ display: 'none' }}>
        <Row>
          <h3>회원가입</h3>
        </Row>
        < Row >
          <InputBox type="text" id='userName' placeholder='이름' onBlur={(e) => userNameCheck(e)} defaultValue={userName} />
          {userName.length > 0 && <span className={`message ${isName ? 'success' : 'error'}`}>{nameMessage}</span>}
        </Row>
        <Row>
          <button className='login-button-version2' onClick={(e) => register(e)}>가입하기</button>
        </Row>
      </Container>
    </>
  )
}

export default Join