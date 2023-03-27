import React from 'react'
import '../../styles/Layout.css';

const Header = () => {
  return (
    <header className='header'>
      <div className='contents'>
        <div>
          로고 위치
        </div>
        <nav className='navigation'>
          <ul>
            <li>메뉴1</li>
            <li>메뉴2</li>
            <li>메뉴3</li>
          </ul>
        </nav>
      </div>
    </header >
  )
}

export default Header