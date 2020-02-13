import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { AppState } from '../../store/store'
import { Actions, receiveChatData, receiveChatError } from '../../store/actions'
import { Dispatch } from 'redux'
import ValueDisplayBox from './ValueDisplayBox'
import './DataDisplayContainer.css'
import DataTable from './DataTable'
import { clearCookies } from '../../api/localStorage'
import Tabs from './Tabs'
import DailyDataChart from './DailyDataChart'

interface Props {
  data: ChatData | Promise<ChatData> | null
  receiveData: (data: ChatData) => Actions
  receiveError: () => Actions
}

const DataDisplayContainer: React.FunctionComponent<Props> = ({data, receiveData, receiveError}) => {
  const [errorMessage, setErrorMessage] = useState('No data to show, please do a search')
  const [tab, setTab] = useState(0)

  // useEffect to resolve promises
  useEffect(() => {
    if (data instanceof Promise) {
      data
        .then((chatData: ChatData) => {
          receiveData(chatData)
        })
        .catch(() => {
          setErrorMessage('Unable to fetch data, please check your token')
          receiveError()
          clearCookies() // No need to store cookies for incorrect token
        })
    }
  }, [data, receiveData, receiveError])

  if (!data) {
    return <div className='Text'>{errorMessage}</div>
  }

  if (data instanceof Promise) {
    return <div className='Text'>loading...</div>
  }
  
  return (
    <div>
      <div className='DataDisplayContainer'>
        <ValueDisplayBox
          label='Total conversation count'
          value={data.totalConversationCount}
        />
        <ValueDisplayBox
          label='Total user message count'
          value={data.totalUserMessageCount}
        />
        <ValueDisplayBox
          label='Total visitor message count'
          value={data.totalVisitorMessageCount}
        />
      </div>
      <Tabs
        tabs={['Table', 'Chart']}
        current={tab}
        onChange={setTab}
      />
      {tab === 0 ? <DataTable data={data.byDate}/> : <DailyDataChart data={data.byDate}/>}
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({
  data: state.app.data
})

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => {
  return {
    receiveData: (data: ChatData) => dispatch(receiveChatData(data)),
    receiveError: () => dispatch(receiveChatError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataDisplayContainer)
