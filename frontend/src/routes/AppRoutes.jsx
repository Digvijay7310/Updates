import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import NotFound from '../pages/NotFound'
import CreateBlog from '../pages/CreateBlog'
import BlogDetails from '../pages/BlogDetails'
import EditBlog from '../pages/EditBlog'
import Profile from '../pages/Profile'
import AdminDashboard from '../pages/AdminDashboard'
import ManageUsers from '../pages/ManageUsers'
import AdminProfile from '../pages/AdminProfile'
import UserProfileUpdate from '../pages/UserProfileUpdate'

function AppRoutes() {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/create-blog' element={<CreateBlog />} />
        <Route path='/blogs/:id' element={<BlogDetails />} />
        <Route path='/blogs/:id/edit' element={<EditBlog />} />
        <Route path='/user-profile' element={<Profile />} />
        <Route path='/user-profile-update' element={<UserProfileUpdate />} />
        <Route path='/blogs/search?' />

        <Route path='/admin-dashboard' element={<AdminDashboard/>} />
        <Route path='/admin/users' element={<ManageUsers/>} />
        <Route path='/admin/profile' element={<AdminProfile/>} />
        <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes