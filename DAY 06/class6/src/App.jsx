import React from 'react'
import Navbar from './components/Navbar.jsx'
import Men from './components/Men.jsx'
import Women from './components/Women.jsx'

const App = () => {

  const user1={
    name:'Sarthak',
    age:"30",
    gender:"male"
  }

  const user2={
    name:'reena',
    age:"23",
    gender:'female'
  }




  return (
    <div>
      <Navbar tittle='Sheriyans' color='pink' links={['Course','BootCamp','ClassRoom','Profile']} />
   <Navbar tittle='Apple' color='black' links={['IPhone','Mac','Profile']} />
    


    {user1.gender=='male'? <Men /> : <Women />}
    {user2.gender=="male"? <Men /> : <Women />}
  
    </div>
  )
}

export default App
