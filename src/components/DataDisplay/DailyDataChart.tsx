import React from 'react'
import './DailyDataChart.css'
import { Chart } from 'react-charts'

interface Props {
  data: ChatByDateData[]
}
 
const DailyDataChart: React.FunctionComponent<Props> = ({data}) => {

  const chartData = React.useMemo(() => [
    {
      label: 'Conversation count',
      data: data.map((dateData: ChatByDateData) => [dateData.date, dateData.conversationCount])
    },
    {
      label: 'Missed chat count',
      data: data.map((dateData: ChatByDateData) => [dateData.date, dateData.missedChatCount])
    },
    {
      label: 'Visitors with conversation count',
      data: data.map((dateData: ChatByDateData) => [dateData.date, dateData.visitorsWithConversationCount])
    }
  ], [data])

  const series = React.useMemo(() => (
    {type: 'bar'}
  ), [])
 
  const axes = React.useMemo(() => [
    {primary: true, type: 'time', position: 'bottom', maxTickCount: data.length},
    {type: 'linear', position: 'left'}
  ], [])
 
  return (
    <div>
      <div className='ChartWrapper'>
        <div className='ChartContainer'>
          <Chart
            data={chartData}
            series={series}
            axes={axes}
          />
        </div>
      </div>
      <div className='ColorLabelsWrapper'>
        <div className='ColorLabelContainer'>
          <svg className='ColorLabelRect' style={{backgroundColor: 'rgb(74, 181, 235)'}}/>
          Conversation count
        </div>
        <div className='ColorLabelContainer'>
          <svg className='ColorLabelRect' style={{backgroundColor: 'rgb(252, 104, 104'}}/>
          Missed chat count
        </div>
        <div className='ColorLabelContainer'>
          <svg className='ColorLabelRect' style={{backgroundColor: 'rgb(222, 207, 63)'}}/>
          Visitors with conversation count
        </div>
      </div>
    </div>
  )
}

export default DailyDataChart