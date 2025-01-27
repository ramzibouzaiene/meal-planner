import { FormEvent, useState } from 'react'
import { LoginData } from '../types/authTypes'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../services/authService'

export const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      console.log('this is form => ', formData)
      const loginData = await loginUser(formData)
      localStorage.setItem('accessToken', loginData.accessToken)
      localStorage.setItem('userId', loginData.userId)
      navigate('/')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }
  return (
    <div>
      <h1>Access Your Account</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Email">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          name="email"
          id="email"
        />
        <label htmlFor="Password">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          name="password"
          id="password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
