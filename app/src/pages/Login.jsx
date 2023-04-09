import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Logo from '../asserts/images/logo.png';
import '../styles/button.css';
import styled from "styled-components";
import { useDispatch } from 'react-redux';

const Login = () => {
  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  const passwordRegEx = /^[A-Za-z0-9]{8,20}$/
  //const dispatch = useDispatch(); // dispatch로 재선언하여 사용한다.

  const login = () => {
    //입력 값 정합성 체크 후 login API 요청
    if (id === "" || pwd === "") {
      window.alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }
    if (!emailCheck(id)) {
      window.alert("이메일 형식이 맞지 않습니다.");
      return;
    }
    if (!passwordCheck(pwd)) {
      window.alert("비밀번호 형식을 확인해주세요.");
    }
    //dispatch(users.loginDB(id, pwd));
  };

  const emailCheck = (username) => {
    return emailRegEx.test(username); //형식에 맞을 경우, true 리턴
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

  const navigate = useNavigate();

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
          <InputBox type="text" id="username" _onChange={(e) => {
            setId(e.target.value);
          }} placeholder="이메일" />
        </Row>
        <Row>
          <InputBox type="password" id="password" _onChange={(e) => {
            setPwd(e.target.value);
          }} placeholder="비밀번호" />
        </Row>
        <Row>
          <button className='login-button-version2'>로그인</button>
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