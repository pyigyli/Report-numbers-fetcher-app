import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { AppState } from '../store/store'
import { Actions, receiveChatData } from '../store/actions'
import { Dispatch } from 'redux'
import ValueDisplayBox from './ValueDisplayBox'
import './DataDisplayContainer.css'
import DataTable from './DataTable'

interface Props {
  data: ChatData | Promise<ChatData> | null
  receiveData: (data: ChatData) => Actions
}

const DataDisplayContainer: React.FunctionComponent<Props> = ({data, receiveData}) => {

  // useEffect to resolve promises as soon as they're done
  useEffect(() => {
    if (data instanceof Promise) {
      data.then((chatData: ChatData) => {
        receiveData(chatData)
      })
    }
  }, [data, receiveData])

  if (!data) {
    return <div className='Text'>No data to show, please do a search</div>
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
      <DataTable data={data.byDate}/>
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({
  data: state.app.data
})

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => {
  return {
    receiveData: (data: ChatData) => dispatch(receiveChatData(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataDisplayContainer)
