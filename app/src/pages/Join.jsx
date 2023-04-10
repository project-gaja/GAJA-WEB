import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import styled from "styled-components";
import '../styles/button.css';
import axios from 'axios';

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

  const [emailSent, setEmailSent] = useState(false);
  const sendEmail = () => {
    axios.post('http://localhost:3001/send-email')
      .then(response => {
        console.log(response.data);
        setEmailSent(true);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <Container>
        <Row>
          <h3>회원가입</h3>
        </Row>
        <Row>
          <InputBox type="text" id="username" placeholder="이메일" />
        </Row>
        <Row>
          {emailSent ? <p>Email sent successfully!</p> : <button className='login-button-version2' onClick={sendEmail}>이메일 인증하기</button>}
        </Row>
      </Container>
    </>
  )
}

export default Join