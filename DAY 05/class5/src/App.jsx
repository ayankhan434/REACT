import React from 'react'
import Card from './components/Card.jsx'
import Button from './components/Button.jsx'

const App = () => {
  return (
    <div className='p-3 h-screen bg-black'>
      <Card user='sarthak' age={34} />
      <Card user='ayan' age={22} />
      <Button text='download' />
      <Button text="explore now"/>
    </div>
    
      

    
  )
}

export default App
