import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import NotFound from '../pages/NotFound'
import CreateBlog from '../pages/CreateBlog'
import BlogDetails from '../pages/BlogDetails'
import EditBlog from '../pages/EditBlog'

function AppRoutes() {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/create-blog' element={<CreateBlog />} />
        <Route path='/blogs/:id' element={<BlogDetails />} />
        <Route path='/blogs/:id/edit' element={<EditBlog />} />
        <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes