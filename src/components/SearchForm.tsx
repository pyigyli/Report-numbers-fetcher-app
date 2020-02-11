import React, { useState } from 'react'
import { Dispatch } from 'redux'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './SearchForm.css'
import { Actions, fetchChatData } from '../store/actions'
import { connect } from 'react-redux'

interface Props {
  fetchData: (startDate: Date, endDate: Date, token: string) => Actions
}

const SearchForm: React.FunctionComponent<Props> = ({fetchData}) => {
  const [startDate, setStartDate] = useState(new Date('2017-05-01'))
  const [endDate, setEndDate] = useState(new Date('2017-06-15'))
  const [token, setToken] = useState('')

  const submitFetch = async (e: any) => {
    e.preventDefault()
    fetchData(startDate, endDate, token)
  }

  return (
    <form
      className='SearchForm'
      onSubmit={submitFetch}
    >
      <DatePicker
        className='DatePicker'
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        minDate={new Date('2017-05-01')} // Limit range to available demo data
        maxDate={endDate}
      />
      <DatePicker
        className='DatePicker'
        selected={endDate}
        onChange={(date: Date) => setEndDate(date)}
        minDate={startDate}
        maxDate={new Date('2017-06-15')} // Limit range to available demo data
      />
      <input
        type='text'
        value={token}
        onChange={({target}) => setToken(target.value)}
        placeholder='access token'
      />
      <input
        type='submit'
        value='Search'
      />
    </form>
  )
}

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => {
  return {
    fetchData: (startDate: Date, endDate: Date, token: string) => dispatch(fetchChatData({startDate, endDate, token}))
  }
}

export default connect(null, mapDispatchToProps)(SearchForm)
