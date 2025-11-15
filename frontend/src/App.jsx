import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import UpdateProfile from "./pages/UpdateProfile";
import MyBlogs from "./pages/MyBlogs";
import CreateBlog from "./pages/CreateBlog";
import BlogDetail from "./pages/BlogDetail";
import PublicProfile from "./pages/PublicProfile";
import SearchPage from "./pages/SearchPage";
import NotFound from "./pages/NotFound";
import UserLayout from "./Layout/UserLayout";
import BlogEdit from "./pages/BlogEdit";

export default function App() {
  return (
    <AuthProvider>
        <Routes>
          {/* Home */}
          <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="/users/:id" element={<PublicProfile />} />

          {/* Blogs */}
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/my-blogs" element={<MyBlogs />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/blogs/:id/edit" element={<BlogEdit />} />
          <Route path="/search" element={<SearchPage />} />

          <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>

    </AuthProvider>
  );
}
