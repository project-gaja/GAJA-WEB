import React, { useEffect, useState } from 'react'
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
  let sendCheck = false;

  const sendEmail = async () => {
    setLoading(true);
    const url = 'http://localhost:3001/send-email';
    const data = {
      email: { emailSent },
    }
    let result = await com.axiosReq(url, 'POST', data);
    console.log(JSON.stringify(result));
    sendCheck = true;
  };

  const handlerEmailSent = (event) => {
    setEmailSent(event.target.value);
  };

  return (
    <>
      <Container>
        <Row>
          <h3>회원가입</h3>
        </Row>
        < Row >
          <InputBox type="text" id="username" placeholder={emailSent ? "인증코드  00:41" : "이메일"} value={emailSent} onChange={handlerEmailSent} />
        </Row>
        <Row>
          {loading ? <ClipLoader color='f88c6b' loading={loading} size={20} /> :
            emailSent && sendCheck ? <button className='login-button-version2'>확인</button>
              : <button className='login-button-version2' onClick={() => sendEmail()}>이메일 인증하기</button>
          }
        </Row>
        <Row>
          <Link to="/join">{emailSent ? '인증코드 재전송' : ''}</Link>
        </Row>
      </Container>
    </>
  )
}

export default Join