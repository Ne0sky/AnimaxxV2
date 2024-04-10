import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useLogin } from '../hooks/useLogin'
import { useUserContext } from '../hooks/useUserContext'
import Cookies from 'universal-cookie'
const Login = () => {
    const cookies = new Cookies()
    const {state, dispatch} = useUserContext()
    const Navigate = useNavigate()
    const {login, error, loading} = useLogin()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginWithGoogle = () => {
        // Implement Google login here
        window.open('http://localhost:3000/auth/google/callback', '_self')
        

    }

    const handleLogin = async (e) => {
        e.preventDefault()
        login({email, password})
    }
  return (
    <div className='w-full flex flex-col justify-center items-center pt-20'>
        <h1 className='text-3xl font-semibold py-8'>Login</h1>
        <form className='flex flex-col gap-4 w-72 bg-slate-300 p-8 rounded-lg'>
            <input type="email" className='p-2 rounded-md'
             onChange={e => setEmail(e.target.value)} 
             placeholder="Email" />
            <input type="password"
            onChange={e => setPassword(e.target.value)}
            className='p-2 rounded-md' placeholder="Password" />
            <button type="submit" className='bg-blue-800 p-2 rounded-md text-white' onClick={handleLogin}>Login</button>
            <p>Not regestered?  <Link to='/signup' >Create an account</Link></p>
        </form>
        <button className='my-4 p-4 bg-rose-700 text-white w-72 rounded-lg' onClick={loginWithGoogle}>
            Sign-In with Google
        </button>
    </div>
  )
}

export default Login