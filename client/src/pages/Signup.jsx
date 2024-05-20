import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useLogin } from '../hooks/useLogin'
import toast from 'react-hot-toast'

const Signup = () => {
  const { login } = useLogin()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res;
    try {
      setError('');
      setLoading(true);
      res = await axios.post('http://localhost:3000/auth/register', {
        email,
        password,
        displayName,
      });
      console.log(res);
      if (res.status === 200) {
        console.log('User created');
        toast.success(res.data.message || 'User created successfully');
        login({ email, password });
      }
    } catch (err) {
      setError('Failed to create an account');
      if (err.response && err.response.data) {
        toast.error(err.response.data.message || 'An error occurred');
      } else {
        toast.error('An error occurred');
      }
    }
    setLoading(false);
  };
  

  return (
    <div className='flex justify-center flex-col font-secondary text-white items-center py-16'>
        <h1 className='text-3xl font-semibold'>Sign Up</h1>
        <form onSubmit={handleSubmit} className='flex flex-col items-center my-16 gap-4 bg-zinc-800 p-4 rounded-lg'>
            <input
                type="email"
                placeholder="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className='p-2 bg-black rounded-md'
            />
            <input
                type="text"
                placeholder="username"
                value={displayName}
                required
                onChange={(e) => setDisplayName(e.target.value)}
                className='p-2 bg-black rounded-md'
            />
            
            <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='p-2 bg-black rounded-md'
            />
            <button type="submit" className='bg-blue-600 p-2 rounded-lg'>Sign Up</button>
        </form>

    </div>
  )
}

export default Signup