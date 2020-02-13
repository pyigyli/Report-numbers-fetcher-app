import React from 'react'
import './PageSelector.css'

interface Props {
  pageAmount: number
  currentPage: number
  onChangePage: (newPage: number) => void
}

const PageSelector: React.FunctionComponent<Props> = ({pageAmount, currentPage, onChangePage}) => {
  return (
    <div className='PageSelectorWrapper'>
      <button
        className='LeftButton'
        onClick={() => onChangePage(0)}
      >
        {'<<'}
      </button>
      {Array.from(Array(pageAmount).keys()).map((index: number) => (
        <button
          key={index}
          onClick={() => onChangePage(index)}
          style={{
            color: index === currentPage ? 'white' : '#3388ee',
            borderColor: index === currentPage ? '#3388ee' : '#bbbbbb',
            background: index === currentPage ? '#3388ee' : 'white'
          }}
        >
          {index + 1}
        </button>
      ))}
      <button
        className='RightButton'
        onClick={() => onChangePage(pageAmount - 1)}
      >
        {'>>'}
      </button>
    </div>
  )
}

export default PageSelector