import React from 'react'
import './Header.css'
import { clearCookies } from '../api/localStorage'

const Header: React.FunctionComponent = () => {

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
