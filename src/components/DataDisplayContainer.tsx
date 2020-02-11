import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { AppState } from '../store/store'
import { Actions, receiveChatData } from '../store/actions'
import { Dispatch } from 'redux'

interface Props {
  data: ChatData | Promise<ChatData>
  receiveData: (data: ChatData) => Actions
}

const DataDisplayContainer: React.FunctionComponent<Props> = ({data, receiveData}) => {

  // useEffect resolves promises after fetching data
  useEffect(() => {
    if (data instanceof Promise) {
      data.then((chatData: ChatData) => {
        receiveData(chatData)
      })
    }
  }, [data])

  if (data instanceof Promise) {
    return <div>loading...</div>
  }
  
  return (
    <div className='DataDisplayContainer'>
      {data.totalConversationCount}
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
