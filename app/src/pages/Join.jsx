import React, { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import styled from "styled-components";
import '../styles/button.css';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
import com from '../common/common';

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

  const [emailSent, setEmailSent] = useState('');
  const [loading, setLoading] = useState(false);
  const [sendCheck, setSendCheck] = useState(false);
  const [random, setRandom] = useState("000000");
  const [email, setEmail] = useState('');

  const [emailMessage, setEmailMessage] = useState('');

  const [isEmail, setIsEmail] = useState(false);

  const sendEmail = async () => {
    setLoading(true);
    const url = 'http://localhost:3001/send-email';
    const data = {
      email: { emailSent },
    }
    let result = await com.axiosReq(url, 'POST', data);
    console.log(JSON.stringify(result));
    setSendCheck(true);
    setLoading(false);
    setRandom(String(Math.floor(Math.random() * 1000000)).padStart(6, "0"));
    console.log(random, 'random');
  };

  // 이메일
  const onChangeEmail = useCallback((e) => {
    console.log(e.target.value);
    console.log(e.target);
    const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage('이메일 형식이 틀렸어요! 다시 확인해주세요 ㅜ ㅜ')
      setIsEmail(false)
    } else {
      setEmailMessage('올바른 이메일 형식이에요 : )')
      setIsEmail(true)
    }
  }, [])

  return (
    <>
      <Container>
        <Row>
          <h3>회원가입</h3>
        </Row>
        < Row >
          <InputBox type="text" onChange={onChangeEmail} value={email} />
          {email.length > 0 && <span className={`message ${isEmail ? 'success' : 'error'}`}>{emailMessage}</span>}
        </Row>
        <Row>
          {loading ? <ClipLoader color='f88c6b' loading={loading} size={20} /> :
            emailSent && sendCheck ? <button className='login-button-version2'>확인</button>
              : <button className='login-button-version2' onClick={() => sendEmail()}>이메일 인증하기</button>
          }
        </Row>
        <Row>
          <Link to="/join">{emailSent && sendCheck ? '인증코드 재전송' : ''}</Link>
        </Row>
      </Container>
    </>
  )
}

export default Join