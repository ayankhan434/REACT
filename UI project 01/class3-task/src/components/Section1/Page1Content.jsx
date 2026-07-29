import React from 'react'
import RightContent from './RightContent'
import LeftContent from './LeftContent'


const Page1Content = () => {
  return (
    <div className='py-10 flex justify-between gap-5 h-[85vh] px-18'>
       <LeftContent />
      <RightContent />
    
    </div>
  )
}

export default Page1Content
