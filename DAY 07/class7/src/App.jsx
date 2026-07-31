import React, { useState } from 'react'

const App = () => {

   const [marks, setmarks] = useState([23,34,45,5,6,78,76])

   function graceStudent(){
    const newMarks = marks.map(function(elem){
     if(elem>50){
      return elem

     }else
      return elem +5
     
    })
    setmarks(newMarks)
   }
  return (
    <div>
      
      {marks.map(function(elem,idx){
        return <h4 key={idx} > Student {idx+1} = {elem} ({elem>33?'pass':'fail' }) </h4>
      })}
      <button onClick={graceStudent}> Give them Grace</button>



      <div>
         <input type="radio" name='gender' id='mail' />
     <label htmlFor="male"></label>
      </div>

       <input type="radio" name='gender' id='femail' />
      <label htmlFor="female">Female</label>


    </div>
  )
}

export default App
