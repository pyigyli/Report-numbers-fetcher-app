import React from 'react'
import './App.css'
import Header from './Header'
import SearchForm from './SearchForm'
import DataDisplayContainer from './DataDisplayContainer'
import { AppState } from '../store/store'
import { connect } from 'react-redux'

interface Props {
  data: ChatData | Promise<ChatData>,
}

const App: React.FunctionComponent<Props> = () => {
  return (
    <div className='App'>
      <Header/>
      <SearchForm/>
      <DataDisplayContainer/>
    </div>
  )
}

export const mapStateToProps = (state: AppState) => {
  return {
    data: state.app.data
  }
}

export default connect(mapStateToProps)(App)
