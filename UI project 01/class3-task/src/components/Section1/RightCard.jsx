import React from 'react'

const RightCard = () => {
  return (
    <div className='h-full  w-80 rounded-4xl overflow-hidden relative'>
            <img className='h-full w-full object-cover' src="https://images.unsplash.com/photo-1642456074142-92f75cb84533?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3BpZGVybWFufGVufDB8fDB8fHww" alt="" srcset="" />
            <div className='absolute top-0 left-0 h-full w-fullp-6 flex flex-col justify-between'>
                    <h2 className='bg-white rounded-full h-10 w-10 flex justify-center items-center text-2xl px-5 m-3'>1</h2>

            <div>
                <p className='text-lg leading-[1.2] text-white my-16 mx-5'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti consequatur minus qui!</p>
                <div className='flex justify-between'>
                    <button className='bg-blue-600 text-white font-semibold px-7 py-3 rounded-full text-medium m-5'>Satisfied</button>
            <button className='bg-blue-600 text-white font-semibold px-3 py-2 rounded-full m-5 '><i className="ri-arrow-right-line "></i></button>
                </div>
            </div>

            </div>
          
            
            

    </div>
  )
}

export default RightCard
