import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminRegister from '../pages/admin/AdminRegister'
import AdminDashboard from '../pages/admin/AdminDashboard'
import AdminLogin from '../pages/admin/AdminLogin'
import AdminProfile from '../pages/admin/AdminProfile'
import AdminEditProfile from '../pages/admin/AdminEditProfile'
import SingleUser from '../pages/admin/SingleUser'

function AdminRoutes() {
  return (
    <>
    <Routes>
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin/profile' element={<AdminProfile />} />
        <Route path='/admin/edit-profile' element={<AdminEditProfile />} />
        <Route path='/admin/users/:id' element={<SingleUser />} />
        
        
    </Routes>
    </>
  )
}

export default AdminRoutes