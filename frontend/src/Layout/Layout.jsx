import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

function Layout() {
  return (
    <div className='min-h-screen flex flex-col'>
        <Header />
        <main className='min-h-screen'>
            <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default Layout