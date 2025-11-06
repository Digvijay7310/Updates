import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from '../components/Navbar'

function Layout() {
  return (
    <>
        <Header />
        <main className='min-h-screen'>
            <Outlet />
        </main>
        <Footer />
    </>
  )
}

export default Layout