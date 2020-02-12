import React from 'react'
import './App.css'
import Header from './Header'
import SearchForm from './SearchForm'
import DataDisplayContainer from './DataDisplayContainer'

const App: React.FunctionComponent = () => {
  return (
    <div>
      <Header/>
      <div className='AppBody'>
        <SearchForm/>
        <DataDisplayContainer/>
      </div>
    </div>
  )
}

export default App
