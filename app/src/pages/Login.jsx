import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Logo from '../asserts/images/logo.png';
import '../styles/button.css';
import styled from "styled-components";
import { useDispatch } from 'react-redux';

const Login = ({ setAuthenticate }) => {
  const [email, setEmail] = useState('');
  const [psword, setPsword] = useState('');
  const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  const passwordRegEx = /^[A-Za-z0-9]{8,20}$/
  const [emailMessage, setEmailMessage] = useState('');
  const [isEmail, setIsEmail] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState('')
  const [isPassword, setIsPassword] = useState(false);

  function handleUsernameChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPsword(event.target.value);
  }

  const handleLoginClick = () => {
    if (email.trim() === '') {
      setEmailMessage('이메일을 입력해주세요 ㅜ ㅜ')
      setIsEmail(false);
      return;
    }
    if (!emailCheck(email)) {
      setEmailMessage('이메일 형식이 틀렸어요! 다시 확인해주세요 ㅜ ㅜ')
      setIsEmail(false);
      return;
    }
    if (psword.trim() === '') {
      setPasswordMessage('비밀번호를 입력해주세요 ㅜ ㅜ')
      setIsPassword(false);
      return;
    }

    setAuthenticate(true);
    alert('TODO 로그인 성공');

  };

  const emailCheck = (email) => {

    return emailRegEx.test(email); //형식에 맞을 경우, true 리턴
  }

  const passwordCheck = (password) => {
    return passwordRegEx.test(password); //형식에 맞을 경우, true 리턴
  }

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

  return (
    <>
      <Container>
        <Row>
          <Card>
            <Card.Img variant="top" src={Logo} width={250} height={250} />
            <Card.Body>
              <Card.Text>
              </Card.Text>
            </Card.Body>
          </Card>
        </Row>
        <Row>
          <InputBox type="text" defaultValue={email} onBlur={handleUsernameChange} placeholder="이메일" />
          {<span className={`message ${isEmail ? 'success' : 'error'}`}>{emailMessage}</span>}
        </Row>
        <Row>
          <InputBox type="password" defaultValue={psword} onBlur={handlePasswordChange} placeholder="비밀번호" />
          {<span className={`message ${isPassword ? 'success' : 'error'}`}>{passwordMessage}</span>}
        </Row>
        <Row>
          <button className='login-button-version2' onClick={handleLoginClick}>로그인</button>
        </Row>
        <Row>
          <Link to="/join">가입하기</Link>
          <Link to="/pswordUpdate">비밀번호 재설정</Link>
        </Row>
      </Container>
    </>
  )
}

export default Login