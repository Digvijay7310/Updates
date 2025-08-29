import React, { useEffect, useState } from 'react'
import { LuEye, LuEyeClosed } from 'react-icons/lu';
import { Link } from 'react-router-dom';

function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.targer.password.value;
        console.log("Loggig in with: ", email, password);
    };

    useEffect(() => {
        document.title = "Login | GETUPDATES"
    })

  return (
    <section>
        
        <div className='bg-blue-50 h-screen flex items-center  p-5'>
        
        <form onSubmit={handleLogin} id='login-form'
        className='bg-white p-6 w-full flex justify-center items-center flex-col rounded-2xl'>
             <h2 className='text-xl font-bold mb-4'>Login GETUPDATES</h2>

            <input type="email"
             name='email'
              placeholder='Email' required 
             autoComplete='true'
            className='p-2 border-2 border-gray-500 hover:border-2 hover:border-blue-400 mb-3 rounded outline-0 min-w-[280px] ' />

             <div 
                        className="flex items-center gap-2  border-2 border-gray-500 hover:border-2 hover:border-blue-400 mb-3 rounded min-w-[280px] p-2">
            
                            <input type={showPassword ? "text" : "password"}
                            name='password'
                            placeholder='Password'
                            required
                            autoComplete='true'
                            className='w-full
                            bg-transparent outline-0 border-none'
                            />
                            <button
                            type='button'
                            onClick={() => setShowPassword(!showPassword)}
                            className=''>{showPassword ? <LuEye size={30}/> : <LuEyeClosed size={30} /> }</button>
                        </div>

            <button type='submit' className=' bg-blue-500 text-white 
            px-8 py-1 rounded transition-transform duration-200 transform hover:bg-blue-600 hover:scale-105 '>Login</button>

            <p className="text-sm text-gray-700">
                Don't have an account? <Link to="/register"  className='text-blue-500 hover:underline'>Register</Link>
            </p>
        </form>
    </div>
    </section>
  )
}

export default Login