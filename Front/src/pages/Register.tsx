import { FormEvent, useState } from 'react'
import { RegisterData } from '../types/authTypes'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../services/authService'

export const Register = () => {
  const navigate = useNavigate()

  const [registerForm, setRegisterForm] = useState<RegisterData>({
    username: '',
    email: '',
    password: '',
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const res = await registerUser(registerForm)
      console.log('this is form => ', res.message)
      navigate('/login')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }
  return (
    <div>
      <h1>Create New Account</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Username">Username</label>
        <input
          type="username"
          placeholder="Enter your username"
          value={registerForm.username}
          onChange={(e) =>
            setRegisterForm({ ...registerForm, username: e.target.value })
          }
          name="username"
          id="username"
        />
        <label htmlFor="Email">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={registerForm.email}
          onChange={(e) =>
            setRegisterForm({ ...registerForm, email: e.target.value })
          }
          name="email"
          id="email"
        />
        <label htmlFor="Email">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={registerForm.password}
          onChange={(e) =>
            setRegisterForm({ ...registerForm, password: e.target.value })
          }
          name="password"
          id="password"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}
