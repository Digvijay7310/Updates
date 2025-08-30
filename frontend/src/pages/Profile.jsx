import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import { LuPencil } from 'react-icons/lu';

function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading]= useState(true);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        avatar: null,
        avatarPreview: null,
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axiosInstance.get('/user/profile');
                setUser(res.data.data);
                setFormData({
                    fullName: res.data.data.fullName,
                    username: res.data.data.username,
                    email: res.data.data.email,
                    avatar: null,
                    avatarPreview: res.data.data.avatar,
                });
            } catch (error) {
                toast.error("Failed to fetch profile");
            } finally{
                setLoading(false);
            }
        };
        fetchProfile();
    }, [])

    const handleInputChange = (e) => {
        setFormData(prev => ({...prev, [e.target.name] : e.target.value}));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.file[0];
        setFormData(prev => ({
            ...prev, 
            avatar: file,
            avatarPreview: file ? URL.createObjectURL(file): prev.avatarPreview,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const form = new FormData();
            form.append("fullName", formData.fullName);
            form.append("username", formData.username);
            if(formData.avatar) form.append('avatar', formData.avatar);

            const res = await axiosInstance.put('/user/profile', form, {
                withCredentials: true,
            })
            setUser(res.data.data);
            toast.success("Profile updated successfully");
            setEditing(false)
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update profile")
        }
    };

    if(loading) return <Loading />
  return (
    <section className="container mx-auto p-4 max-w-md">
        <h1 className="text-2xl font-bold mb-4">My Profile</h1>

        {!editing ? (
            <div className="space-y-4">
                <img
                 src={user.avatar}
                  alt={user.fullName}
                  className='w-24 h-24 rounded-full object-cover mb-2'
                   />
                   <p><b>FullName:</b> {user.fullName}</p>
                   <p><b>Email:</b> {user.email}</p>
                   <p><b>Username:</b> {user.username}</p>

                   <button
                   onClick={() => setEditing(true)}
                   className="mt-4 px-4 py-2 bg-blue-600 text-white rounded flex items-center gap-1">
                    <LuPencil size={20} /> Edit Profile
                   </button>
            </div>
        ) : (
            <form onSubmit={handleSubmit}
             className="space-y-4">
                <div>
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text"
                    name='fullName'
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className='w-full border p-2 rounded'
                     />
                </div>
                
                <div>
                            <label>Username</label>
                            <input
                              type="text"
                              name="username"
                              value={formData.username}
                              onChange={handleInputChange}
                              required
                              className="w-full border p-2 rounded"
                            />
                          </div>

                          <div>
            <label htmlFor='avatar' className='bg-blue-200 px-4 py-1 hover:text-white hover:bg-blue-600 rounded cursor-pointer'>Avatar</label>
            <input
              type="file"
              name='avatar'
              id='avatar'
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
            {formData.avatarPreview && (
              <img
                src={formData.avatarPreview}
                alt="avatar preview"
                className="w-20 h-20 rounded-full mt-2 object-cover"
              />
            )}
          </div>

           <div className="flex space-x-2">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setEditing(false);
                // Reset form to current user data
                setFormData({
                  fullName: user.fullName,
                  username: user.username,
                  avatar: null,
                  avatarPreview: user.avatar,
                });
              }}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
          </div>
             </form>
        )}
    </section>
  )
}

export default Profile