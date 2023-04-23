import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Logo from '../asserts/images/logo.png';
import '../styles/button.css';
import com from '../common/common';

const HomeContainer = () => {
  const navigate = useNavigate();
  const goLoginPage = () => {
    navigate('/login');
  }
  const goNaverLogin = async () => {
    const url = 'http://localhost:3001/naverlogin';
    let result = await com.axiosReq(url, 'GET', '');
    console.log("result", JSON.stringify(result));
    if (result != null) {
      goNaverLoginCallback();
    }
  }
  const goNaverLoginCallback = async () => {
    const url = 'http://localhost:3001/callback';
    let result = await com.axiosReq(url, 'GET', '');
    console.log("result", JSON.stringify(result));
  }

  return (
    <div>
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
          <button className='naver-login-button' onClick={goNaverLogin}>NAVER</button>
        </Row>
        <Row>
          <button className='kakao-login-button'>카카오톡</button>
        </Row>
        <Row>
          <button className='apple-login-button'>Apple</button>
        </Row>
        <Row>
          <button className='login-button' onClick={goLoginPage}>로그인</button>
        </Row>
        <Row className='last-link'>
          <Link to="/join">가입하기</Link>
        </Row>
      </Container>
    </div>
  )
}

export default HomeContainer