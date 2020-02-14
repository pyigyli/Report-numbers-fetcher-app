import React from 'react'
import './Header.css'

const Header: React.FunctionComponent = () => {

  const clearCookies = () => {
    localStorage.clear()
  }

  return (
    <div className='Header'>
      Awesome react app
      <button onClick={clearCookies}>
        Clear cookies
      </button>
    </div>
  )
}

export default Header
