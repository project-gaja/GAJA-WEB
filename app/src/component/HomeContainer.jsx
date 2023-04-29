import React, { useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Logo from '../asserts/images/logo.png';
import '../styles/button.css';
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from 'axios';

const HomeContainer = () => {
  const googleClientId = '280223529402-gc6e5olm09vc1qs1jcnhs08qa7gkg5jr.apps.googleusercontent.com'
  const navigate = useNavigate();
  const goLoginPage = () => {
    navigate('/login');
  }
  const goNaverLogin = async () => {
    document.location.href = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + 'wR83WrPaWLvs2CKHC3Un' + '&redirect_uri=' + encodeURI('http://localhost:3001/naverlogin') + '&state=' + Math.random().toString(36).substr(3, 14);
  }
  const goKakaoLogin = async () => {
    document.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=fd105bdb5cdd612c620fde133e80b5d3&redirect_uri=${encodeURI('http://localhost:3001/kakaologin')}&response_type=code`
  }
  const googleLogin = useCallback((response) => {
    const userInfo = {
      profileImg: response.profileObj.imageUrl,
      email: response.profileObj.email,
      name: response.profileObj.name
    }
    //setUserInfo(userInfo);
    //setIsLogin(true);
  }, [])

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
          <button className='kakao-login-button' onClick={goKakaoLogin}>카카오톡</button>
        </Row>
        <GoogleOAuthProvider>
          <GoogleLogin
            clientId={googleClientId}
            buttonText="Login"
            onSuccess={googleLogin}
            onFailure={(res) => console.log(res)}
            cookiePolicy={'single_host_origin'} />
        </GoogleOAuthProvider>
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