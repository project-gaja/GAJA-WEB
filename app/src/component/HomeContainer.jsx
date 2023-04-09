import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Logo from '../asserts/images/logo.png';
import '../styles/button.css';

const HomeContainer = () => {
  const navigate = useNavigate();
  const goLoginPage = () => {
    navigate('/login');
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
          <button className='naver-login-button'>NAVER</button>
        </Row>
        <Row>
          <button className='kakao-login-button'>카카오톡</button>
        </Row>
        <Row>
          <button className='apple-login-button'>Apple</button>
        </Row>
        <Row>
          <button className='login-button'>로그인</button>
        </Row>
        <Row className='last-link'>
          <Link to="/join">가입하기</Link>
        </Row>
      </Container>
    </div>
  )
}

export default HomeContainer