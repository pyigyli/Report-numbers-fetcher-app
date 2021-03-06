import React, { useEffect, Dispatch } from 'react'
import './App.css'
import Header from './Header'
import SearchForm from './SearchForm'
import DataDisplayContainer from './DataDisplay/DataDisplayContainer'
import { Actions, fetchChatData } from '../store/actions'
import { connect } from 'react-redux'
import { getCookies } from '../api/localStorage'

interface Props {
  fetchData: (startDate: Date, endDate: Date, token: string) => void
}

const App: React.FunctionComponent<Props> = ({fetchData}) => {

  // Check for stored cookies when app opens
  useEffect(() => {
    const [startDate, endDate, token] = getCookies(
      'report-numbers-fetcher-startDate',
      'report-numbers-fetcher-endDate',
      'report-numbers-fetcher-token'
    )
    if (startDate && endDate && token) {
      fetchData(new Date(startDate), new Date(endDate), token)
    }
  }, [fetchData])

  return (
    <div>
      <Header/>
      <div className='AppBodyWrapper'>
        <div className='AppBody'>
          <SearchForm/>
          <DataDisplayContainer/>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => {
  return {
    fetchData: (startDate: Date, endDate: Date, token: string) => dispatch(fetchChatData({startDate, endDate, token}))
  }
}

export default connect(null, mapDispatchToProps)(App)
