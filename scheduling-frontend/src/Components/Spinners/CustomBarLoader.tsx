import React from 'react'
import { BarLoader } from 'react-spinners'

type CustomBarLoaderProps = {
    text: string;
}

export default function CustomBarLoader({ text } : CustomBarLoaderProps) {
    return(
      <div className='main-container'>
        <div className='auth-container loading-container transparent fade-in'>
          <h1>{text}</h1>
          <BarLoader color="#8255C8" width={100} />
        </div>
      </div>
    )
}
