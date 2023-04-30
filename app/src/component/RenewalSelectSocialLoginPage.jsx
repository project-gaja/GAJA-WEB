import React from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import '../styles/button.css';

const RenewalSelectSocialLoginPage = () => {
  debugger;
  const googleSocialLogin = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
    flow: 'auth-code',
  })

  return (
    <>
      <button className='google-login-button' onClick={googleSocialLogin}>GOOGLE</button>
    </>
  )
}
export default RenewalSelectSocialLoginPage