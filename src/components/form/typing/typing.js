import React from 'react'
import '../typing/typing.css'

function Typing() {
  return (
    <div className='typing-container'>
        <div className='typing'>typing</div>
        <div className='dot first'></div>
        <div className='dot second'></div>
        <div className='dot third'></div>
    </div>
  )
}

export default Typing;