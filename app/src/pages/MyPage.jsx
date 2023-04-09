import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faHouse, faMagnifyingGlass, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons'
import PlanCard from '../component/PlanCard'

const MyPage = (userId) => {
  const [userInfo, setUserInfo] = useState(null);
  const [planInfo, setPlanInfo] = useState([]);

  const getUserInfo = async () => {
    /*
    let url = `http://localhost:3001/mypage`;
    const response = await fetch(url);
    let data = await response.json();
    */
    let userInfo = {
      'userName': '라부장',
      'planCnt': '10',
      'subscribeCnt': '153',
      'point': 300,
    }
    setUserInfo(userInfo);
  }
  const getPlanInfo = async () => {
    let planInfo = [
      {
        'planSeq': '1',
        'planName': '제주도',
        'planImgInfo': 'https://youimg1.tripcdn.com/target/100a0e0000006zype378A_C_640_320_R5_Q70.jpg_.webp?proc=source%2Ftrip153',
      },
      {
        'planSeq': '2',
        'planName': '부산',
        'planImgInfo': 'https://a.cdn-hotels.com/gdcs/production127/d256/7199707a-c1e3-4993-a4e7-e3f10af6ab63.jpg',
      },
      {
        'planSeq': '3',
        'planName': '일본',
        'planImgInfo': 'https://a.cdn-hotels.com/gdcs/production183/d421/262e6436-4f75-4679-9c67-0d42b3821489.jpg',
      },
    ]
    setPlanInfo(planInfo);
  };

  useEffect(() => {
    getUserInfo();
    getPlanInfo();
  }, '')

  return (
    <div>
      <header>
        <div className='title'>
          <span>마이페이지</span>
        </div>
        <div className='icons'>
          <FontAwesomeIcon icon={faUser} size="2x" />
        </div>
      </header>

      <section className='info'>
        <div className='metadata'>
          <span className='user-name'>{userInfo?.userName}</span>
          <FontAwesomeIcon icon={faUser} />
          <span className='update-button'>수정</span>
        </div>
        <div>
          <ul>
            <li>일정<span>{userInfo?.planCnt}</span></li>
            <li>구독<span>{userInfo?.subscribeCnt}</span></li>
            <li>포인트<span>{userInfo?.point}</span></li>
          </ul>
        </div>
      </section>
      <section className='actions'>
        <div className='plan'>
          <div className='my-plan'>내일정</div>
          <div className='your-plan'>가져온 일정</div>
        </div>
        <PlanCard data={planInfo} />
      </section>

      <footer className='footer-bar'>
        <FontAwesomeIcon icon={faHouse} size="2x" />
        <FontAwesomeIcon icon={faMagnifyingGlass} size="2x" />
        <FontAwesomeIcon icon={faPlus} size="2x" />
        <FontAwesomeIcon icon={faCheck} size="2x" />
        <FontAwesomeIcon icon={faUser} size="2x" />
      </footer>
    </div>
  )
}

export default MyPage