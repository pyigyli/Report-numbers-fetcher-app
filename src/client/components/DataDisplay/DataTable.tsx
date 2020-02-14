import React, { useState } from 'react'
import './DataTable.css'
import PageSelector from './PageSelector'

interface Props {
  data: ChatByDateData[]
}

const DataTable: React.FunctionComponent<Props> = ({data}) => {
  const [page, setPage] = useState(0) // Zero-based index for pagination
  const resultsPerPage = 5

  data.sort((obj1: ChatByDateData, obj2: ChatByDateData) => 
    obj1.date.getTime() - obj2.date.getTime()
  )
  const dataForCurrentPage = data.slice(page * resultsPerPage, (page + 1) * resultsPerPage)

  return (
    <div>
      <div className='TableContainer'>
        <table>
          <thead>
            <tr>
              <th className='AlignLeft'>Conversation count</th>
              <th>Missed chat count</th>
              <th>Visitors with conversation count</th>
              <th className='AlignLeft'>Date</th>
            </tr>
          </thead>
          <tbody>
            {dataForCurrentPage.map((dataByDate: ChatByDateData) => (
              <tr key={dataByDate.date.toString()}>
                <td className='AlignLeft'>{dataByDate.conversationCount}</td>
                <td>{dataByDate.missedChatCount}</td>
                <td>{dataByDate.visitorsWithConversationCount}</td>
                <td className='DateWrapper'>
                  <p>{dataByDate.date.getDate() + dataByDate.date.toDateString().slice(3, 8)}</p>
                  <p className='YearLabel'>({dataByDate.date.getFullYear()})</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PageSelector
        pageAmount={Math.ceil(data.length / resultsPerPage)}
        currentPage={page}
        onChangePage={(newPage: number) => setPage(newPage)}
      />
    </div>
  )
}

export default DataTable
