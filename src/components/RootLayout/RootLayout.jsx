import React from 'react'
import Navigation from '../Navigation/Navigation'
import Footer from '../Navigation/Footer'
import {Outlet} from 'react-router-dom'
import './RootLayout.css'

function RootLayout() {
  
  return (
    <div className='rootlayout'>
        <Navigation/>
        <div className="outlet">
            <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default RootLayout;