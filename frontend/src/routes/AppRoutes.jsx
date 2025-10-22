import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import CreateBlog from '../pages/CreateBlog';
import BlogDetails from '../pages/BlogDetails';
import EditBlog from '../pages/EditBlog';
import Profile from '../pages/Profile';
import UserProfileUpdate from '../pages/UserProfileUpdate';
import Layout from '../Layout/Layout';

import AdminRegister from '../pages/admin/AdminRegister';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminEditProfile from '../pages/admin/AdminEditProfile';
import AdminLogin from '../pages/admin/AdminLogin';
import AdminProfile from '../pages/admin/AdminProfile';
import SingleUser from '../pages/admin/SingleUser';
import AdminLayout from '../Layout/AdminLayout';
import ShortVideo from '../pages/ShortVideo';

function AppRoutes() {
  return (
    <Routes>
      {/* Main User Routes wrapped in Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="create-blog" element={<CreateBlog />} />
        <Route path="blogs/:id" element={<BlogDetails />} />
        <Route path="blogs/:id/edit" element={<EditBlog />} />
        <Route path="user-profile" element={<Profile />} />
        <Route path="user-profile-update" element={<UserProfileUpdate />} />
        <Route path='short-video' element={<ShortVideo />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Admin Routes wrapped in AdminLayout */}
      <Route path="/admin/register" element={<AdminRegister />} />
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="edit-profile" element={<AdminEditProfile />} />
        <Route path="users/:id" element={<SingleUser />} />
        {/* Add more admin routes here */}
      </Route>
    </Routes>
  );
}

export default AppRoutes;
