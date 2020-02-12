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
    localStorage.setItem('report-numbers-fetcher-startDate', startDate.toString())
    localStorage.setItem('report-numbers-fetcher-endDate', endDate.toString())
    localStorage.setItem('report-numbers-fetcher-token', token)
  }

  return (
    <form
      className='SearchForm'
      onSubmit={submitFetch}
    >
      <div className='DateInputsWrapper'>
        <div className='DateInputContainer'>
          <div className='DateLabel'>Start date</div>
          <DatePicker
            className='DateInput'
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            minDate={new Date('2017-05-01')} // Limit range to available demo data
            maxDate={endDate}
          />
        </div>
        <div className='DateInputContainer'>
          <div className='DateLabel'>End date</div>
          <DatePicker
            className='DateInput'
            selected={endDate}
            onChange={(date: Date) => setEndDate(date)}
            minDate={startDate}
            maxDate={new Date('2017-06-15')} // Limit range to available demo data
          />
        </div>
      </div>
      <div className='TokenSubmitWrapper'>
        <input
          className='SubmitButton'
          type='submit'
          value='Search'
        />
        <input
          className='TokenInput'
          type='text'
          value={token}
          onChange={({target}) => setToken(target.value)}
          placeholder='access token'
        />
      </div>
    </form>
  )
}

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => {
  return {
    fetchData: (startDate: Date, endDate: Date, token: string) => dispatch(fetchChatData({startDate, endDate, token}))
  }
}

export default connect(null, mapDispatchToProps)(SearchForm)
