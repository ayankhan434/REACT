import React from 'react'

const Button = (props) => {
  return (
    <div className='w-fit p-5 text-lg font-bold bg-emerald-400 rounded m-2 text-white'>
      {props.text}
    </div>
  )
}

export default Button
