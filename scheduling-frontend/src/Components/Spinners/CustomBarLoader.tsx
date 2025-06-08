import React from 'react'
import { BarLoader } from 'react-spinners'

export default function CustomBarLoader() {
    return(
      <div className='main-container'>
        <div className='auth-container loading-container transparent fade-in'>
          <h1>Logging you in...</h1>
          <BarLoader color="#8255C8" width={100} />
        </div>
      </div>
    )
}
