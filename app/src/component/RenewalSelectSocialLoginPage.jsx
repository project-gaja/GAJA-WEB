import React from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import '../styles/button.css';

const RenewalSelectSocialLoginPage = () => {
  const googleSocialLogin = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
    flow: 'auth-code',
  })

  return (
    <>
      <button style={{ width: '100px', height: '100px' }} onClick={googleSocialLogin}>GOOGLE</button>
    </>
  )
}
export default RenewalSelectSocialLoginPage