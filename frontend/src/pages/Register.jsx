import React, { useEffect, useState } from 'react'
import { LuEye, LuEyeClosed } from "react-icons/lu"
import { Link } from 'react-router-dom';

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
        if(file){
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // create from data
        const formData = new FormData();
        formData.append("fullName", e.target.fullName.value);
        formData.append("username", e.target.username.value);
        formData.append("email", e.target.email.value);
        formData.append("password", e.target.password.value)
        formData.append("avatar", avatar)

        // now we can send data to backend
        console.log("form submitted");
    };

    useEffect(() => {
        document.title = "Register | GETUPDATES"
    })
  return (
    <section>        

        <div className='bg-blue-50 h-screen flex items-center  p-5'>
        <form onSubmit={handleSubmit} id='register-form'
        className='bg-white p-6 w-full flex justify-center items-center flex-col rounded-2xl'>

            <h2 className='text-xl font-bold mb-4'>Register GETUPDATES</h2>

            <input type="text"
             name='fullName' placeholder='Full Name'
             required 
             autoComplete='true'
            className='p-2 border-2 border-gray-500 hover:border-2 hover:border-blue-400 mb-3 rounded outline-0 min-w-[280px] ' />

            <input type="text" 
            name='username' placeholder='username'
            autoComplete='true'
             required 
            className='p-2 border-2 border-gray-500 hover:border-2 hover:border-blue-400 mb-3 rounded outline-0 min-w-[280px] ' />
            
            <input type="email"
             name='email' placeholder='Email'
            autoComplete='true'
             required 
            className='p-2 border-2 border-gray-500 hover:border-2 hover:border-blue-400 mb-3 rounded outline-0 min-w-[280px] ' />

            <div 
            className="flex items-center gap-2  border-2 border-gray-500 hover:border-2 hover:border-blue-400 mb-3 rounded min-w-[280px] p-2">

                <input type={showPassword ? "text" : "password"}
                name='password'
                placeholder='Password'
                required
                autoComplete='true'
                className='w-full outline-0 border-none'
                />
                <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='text-blue-400'>{showPassword ? <LuEye size={30}/> : <LuEyeClosed size={30} /> }</button>
            </div>

            <label htmlFor="avatar" className='mt-3'>Upload Avatar:
            </label>

            <input type="file" name='avatar'
            id='avatar' accept='image/1' onChange={handleAvatarChange} 
            className='hidden'
            />
            {avatarPreview && <img src={avatarPreview} alt="Avatar" className='h-[50px] w-[50px] rounded-full my-3' />}

            <button type='submit' className=' bg-blue-500 text-white 
            px-8 py-1 rounded transition-transform duration-200 transform hover:bg-blue-600 hover:scale-105 '>Register</button>

            <p className="text-sm text-gray-700" >Already have an account? <Link to='/login' className='text-blue-500 hover:underline'>Login</Link> </p>
        </form>
    </div>
    </section>
  )
}


export default Register