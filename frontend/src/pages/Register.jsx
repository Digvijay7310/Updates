import React, { useEffect, useState } from 'react'
import { LuEye, LuEyeClosed } from "react-icons/lu"
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { formToJSON } from 'axios';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Register | GETUPDATES"
    }, []);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
        if(file){
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        // create from data
        const formData = new FormData();
        formData.append("fullName", e.target.fullName.value);
        formData.append("username", e.target.username.value);
        formData.append("email", e.target.email.value);
        formData.append("password", e.target.password.value)
        formData.append("avatar", avatar);

        try {
            setLoading(true);
            const res = await axiosInstance.post("/user/register", formData, {withCredentials: true});
            toast.success(res.data.message || "Registration successfully");
            navigate("/");
        } catch (error) {
            const errMsg = error.response?.data?.message || "Registration failed";
            toast.error(errMsg);
        } finally{
            setLoading(false)
        }
        console.log("form submitted");
    };


    
  return (
    <section className='min-h-screen flex items-center justify-center bg-blue-50 p-5'>        

        <div className='bg-blue-50 h-screen flex items-center  p-5'>
        <form
         onSubmit={handleSubmit}
          id='register-form'
        className='bg-white p-6 w-full max-w-md mx-auto flex flex-col items-center rounded-2xl shadow'>

            <h2 className='text-xl font-bold mb-4'>Register GETUPDATES</h2>

            <input type="text"
             name='fullName'
              placeholder='Full Name'
             required 
             autoComplete='name'
            className="p-2 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 rounded outline-none min-w-[280px]"
 />

            <input type="text" 
            name='username'
             placeholder='Username'
            autoComplete='username'
             required 
            className="p-2 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 rounded outline-none min-w-[280px]"
 />
            
            <input type="email"
             name='email'
              placeholder='Email'
            autoComplete='email'
             required 
           className="p-2 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 rounded outline-none min-w-[280px]"
 />

            <div 
            className="flex items-center gap-2  border-2 border-gray-500 hover:border-2 hover:border-blue-400 mb-3 rounded min-w-[280px] p-2">

                <input type={showPassword ? "text" : "password"}
                name='password'
                placeholder='Password'
                required
                autoComplete='new-password'
                className='w-full outline-none border-none'
                />
                <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='text-gray-600 hover:text-blue-500'
                aria-label='Toggle password visibility'
                >
                    {showPassword ? <LuEye size={20}/> : <LuEyeClosed size={20} /> }
                    </button>
            </div>

            <label htmlFor="avatar" className=' cursor-pointer bg-blue-100 px-4 py-1 rounded text-sm text-blue-700 hover:bg-blue-200'>
                Upload Avatar:
            </label>

            <input
             type="file"
              name='avatar'
            id='avatar'
             accept='image/*' 
             onChange={handleAvatarChange} 
            className='hidden'
            />
            {avatarPreview && <img src={avatarPreview} alt="Avatar" className='h-[50px] w-[50px] rounded-full my-3' />}

            <button type='submit' className=' bg-blue-500 text-white 
            px-8 py-1 rounded transition-transform duration-200 transform hover:bg-blue-600 hover:scale-105 '>
                {loading ? <Loading /> : "Register"}
            </button>

            <p className="text-sm text-gray-700 mt-3" >
                Already have an account?
                 <Link to='/login' className='text-blue-500 hover:underline'>Login</Link> </p>
        </form>
    </div>
    </section>
  )
}


export default Register