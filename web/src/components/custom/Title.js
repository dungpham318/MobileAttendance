import React, { useState, useEffect } from 'react'

const Title = (props) => {


  return (
    <div
      className='
        flex flex-col flex-wrap justify-start items-start py-2 
        text-xl font-medium
      '
    >

      {props.value}

    </div>
  )


}

export default Title