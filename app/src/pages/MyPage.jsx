import React, { useState } from 'react'
import '../styles/Mypage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faHouse, faMagnifyingGlass, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons'

const MyPage = (userInfo) => {
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
          <span className='user-name'>라부장</span>
          <FontAwesomeIcon icon={faUser} />
          <span className='update-button'>수정</span>
        </div>
        <div>
          <ul>
            <li>일정<span>11</span></li>
            <li>구독<span>150</span></li>
            <li>포인트<span>300</span></li>
          </ul>
        </div>
      </section>
      <section className='actions'>
        <div className='plan'>
          <div className='my-plan'>내일정</div>
          <div className='your-plan'>가져온 일정</div>
        </div>
        <div className='plan-list'>
          <div className='plan-list1'>
            <img src="https://www.kagoshima-kankou.com/storage/tourism_themes/12/responsive_images/ElwnvZ2u5uZda7Pjcwlk4mMtr08kLNydT8zXA6Ie__1673_1115.jpeg" />
          </div>
          <div className='plan-list2'>
            <img src="https://www.kagoshima-kankou.com/storage/tourism_themes/12/responsive_images/ElwnvZ2u5uZda7Pjcwlk4mMtr08kLNydT8zXA6Ie__1673_1115.jpeg" />
          </div>
          <div className='plan-list3'>
            <img src="https://www.kagoshima-kankou.com/storage/tourism_themes/12/responsive_images/ElwnvZ2u5uZda7Pjcwlk4mMtr08kLNydT8zXA6Ie__1673_1115.jpeg" />
          </div>
        </div>
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