import React from 'react'
import { useState } from 'react'
import axios from 'axios'
const Signup = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      const res = await axios.post('http://localhost:3000/auth/register', {
        email,
        password
      })
      console.log(res)

    } catch {
      setError('Failed to create an account')
    }

    setLoading(false)
  }

  return (
    <div>
        
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Sign Up</button>
        </form>

    </div>
  )
}

export default Signup