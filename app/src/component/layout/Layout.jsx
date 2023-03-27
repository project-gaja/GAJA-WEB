import React from 'react'
import Footer from './Footer'
import Header from './Header'
import '../../styles/Layout.css'

const Layout = ({ children }) => {
  return (
    <div className='layout'>
      <Header />

      <main className='main'>
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default Layout