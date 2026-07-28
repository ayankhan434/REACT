import React from 'react'

const Card = (props) => {
console.log(props)
    const arr =[12,23,34,4,5]
  return (
   

    <div className='bg-white border-3 text-5xl p-5 gap-3 m-3 rounded-2xl border-red-300 w-fit' >
      {props.user}
    </div>
  )
}

export default Card
