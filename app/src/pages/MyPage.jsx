import React from 'react'
import '../styles/Mypage.css'
import Layout from '../component/layout/Layout';

const MyPage = () => {
  return (
    <Layout>
      <header>
        마이페이지
      </header>
      <div>
        <img src="" />
      </div>
      <div>
        <span>라부장</span>
        <i></i>
        <span>수정</span>
      </div>
      <div>
        <ul>
          <li>일정</li>
          <li>구독</li>
          <li>포인트</li>
        </ul>
        <ul>
          <li>11</li>
          <li>15</li>
          <li>300</li>
        </ul>
      </div>
      <div>
        <div>내일정</div>
        <div>가져온 일정</div>
      </div>
      <div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <footer>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </footer>
    </Layout>
  )
}

export default MyPage