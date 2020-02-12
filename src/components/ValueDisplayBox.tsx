import React from 'react'
import './ValueDisplayBox.css'

interface Props {
  label: string
  value: number
}

const ValueDisplayBox: React.FunctionComponent<Props> = ({label, value}) => {
  return (
    <div className='Container'>
      <div className='Value'>
        {value}
      </div>
      <div className='Label'>
        {label}
      </div>
    </div>
  )
}

export default ValueDisplayBox
