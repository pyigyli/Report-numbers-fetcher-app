import React from 'react'
import './Tabs.css'

interface Props {
  tabs: string[]
  current: number
  onChange: (newTab: number) => void
}

const Tabs: React.FunctionComponent<Props> = ({tabs, current, onChange}) => {
  return (
    <div className='Tabs'>
      <div className='TabsUnderline'/>
      {tabs.map((label: string, index: number) => (
        <div
          key={label}
          className={index === current ? 'OpenTab' : 'ClosedTab'}
          onClick={() => onChange(index)}
        >
          {label}
        </div>
      ))}
      <div className='TabsUnderline'/>
    </div>
  )
}

export default Tabs
