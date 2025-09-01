import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import NotFound from '../pages/NotFound'
import CreateBlog from '../pages/CreateBlog'
import BlogDetails from '../pages/BlogDetails'
import EditBlog from '../pages/EditBlog'
import Profile from '../pages/Profile'
import AdminDashboard from '../pages/AdminDashboard'
import AdminProfile from '../pages/AdminProfile'
import UserProfileUpdate from '../pages/UserProfileUpdate'
import Layout from '../layout/Layout'
import AdminLogin from '../pages/AdminLogin'


function AppRoutes() {
  return (
    <Routes>
      {/* ✅ Main layout wrapper */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="create-blog" element={<CreateBlog />} />
        <Route path="blogs/:id" element={<BlogDetails />} />
        <Route path="blogs/:id/edit" element={<EditBlog />} />
        <Route path="user-profile" element={<Profile />} />
        <Route path="user-profile-update" element={<UserProfileUpdate />} />
        <Route path='admin-login' element={<AdminLogin />} />
        <Route path="admin-dashboard" element={<AdminDashboard />} />
        <Route path="admin/profile" element={<AdminProfile />} />
        <Route path="*" element={<NotFound />} />
      </Route>

   
  <Route path="/" element={<Layout />}>
    {/* ... */}
  </Route>
    </Routes>

    
  )
}

export default AppRoutes;
