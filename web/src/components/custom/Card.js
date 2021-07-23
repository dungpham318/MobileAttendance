import React, { useState, useEffect } from 'react'

const Card = (props) => {


  return (
    <div
      className={
        'flex flex-col flex-wrap justify-start items-start ' +
        'bg-white box-border border border-border rounded-lg ' +
        'px-3 py-3 mx-3 my-3 shadow-md ' +
        props.className
      }
      onClick={() => {
        // props.onClick()
      }}
    >
      <div className='w-full'>
        {props.children}
      </div>

    </div>
  )


}

export default Card